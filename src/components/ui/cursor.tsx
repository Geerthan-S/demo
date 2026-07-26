"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isVisibleRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const shouldDisableCursor = window.matchMedia(
      "(pointer: coarse), (max-width: 899px), (prefers-reduced-motion: reduce)",
    ).matches;

    if (shouldDisableCursor) return;

    const mountFrame = window.requestAnimationFrame(() => setMounted(true));

    const moveCursor = (e: PointerEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };
    const hoverableSelector = "a, button, [role='button'], input, select, textarea, .hoverable";
    const handlePointerOver = (event: PointerEvent) => {
      setIsHovering(Boolean((event.target as Element | null)?.closest(hoverableSelector)));
    };
    const handlePointerOut = (event: PointerEvent) => {
      const nextTarget = event.relatedTarget as Element | null;
      if (!nextTarget?.closest(hoverableSelector)) setIsHovering(false);
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.cancelAnimationFrame(mountFrame);
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        display: isVisible ? "block" : "none",
        opacity: isVisible ? 1 : 0,
        backgroundColor: "white",
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );
}
