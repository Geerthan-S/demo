"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { NavContactTicker } from "@/components/nav-contact-ticker";

const navItems = [
  ["Home", "/"],
  ["About Us", "/#about"],
  ["Services", "/#services"],
  ["Equipment Fleet", "/equipment-fleet"],
  ["Quality & Safety", "/quality-safety"],
  ["Projects", "/projects"],
  ["Downloads", "/downloads"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const restoreScrollOnCloseRef = useRef(true);

  const closeMenu = useCallback((restoreScroll = true) => {
    restoreScrollOnCloseRef.current = restoreScroll;
    setOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((current) => {
      if (!current) {
        lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        restoreScrollOnCloseRef.current = true;
      } else {
        restoreScrollOnCloseRef.current = true;
      }

      return !current;
    });
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateScrolled = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 80;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1441px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setOpen(false);
    };

    closeOnDesktop();
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverflowY = document.body.style.overflowY;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverflowY = document.documentElement.style.overflowY;
    const previousOverscroll = document.body.style.overscrollBehavior;
    const lockedScrollY = window.scrollY;
    const focusTimer = window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    document.body.style.overflow = "hidden";
    document.body.style.overflowY = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overflowY = "hidden";
    document.body.style.overscrollBehavior = "contain";

    const getFocusableElements = () => {
      const scope = headerRef.current;
      if (!scope) return [];

      return Array.from(
        scope.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => {
        const style = window.getComputedStyle(element);
        return (
          element.getAttribute("aria-hidden") !== "true" &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          (element.offsetWidth > 0 || element.offsetHeight > 0 || element === menuButtonRef.current)
        );
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      const shouldRestoreScroll = restoreScrollOnCloseRef.current;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overflowY = previousBodyOverflowY;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overflowY = previousHtmlOverflowY;
      document.body.style.overscrollBehavior = previousOverscroll;
      if (shouldRestoreScroll) {
        window.scrollTo(0, lockedScrollY);
      }
      restoreScrollOnCloseRef.current = true;
      const returnTarget = lastFocusedRef.current;
      if (returnTarget?.isConnected) {
        window.requestAnimationFrame(() => returnTarget.focus());
      }
    };
  }, [closeMenu, open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : !href.startsWith("/#") && (pathname === href || pathname.startsWith(`${href}/`));

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're on the home page and clicking a hash link
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        closeMenu(false);
        window.setTimeout(() => {
          const targetElement = document.getElementById(id);
          if (!targetElement) return;

          const navbar = document.querySelector(".industrial-nav") as HTMLElement;
          const navbarHeight = navbar ? navbar.offsetHeight : 90;
          const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementTop - navbarHeight,
            behavior: "smooth",
          });
          window.history.pushState(null, "", href);
        }, 0);
        return;
      }
    }
    closeMenu(false);
  };

  const qualitySafetyHeader = pathname === "/quality-safety";

  return (
    <header ref={headerRef} className={`industrial-nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-menu-open" : ""} ${qualitySafetyHeader ? "quality-safety-nav" : ""}`}>
      <div className="industrial-nav__utility" aria-label="Dockside contact details">
        {/* Phones show this rotating strip instead of the static links below */}
        <NavContactTicker />
        <a href="tel:+918925922737">
          <Phone aria-hidden="true" />
          +91 89259 22737
        </a>
        <a href="mailto:admin@docksideconstructions.com" style={{ textTransform: 'none' }}>
          <Mail aria-hidden="true" />
          admin@docksideconstructions.com
        </a>
        <Link href="/contact">
          <MapPin aria-hidden="true" />
          Chennai, Tamil Nadu
        </Link>
      </div>

      <div className="industrial-nav__bar flex items-center justify-between w-full overflow-hidden">
        <Logo />
        <nav className="industrial-nav__links flex items-center justify-end gap-x-2 lg:gap-x-3 xl:gap-x-5 w-full ml-auto" aria-label="Main navigation">
          {navItems.map(([label, href]) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                className={`${active ? "is-active" : ""} whitespace-nowrap text-[9px] lg:text-[10px] 2xl:text-[11px] font-bold tracking-wider`}
                onClick={(e) => handleScroll(e, href)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        {/* Phone-only: construction enquiries come by call, so keep it one tap
            away even after the utility strip scrolls out of view. */}
        <a
          className="industrial-nav__call"
          href="tel:+918925922737"
          aria-label="Call Dockside Constructions"
        >
          <Phone aria-hidden="true" />
        </a>
        <button
          ref={menuButtonRef}
          className={`industrial-menu ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={toggleMenu}
        >
          <span className="industrial-menu__inner">
            <span className="hamburger-line line-1" />
            <span className="hamburger-line line-2" />
            <span className="hamburger-line line-3" />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`industrial-overlay ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        aria-modal={open ? "true" : undefined}
        role="dialog"
      >
        <div className="industrial-overlay__content">
          <div className="industrial-overlay__meta">
            <span className="industrial-overlay__subtitle">Dockside Navigation</span>
            <div className="industrial-overlay__line" />
          </div>

          <nav className="industrial-overlay__links" aria-label="Mobile navigation">
            {navItems.map(([label, href], index) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleScroll(e, href)}
                  className={active ? "is-active" : ""}
                  tabIndex={open ? 0 : -1}
                  style={{ transitionDelay: `${(index + 1) * 60}ms` }}
                >
                  <span className="link-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="link-text">{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="industrial-overlay__footer">
            <span>Chennai</span>
            <a href="tel:+918925922737" tabIndex={open ? 0 : -1}>+91 89259 22737</a>
            <a href="mailto:admin@docksideconstructions.com" tabIndex={open ? 0 : -1}>admin@docksideconstructions.com</a>
          </div>
        </div>
      </div>
    </header>
  );
}
