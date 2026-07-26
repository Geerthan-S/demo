"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  text,
  style,
  className,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  text?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isIntersecting || hasRun.current || text) return;
    hasRun.current = true;
    const start = performance.now();
    const duration = 1400;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(end * easeOutCubic(progress));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [end, isIntersecting, text]);

  return (
    <span ref={ref} style={style} className={className}>
      {text ?? `${prefix}${Number(value.toFixed(decimals)).toLocaleString('en-IN')}${suffix}`}
    </span>
  );
}

