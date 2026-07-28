"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight, HardHat, MapPin, ShieldCheck } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";

type HeroProps = {
  eyebrow?: string;
  badgeIcon?: React.ElementType;
  title?: string;
  description?: string;
  /** Shown instead of `description` on phones, where the long copy goes unread. */
  shortDescription?: string;
  /** Heading above the short description on phones. */
  introTitle?: string;
  /** Three short proof points rendered under the CTAs on phones. */
  trustBadges?: string[];
  /** Stats block placed inside the hero flow on phones. */
  statsSlot?: React.ReactNode;
  /**
   * Opt in to the image-first mobile hero. Only the homepage uses it; the other
   * heroes keep the original stacked layout.
   */
  mobileFirstLayout?: boolean;

  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  slides?: { src: string; alt: string }[];
  children?: React.ReactNode;
};

const defaultHeroSlides = [
  {
    src: "/hero/hero-earthwork.jpg",
    alt: "Dockside earthwork and site preparation with heavy machinery at sunset",
  },
  {
    src: "/hero/hero-industrial-park.jpg",
    alt: "Aerial view of Dockside industrial park development at sunset",
  },
  {
    src: "/hero/hero-it-park.jpg",
    alt: "Aerial view of completed IT park commercial campus at dusk",
  },
];

/** Icons for the phone trust cards, in the order the badges are passed. */
const trustBadgeIcons = [ShieldCheck, MapPin, HardHat];

const SLIDE_DURATION = 4000;
/** Phones hold each slide longer so the hero reads as stable rather than busy. */
const SLIDE_DURATION_MOBILE = 8000;
const TRANSITION_DURATION = 1.6;

