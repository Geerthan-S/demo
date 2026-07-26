"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Link
      href="/contact"
      className={`floating-cta ${isVisible ? "is-visible" : ""}`}
      aria-label="Talk to Expert"
    >
      <PhoneCall aria-hidden="true" />
      <span>Talk to Expert</span>
    </Link>
  );
}
