"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type Geometry = {
  top: number;
  left: number;
  height: number;
};

type DeliveryRailProps = {
  stageRef: RefObject<HTMLDivElement | null>;
};

/** The rail replaces the per-step tracks below this width. */
const MOBILE_QUERY = "(max-width: 767px)";

/** Viewport position the pointer tracks, as a fraction of the viewport height. */
const READ_LINE = 0.62;

function sameGeometry(a: Geometry | null, b: Geometry | null) {
  if (!a || !b) return a === b;
  return (
    Math.abs(a.top - b.top) < 0.5 &&
    Math.abs(a.left - b.left) < 0.5 &&
    Math.abs(a.height - b.height) < 0.5
  );
}

/**
 * Layout offset of an element relative to a positioned ancestor. Uses the
 * offset chain rather than getBoundingClientRect because the steps carry a
 * translate during their entrance animation, which would otherwise be baked
 * into the rail's position.
 */
function offsetWithin(element: HTMLElement, ancestor: HTMLElement) {
  let node: HTMLElement | null = element;
  let top = 0;
  let left = 0;

  while (node && node !== ancestor) {
    top += node.offsetTop;
    left += node.offsetLeft;
    node = node.offsetParent as HTMLElement | null;
  }

  return node === ancestor ? { top, left } : null;
}

/**
 * A single continuous timeline rail for the mobile process list, spanning from
 * the first step marker to the last one. The fill and the circular pointer are
 * driven by scroll position rather than by a one-shot entrance animation, so
 * the line reads as one unbroken track through every phase.
 */
export function DeliveryRail({ stageRef }: DeliveryRailProps) {
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 140,
    damping: 30,
    mass: 0.35,
    restDelta: 0.0005,
  });

  const tracked = reduceMotion ? progress : smoothProgress;
  const pointerTop = useTransform(tracked, (value) => `${value * 100}%`);

  // Measure the rail against the real step markers so it lines up with the
  // dots at any font size or text reflow.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const mobile = window.matchMedia(MOBILE_QUERY);
    let current: Geometry | null = null;

    const measure = () => {
      if (!mobile.matches) {
        if (current !== null) {
          current = null;
          setGeometry(null);
        }
        return;
      }

      const dots = stage.querySelectorAll<HTMLElement>(".delivery-step__dot");
      if (dots.length < 2) return;

      const first = dots[0];
      const last = dots[dots.length - 1];
      const firstOffset = offsetWithin(first, stage);
      const lastOffset = offsetWithin(last, stage);
      if (!firstOffset || !lastOffset) return;

      const firstCenter = firstOffset.top + first.offsetHeight / 2;
      const lastCenter = lastOffset.top + last.offsetHeight / 2;

      const next: Geometry = {
        left: firstOffset.left + first.offsetWidth / 2,
        top: firstCenter,
        height: Math.max(lastCenter - firstCenter, 0),
      };

      if (!sameGeometry(current, next)) {
        current = next;
        setGeometry(next);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stage);

    mobile.addEventListener("change", measure);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      mobile.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [stageRef]);

  // Drive the fill and pointer from scroll position.
  useEffect(() => {
    if (!geometry) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rail = railRef.current;
      if (!rail) return;

      const box = rail.getBoundingClientRect();
      if (box.height <= 0) {
        progress.set(0);
        return;
      }

      const readLine = window.innerHeight * READ_LINE;
      const ratio = (readLine - box.top) / box.height;
      progress.set(Math.min(1, Math.max(0, ratio)));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [geometry, progress]);

  if (!geometry) return null;

  return (
    <div
      ref={railRef}
      className="delivery-rail"
      aria-hidden="true"
      style={{ top: geometry.top, left: geometry.left, height: geometry.height }}
    >
      <span className="delivery-rail__track" />
      <motion.span
        className="delivery-rail__fill"
        style={{ scaleY: reduceMotion ? 1 : tracked }}
      />
      <motion.span className="delivery-rail__pointer" style={{ top: pointerTop }}>
        <span className="delivery-rail__pointer-core" />
      </motion.span>
    </div>
  );
}