export function Hero({
  eyebrow = "INDUSTRIAL • COMMERCIAL • INFRASTRUCTURE",
  badgeIcon: BadgeIcon = ShieldCheck,
  title = "From Land|Development|to Large-Scale|Infrastructure|Execution.",
  description = "Dockside Constructions delivers earthworks, industrial infrastructure, road construction, site development and project management services across India with engineering precision, safety compliance and reliable execution.",
  shortDescription,
  introTitle,
  trustBadges,
  statsSlot,
  mobileFirstLayout = false,

  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  slides = defaultHeroSlides,
  children,
}: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isPhone, setIsPhone] = useState(false);
  const indexRef = useRef(0);
  const titleLines = title.split("|").map((line) => line.trim()).filter(Boolean);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsPhone(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-kicker, .hero-line, .hero-copy, .hero-extended, .hero-actions, .hero-cta-certification",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      const prev = indexRef.current;
      const next = (prev + 1) % slides.length;
      setPrevIndex(prev);
      setCurrentIndex(next);
      indexRef.current = next;
    }, isPhone ? SLIDE_DURATION_MOBILE : SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [slides.length, isPhone]);

  return (
    <section
      ref={root}
      // The id carries the mobile overrides: the site's base styles are written
      // with a very high specificity prefix that class selectors cannot beat.
      id={mobileFirstLayout ? "home-hero" : undefined}
      className="home-hero-reference qs-reference-hero relative isolate bg-white"
    >
      <style>{`
       

        .home-hero-reference::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 15;
          pointer-events: none;
          display: block !important;
          background: radial-gradient(
            circle at bottom left,
            rgba(255, 255, 255, 1) 0%,
            transparent 65%
          );
        }

        .home-hero-reference .home-hero-bg {
          position: absolute !important;
          inset: 0 !important;
          z-index: 1 !important;
          overflow: hidden !important;
        }

        .home-hero-reference .hero-slideshow-wrapper {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 1 !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .home-hero-reference .hero-slideshow-wrapper img {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          visibility: visible !important;
        }

        .home-hero-reference .home-hero-white-wash {
          display: none !important;
        }

        .home-hero-reference .qs-reference-hero__glass-wrapper {
          z-index: 4 !important;
        }

        .home-hero-reference .qs-reference-hero__glass-fade {
          display: none !important;
        }

        .home-hero-reference .qs-reference-hero__layout {
          position: absolute !important;
          inset: 0 !important;
          z-index: 30 !important;
          height: 100% !important;
          padding: 0 !important;
          pointer-events: none !important;
        }

        .home-hero-reference .qs-reference-hero__copy {
          position: absolute !important;
          top: 200px !important;
          left: clamp(36px, 3.7vw, 66px) !important;
          z-index: 31 !important;
          width: min(570px, 42vw) !important;
          max-width: 570px !important;
          opacity: 1 !important;
          transform: none !important;
          visibility: visible !important;
          padding-top: 0 !important;
          pointer-events: auto !important;
        }

        .home-hero-reference .hero-kicker,
        .home-hero-reference .hero-line,
        .home-hero-reference .hero-copy,
        .home-hero-reference .hero-actions {
          opacity: 1 !important;
          transform: none !important;
          visibility: visible !important;
        }

        .home-hero-reference .glass-panel {
          height: 155% !important;
          box-shadow: none !important;
          border-inline: 1px solid rgba(255, 255, 255, 0.55) !important;
          mix-blend-mode: screen !important;
          opacity: 1 !important;
        }

        .home-hero-reference .glass-panel-1 {
          top: -21% !important;
          left: 15% !important;
          width: 30vw !important;
          transform: rotate(30deg) !important;
          backdrop-filter: blur(5px) !important;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.66), rgba(255, 255, 255, 0.17)) !important;
        }

        .home-hero-reference .glass-panel-2 {
          top: 7% !important;
          left: calc(10% + 76px) !important;
          width: 30vw !important;
          transform: rotate(-30deg) !important;
          backdrop-filter: blur(4px) !important;
          background: rgba(255, 255, 255, 0.22) !important;
        }

        .home-hero-reference .glass-panel-3 {
          top: -22% !important;
          left: 13% !important;
          width: 30vw !important;
          transform: rotate(30deg) !important;
          backdrop-filter: blur(3px) !important;
          background: rgba(255, 255, 255, 0.24) !important;
        }
          
        .home-hero-reference .glass-panel-6 {
          top: -19% !important;
          left: calc(-3% + 76px) !important;
          width: 30vw !important;
          transform: rotate(-30deg) !important;
          backdrop-filter: blur(10px) !important;
          background: #ffffff !important;
        }
        .home-hero-reference .glass-panel-7 {
          top: -18% !important;
          left: 9% !important;
          width: 30vw !important;
          transform: rotate(30deg) !important;
          backdrop-filter: blur(5px) !important;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.60), rgba(255, 255, 255, 0.13)) !important;
        }

        .home-hero-reference .glass-panel-5 {
          top: -19% !important;
          left: 7% !important;
          width: 30vw !important;
          transform: rotate(30deg) !important;
          backdrop-filter: blur(10px) !important;
          background: #ffffff !important;
          z-index: 10 !important;
        }

        

        .home-hero-reference .glass-panel-4 {
          top: -19% !important;
          left: calc(-5% + 76px) !important;
          width: 30vw !important;
          transform: rotate(-30deg) !important;
          backdrop-filter: none !important;
          background: #ffffff !important;
          z-index: 5 !important;
          mix-blend-mode: normal !important;
        }



        

        

        .home-hero-reference .hero-floating-metrics {
          bottom: -75px !important;
          width: min(calc(100% - 460px), 1280px) !important;
          min-width: 1120px !important;
          max-width: 1280px !important;
          left: 50% !important;
          z-index: 35 !important;
        }

        .home-hero-reference .qs-reference-hero__certs {
          border-radius: 17px !important;
          background: rgba(255, 255, 255, 0.94) !important;
          box-shadow: 0 32px 70px rgba(45, 24, 28, 0.18) !important;
        }

        .home-hero-reference .qs-reference-hero__cert {
          min-height: 134px !important;
          padding: 30px 38px !important;
        }

        .qs-reference-hero {
          height: clamp(775px, 90vh, 820px) !important;
          min-height: 775px !important;
          color: #202126 !important;
          background: #ffffff !important;
          overflow: visible !important;
        }
        .hero-slideshow-wrapper {
          position: absolute !important;
          top: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: auto !important;
          overflow: hidden !important;
          z-index: 0 !important;
        }
        .hero-slideshow-wrapper img {
          object-position: 62% 50% !important;
          filter: saturate(1.04) contrast(1.03) brightness(0.98) !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        .qs-reference-hero__glass-fade {
          display: none !important;
        }
        
        .qs-reference-hero__glass-wrapper {
          position: absolute;
          top: -24vh;
          bottom: -24vh;
          left: 0;
          right: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .glass-panel {
          position: absolute;
          height: 10%;
          box-shadow: none;
          border-inline: 1px solid rgba(255, 255, 255, 0.42);
          mix-blend-mode: screen;
        }

        .glass-panel-1 {
          top: -17%;
          left: 38%;
          width: 10vw;
          transform: rotate(-30deg);
          backdrop-filter: blur(5px);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.54), rgba(255, 255, 255, 0.13));
        }

        .glass-panel-2 {
          top: -20%;
          left: 49%;
          width: 8vw;
          transform: rotate(-30deg);
          backdrop-filter: blur(4px);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.08));
        }

        .glass-panel-3 {
          top: -18%;
          left: 58%;
          width: 12vw;
          transform: rotate(28deg);
          backdrop-filter: blur(5px);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.48), rgba(255, 255, 255, 0.12));
        }

        .glass-panel-4 {
          top: -22%;
          left: 64%;
          width: 5vw;
          transform: rotate(28deg);
          backdrop-filter: blur(3px);
          background: rgba(255, 255, 255, 0.18);
        }

        .glass-panel-5 {
          top: -22%;
          left: 14%;
          width: 7vw;
          transform: rotate(28deg);
          backdrop-filter: blur(3px);
          background: #ffffff;
        }
        .qs-reference-hero__plan-lines {
          bottom: 0 !important;
          left: -92px !important;
          width: 370px !important;
          height: 230px !important;
        }
        .qs-reference-hero__layout {
          height: 100% !important;
          padding: 0 !important;
        }
        .qs-reference-hero__copy {
          max-width: 570px !important;
          padding-top: 12vh !important;
        }
        .qs-reference-hero__badge {
          position: relative !important;
          top: -20px !important;
          height: 52px !important;
          margin-bottom: 22px !important;
          padding: 0 18px !important;
        }
        .qs-reference-hero__title {
          color: #8B3A4A !important;
          font-size: clamp(38px, 3.45vw, 54px) !important;
          line-height: 1.09 !important;
          letter-spacing: 0 !important;
          text-shadow: none !important;
        }
        .qs-reference-hero__title span {
          color: #8B3A4A !important;
        }
        .qs-reference-hero__rule {
          margin-top: 18px !important;
        }
        .qs-reference-hero__body {
          margin-top: 18px !important;
          font-size: 15px !important;
          line-height: 1.75 !important;
          max-width: 535px !important;
        }
        .qs-reference-hero__actions {
          margin-top: 28px !important;
          margin-bottom: 0 !important;
          gap: 28px !important;
        }
        .qs-reference-hero__primary {
          min-height: 50px !important;
          padding: 0 30px !important;
          color: #ffffff !important;
          border-radius: 8px !important;
        }
        .qs-reference-hero__secondary {
          min-height: 52px !important;
          padding: 0 !important;
          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        .qs-reference-hero__secondary span,
        .qs-reference-hero__secondary svg {
          color: #8B2332 !important;
        }
        
        /* Floating Metrics Card */
        .hero-floating-metrics {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          width: min(calc(100% - 64px), 1280px);
          max-width: 1280px;
          z-index: 40;
        }
        .qs-reference-hero__certs {
          width: 100% !important;
          margin-top: 0 !important;
          background: rgba(255, 255, 255, 0.9) !important;
          border-radius: 18px !important;
          box-shadow: 0 32px 80px rgba(45, 24, 28, 0.16), 0 2px 10px rgba(45, 24, 28, 0.04) !important;
          backdrop-filter: blur(24px) !important;
          border: 1px solid rgba(255, 255, 255, 1) !important;
        }

        .qs-reference-hero__cert {
          min-height: 112px !important;
          padding: 26px 34px !important;
        }
        .hero-slide-dots {
          position: absolute;
          bottom: 32px;
          right: 48px;
          left: auto;
          transform: none;
          display: flex;
          gap: 10px;
          z-index: 100;
        }
        .hero-slide-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0;
          cursor: pointer;
        }
        .hero-slide-dot--active {
          background: #B34551;
          transform: scale(1.4);
          border-color: transparent;
        }

        @media (max-width: 1024px) {
          .home-hero-reference .hero-slideshow-wrapper {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            min-height: 100% !important;
            margin-top: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .hero-slideshow-wrapper {
            position: relative !important;
            top: auto !important;
            bottom: auto !important;
            left: auto !important;
            width: 100% !important;
            min-height: 420px !important;
            border-radius: 28px !important;
            box-shadow: 0 28px 80px rgba(45,24,28,0.16) !important;
            margin-top: 40px !important;
          }
          .qs-reference-hero__glass-wrapper,
          .qs-reference-hero__glass-fade {
            display: none !important;
          }
        }
        @media (max-width: 1200px) {
          .qs-reference-hero {
            height: auto !important;
            padding-top: 86px !important;
          }
          .qs-reference-hero__layout {
            height: auto !important;
            padding: 34px 24px 24px !important;
          }
          .qs-reference-hero__title {
            font-size: clamp(36px, 6vw, 68px) !important;
          }
          .qs-reference-hero__certs {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .home-hero-reference {
            display: flex !important;
            flex-direction: column !important;
          }
          .home-hero-reference .home-hero-bg {
            position: relative !important;
            height: auto !important;
            inset: auto !important;
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            order: 2 !important;
            margin-top: 24px !important;
          }
          .home-hero-reference .qs-reference-hero__layout {
            position: relative !important;
            height: auto !important;
            pointer-events: auto !important;
            padding-top: 72px !important;
            order: 1 !important;
          }
          .home-hero-reference .qs-reference-hero__copy {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            padding-top: 0 !important;
            padding-bottom: 30px !important;
          }
          .home-hero-reference .hero-slideshow-wrapper {
            position: relative !important;
            inset: auto !important;
            border-radius: 12px !important;
            min-height: 480px !important;
            margin-top: 20px !important;
            box-shadow: 0 16px 40px rgba(0,0,0,0.15) !important;
          }
        }
        @media (max-width: 760px) {
          .qs-reference-hero__badge {
            height: auto !important;
            min-height: 54px !important;
            margin-bottom: 28px !important;
            padding: 14px 16px !important;
          }
          .qs-reference-hero__actions {
            gap: 16px !important;
            margin-bottom: 32px !important;
            flex-direction: column !important;
            width: 100% !important;
          }
          .qs-reference-hero__primary,
          .qs-reference-hero__secondary {
            width: 100% !important;
            justify-content: center !important;
          }
          .qs-reference-hero__certs {
            grid-template-columns: 1fr !important;
          }
          .qs-reference-hero__cert {
            padding-inline: 22px !important;
          }
          .qs-reference-hero__title {
            font-size: clamp(2rem, 7vw, 3.5rem) !important;
            line-height: 1.1 !important;
          }
          .qs-reference-hero__body {
            font-size: clamp(1rem, 3.8vw, 1.15rem) !important;
          }

          /* ── Non-homepage page heroes (Equipment Fleet, Projects, etc.) ── */
          .qs-reference-hero:not(#home-hero) {
            height: auto !important;
            min-height: 0 !important;
            padding-top: 0 !important;
            overflow: visible !important;
            display: block !important;
          }

          /* Hide the Hero's built-in slideshow bg — page heroes provide their own image */
          .qs-reference-hero:not(#home-hero) .home-hero-bg {
            display: none !important;
          }

          .qs-reference-hero:not(#home-hero) .qs-reference-hero__layout {
            position: relative !important;
            height: auto !important;
            padding: 80px 20px 20px !important;
            pointer-events: auto !important;
          }

          .qs-reference-hero:not(#home-hero) .qs-reference-hero__copy {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            padding-top: 0 !important;
          }

          .qs-reference-hero:not(#home-hero) .qs-reference-hero__actions {
            margin-bottom: 0 !important;
          }

          .qs-reference-hero:not(#home-hero) .qs-reference-hero__body {
            display: none !important;
          }
          .qs-reference-hero:not(#home-hero) .qs-reference-hero__body-short {
            display: block !important;
            margin-top: 14px !important;
            font-size: 14px !important;
            line-height: 1.65 !important;
            color: #5F6067 !important;
          }
          .qs-reference-hero:not(#home-hero) .hero-extended {
            display: none !important;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           IMAGE-FIRST MOBILE HERO (opt-in via mobileFirstLayout)

           Order on a phone: photo with the eyebrow + headline on it, then
           CTAs, proof points, stats and one short line of copy. The long
           description and the desktop floating metrics card are dropped.
           ══════════════════════════════════════════════════════════════ */
        .hero-mobile-scrim,
        .hero-trust-badges,
        .hero-stats-slot,
        .qs-reference-hero__body-short {
          display: none;
        }

        @media (max-width: 767px) {
          #home-hero {
            --hero-media: 74vh;
            display: block !important;
            height: auto !important;
            min-height: 0 !important;
            padding-top: 0 !important;
            overflow: hidden !important;
          }

          /* The desktop white radial wash would bleach the photo */
          #home-hero.home-hero-reference::before {
            display: none !important;
          }

          /* ── photo band pinned to the top of the section ── */
          #home-hero .home-hero-bg {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: auto !important;
            width: 100% !important;
            height: var(--hero-media) !important;
            margin-top: 0 !important;
            display: block !important;
            order: 0 !important;
            overflow: hidden !important;
          }

          #home-hero .hero-slideshow-wrapper {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            min-height: 0 !important;
            margin-top: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          #home-hero .hero-slideshow-wrapper img {
            object-position: 60% 50% !important;
          }

          /* Slow, subtle drift instead of a 7s zoom */
          #home-hero .hero-slide--kenburns .hero-slide__img,
          #home-hero .hero-slide__img {
            animation: hero-mobile-drift 12s ease-out forwards !important;
          }

          #home-hero .hero-mobile-scrim {
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            z-index: 5 !important;
            pointer-events: none !important;
            background: linear-gradient(
              180deg,
              rgba(18, 10, 12, 0.52) 0%,
              rgba(18, 10, 12, 0.28) 32%,
              rgba(18, 10, 12, 0.46) 62%,
              rgba(18, 10, 12, 0.82) 100%
            ) !important;
          }

          #home-hero .hero-slide-dots {
            bottom: auto !important;
            top: calc(var(--hero-media) - 34px) !important;
            right: 20px !important;
            z-index: 40 !important;
          }

          /* ── copy column ── */
          #home-hero .qs-reference-hero__layout {
            position: relative !important;
            order: 1 !important;
            height: auto !important;
            padding: 0 !important;
            pointer-events: auto !important;
          }

          #home-hero .qs-reference-hero__copy {
            display: flex !important;
            flex-direction: column !important;
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 20px 34px !important;
          }

          /* Eyebrow + headline sit on the photo, pinned to its lower edge */
          #home-hero .hero-headline-group {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-end !important;
            order: 1 !important;
            min-height: var(--hero-media) !important;
            margin: 0 0 22px !important;
            padding: 100px 0 26px !important;
          }

          /* The eyebrow pill reads as a stray dialog box on a phone; the photo
             already says "construction" faster than the words do. */
          #home-hero .qs-reference-hero__badge {
            display: none !important;
          }

          /* Let the headline wrap naturally rather than on five forced lines */
          #home-hero .hero-line__break {
            display: none !important;
          }

          #home-hero .hero-line {
            display: inline !important;
          }

          #home-hero .qs-reference-hero__title,
          #home-hero .qs-reference-hero__title span {
            color: #ffffff !important;
          }

          #home-hero .qs-reference-hero__title {
            font-size: clamp(1.85rem, 8.6vw, 2.3rem) !important;
            line-height: 1.05 !important;
            letter-spacing: -0.01em !important;
            text-wrap: balance !important;
            text-shadow: 0 2px 18px rgba(12, 6, 8, 0.55) !important;
          }

          #home-hero .qs-reference-hero__rule {
            margin-top: 16px !important;
            width: 46px !important;
            background: rgba(255, 255, 255, 0.8) !important;
          }

          /* ── Reading order below the photo:
             primary action → who we are → proof in numbers → credentials →
             contact. Confidence is built before the contact ask, so the two
             CTAs stop competing. display:contents lets the two buttons be
             ordered independently while staying one element on desktop. ── */
          #home-hero .qs-reference-hero__actions {
            display: contents !important;
          }

          #home-hero .qs-reference-hero__actions > * {
            width: 100% !important;
          }

          #home-hero .qs-reference-hero__actions > *:first-child {
            order: 2 !important;
            margin: 0 0 40px !important;
          }

          #home-hero .qs-reference-hero__primary {
            width: 100% !important;
            min-height: 54px !important;
            justify-content: center !important;
            border-radius: 8px !important;
            font-size: 13px !important;
            letter-spacing: 0.14em !important;
          }

          /* Contact moves to the end of the flow, after the proof */
          #home-hero .qs-reference-hero__actions > *:last-child {
            order: 6 !important;
            margin: 0 !important;
          }

          #home-hero .qs-reference-hero__secondary {
            width: 100% !important;
            min-height: 52px !important;
            justify-content: center !important;
            padding: 0 !important;
            border: 1px solid rgba(139, 35, 50, 0.32) !important;
            border-radius: 8px !important;
            background: transparent !important;
          }

          /* ── company introduction ── */
          #home-hero .hero-intro {
            display: block !important;
            order: 3 !important;
            margin: 0 0 44px !important;
          }

          #home-hero .hero-intro__title {
            margin: 0 0 14px !important;
            font-family: var(--font-display) !important;
            font-size: clamp(25px, 7.2vw, 31px) !important;
            font-weight: 900 !important;
            line-height: 1.12 !important;
            letter-spacing: -0.015em !important;
            text-transform: uppercase !important;
            color: #8B2332 !important;
          }

          #home-hero .hero-intro__text {
            display: block !important;
            margin: 0 !important;
            max-width: 38ch !important;
            font-size: 16px !important;
            line-height: 1.65 !important;
            color: #5F6067 !important;
          }

          /* ── proof in numbers, sitting on the photo ── */
          #home-hero .hero-stats-slot {
            display: block !important;
            width: 100% !important;
            margin: 22px 0 0 !important;
          }

          /* The wide floating card is replaced by the strip on phones */
          #home-hero ~ .home-metrics-card,
          #home-hero ~ * .home-metrics-card {
            display: none !important;
          }

          /* Glass cards so the numbers stay readable over any slide */
          .hero-stats-strip {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 9px !important;
            border: 0 !important;
            padding: 0 !important;
          }

          .hero-stats-strip__item {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: center !important;
            gap: 3px !important;
            min-height: 0 !important;
            padding: 11px 12px !important;
            border: 1px solid rgba(255, 255, 255, 0.22) !important;
            border-radius: 13px !important;
            background: rgba(18, 10, 12, 0.42) !important;
            box-shadow: none !important;
            backdrop-filter: blur(9px) !important;
          }

          .hero-stats-strip__value {
            min-width: 0 !important;
            font-family: var(--font-display) !important;
            font-size: clamp(17px, 5vw, 21px) !important;
            font-weight: 900 !important;
            line-height: 1.05 !important;
            letter-spacing: -0.01em !important;
            color: #ffffff !important;
            overflow-wrap: break-word !important;
          }

          .hero-stats-strip__label {
            margin-top: 0 !important;
            font-size: 10.5px !important;
            font-weight: 500 !important;
            line-height: 1.3 !important;
            text-align: left !important;
            color: rgba(255, 255, 255, 0.88) !important;
          }

          /* ── credentials as cards, not footnotes ── */
          #home-hero .hero-trust-badges {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 10px !important;
            order: 5 !important;
            margin: 0 0 44px !important;
            padding: 0 !important;
            list-style: none !important;
          }

          #home-hero .hero-trust-badges li {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 9px !important;
            padding: 15px 7px !important;
            border: 1px solid rgba(139, 58, 74, 0.16) !important;
            border-radius: 12px !important;
            background: rgba(139, 58, 74, 0.035) !important;
            text-align: center !important;
          }

          #home-hero .hero-trust-badges__icon {
            display: grid !important;
            place-items: center !important;
            color: #8B2332 !important;
          }

          #home-hero .hero-trust-badges__label {
            font-size: 11px !important;
            font-weight: 700 !important;
            line-height: 1.28 !important;
            letter-spacing: 0.01em !important;
            color: #4A4B52 !important;
          }

          /* The long desktop paragraph stays hidden on phones */
          #home-hero .qs-reference-hero__body {
            display: none !important;
          }
        }

        @keyframes hero-mobile-drift {
          from { transform: scale(1.08); }
          to { transform: scale(1.00); }
        }

        @media (prefers-reduced-motion: reduce) {
          #home-hero .hero-slide__img {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ── Background Wrapper (Clips content but allows metrics to float outside) ── */}
      <div className="home-hero-bg absolute inset-0 overflow-hidden z-0">
        <div
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(139,58,74,0.16) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ── Slideshow ── */}
        <div className="hero-slideshow-wrapper bg-[#050608]">
          {slides.map((slide, idx) => (
            <div
              key={`slide-${idx}`}
              className="hero-slide hero-slide--kenburns"
              style={{
                position: "absolute",
                inset: 0,
                opacity: idx === currentIndex || idx === prevIndex ? 1 : 0,
                zIndex: idx === currentIndex ? 2 : idx === prevIndex ? 1 : 0,
                transition: "opacity 1600ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="hero-slide__img w-full h-full object-cover"
                style={{
                  animation: idx === currentIndex || idx === prevIndex
                    ? "kenburns-zoom 7s ease-out forwards"
                    : "none"
                }}
              />
            </div>
          ))}

          {/* Phone-only scrim so white headline copy stays legible on the photo */}
          <div className="hero-mobile-scrim" aria-hidden="true" />

          {slides.length > 1 && (
            <div className="hero-slide-dots relative z-50">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`hero-slide-dot${i === currentIndex ? " hero-slide-dot--active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    setPrevIndex(indexRef.current);
                    setCurrentIndex(i);
                    indexRef.current = i;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Architectural Glass Transition ── */}
        <div className="home-hero-white-wash" />
        <div className="qs-reference-hero__glass-fade" />
        <div className="qs-reference-hero__glass-wrapper">
          <div className="glass-panel glass-panel-1" />
          <div className="glass-panel glass-panel-2" />
          <div className="glass-panel glass-panel-3" />
          <div className="glass-panel glass-panel-4" />
          <div className="glass-panel glass-panel-5" />
          <div className="glass-panel glass-panel-6" />
          <div className="glass-panel glass-panel-7" />
        </div>

        <div className="qs-reference-hero__plan-lines absolute hidden rotate-[-22deg] border border-[#8B3A4A]/12 lg:block" />
      </div>

      {/* ── Main Layout Content ── */}
      <div className="qs-reference-hero__layout relative z-[25] w-full h-full flex flex-col justify-start pt-[280px] md:pt-[380px] pointer-events-none px-[4.05vw]">
        <div className="qs-reference-hero__copy w-full max-w-[90vw] md:max-w-[700px] pointer-events-auto">
          {/* On phones this group is sized to the image band and bottom-aligned,
              so the eyebrow and headline read as part of the photo. On larger
              screens it is display:contents and changes nothing. */}
          <div className="hero-headline-group">
            {eyebrow && !mobileFirstLayout && (
              <div className="hero-kicker qs-reference-hero__badge inline-flex items-center gap-4 rounded-[8px] border border-[#8B3A4A]/12 bg-white/78 text-[#8B3A4A] shadow-[0_18px_42px_rgba(45,24,28,0.07)] backdrop-blur-xl">
                <BadgeIcon className="h-5 w-5" strokeWidth={1.8} />
                <span className="font-mono text-[12px] font-black uppercase tracking-[0.28em]">
                  {eyebrow}
                </span>
              </div>
            )}

            <h1
              className="qs-reference-hero__title font-display font-black uppercase"
            >
              {titleLines.map((line, index) => (
                <span
                  className="hero-line inline-block"
                  key={line}
                >
                  {line}
                  {/* The space keeps the words apart on phones, where the
                      break is hidden and the lines reflow inline. */}
                  {index < titleLines.length - 1 ? (
                    <>
                      {" "}
                      <br className="hero-line__break" />
                    </>
                  ) : (
                    ""
                  )}
                </span>
              ))}
            </h1>

            <div className="hero-line qs-reference-hero__rule h-px w-16 bg-[#8B3A4A]" />

            {/* Sits over the photo on phones; hidden above 768px */}
            {statsSlot && <div className="hero-stats-slot">{statsSlot}</div>}
          </div>

          <p className="hero-copy qs-reference-hero__body max-w-[610px] font-medium text-[#5F6067]">
            {description}
          </p>

          {/* Phone-only company introduction: gives the reader a reason to
              trust the numbers that follow, instead of a stray closing line. */}
          {(introTitle || shortDescription) && (
            <div className="hero-intro">
              {introTitle && <h2 className="hero-intro__title">{introTitle}</h2>}
              {shortDescription && (
                <p className="qs-reference-hero__body-short hero-intro__text font-medium text-[#5F6067]">
                  {shortDescription}
                </p>
              )}
            </div>
          )}

          {children && (
            <div className="hero-extended mt-6 pb-8 w-full max-w-[610px]">
              {children}
            </div>
          )}

          <div className="hero-actions qs-reference-hero__actions mt-10 md:mt-12 flex flex-wrap items-center">
            {primaryLabel && primaryHref && (
              <MagneticButton>
                <Link href={primaryHref} className="qs-reference-hero__primary inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#8B2332] font-mono text-[12px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#6A1A25]">
                  {primaryLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </MagneticButton>
            )}
            {secondaryLabel && secondaryHref && (
              <MagneticButton>
                <Link href={secondaryHref} className="qs-reference-hero__secondary inline-flex items-center justify-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#6A1A25]">
                  {secondaryLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </MagneticButton>
            )}
          </div>

          {trustBadges && trustBadges.length > 0 && (
            <ul className="hero-trust-badges" aria-label="Company credentials">
              {trustBadges.map((badge, index) => {
                // Icons are resolved here rather than passed in: this is a
                // client component rendered from a server page, and component
                // references cannot cross that boundary.
                const BadgeIcon = trustBadgeIcons[index % trustBadgeIcons.length];
                return (
                  <li key={badge}>
                    <span className="hero-trust-badges__icon">
                      <BadgeIcon className="size-5" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span className="hero-trust-badges__label">{badge}</span>
                  </li>
                );
              })}
            </ul>
          )}

        </div>
      </div>
    </section>
  );
}
