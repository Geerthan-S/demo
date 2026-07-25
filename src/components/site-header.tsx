"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : !href.startsWith("/#") && (pathname === href || pathname.startsWith(`${href}/`));

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're on the home page and clicking a hash link
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        // Get navbar height and add extra padding so section is not hidden behind it
        const navbar = document.querySelector(".industrial-nav") as HTMLElement;
        const navbarHeight = navbar ? navbar.offsetHeight : 90;
        const offsetPadding = 0;
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - navbarHeight - offsetPadding,
          behavior: "smooth",
        });
        setOpen(false);
        window.history.pushState(null, "", href);
        return;
      }
    }
    setOpen(false);
  };

  const qualitySafetyHeader = pathname === "/quality-safety";

  return (
    <header className={`industrial-nav ${scrolled ? "is-scrolled" : ""} ${qualitySafetyHeader ? "quality-safety-nav" : ""}`}>
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
          className={`industrial-menu ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span className="industrial-menu__inner">
            <span className="hamburger-line line-1" />
            <span className="hamburger-line line-2" />
            <span className="hamburger-line line-3" />
          </span>
        </button>
      </div>

      <div className={`industrial-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
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
                  style={{ transitionDelay: `${(index + 1) * 60}ms` }}
                >
                  <span className="link-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="link-text">{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="industrial-overlay__footer">
            <div className="overlay-footer-col">
              <h4>Direct Office</h4>
              <a href="tel:+918825922737">+91 88259 22737</a>
              <a href="mailto:admin@docksideconstructions.com">admin@docksideconstructions.com</a>
            </div>
            <div className="overlay-footer-col">
              <h4>Headquarters</h4>
              <address>
                Villupuram,<br />
                Tamil Nadu, India
              </address>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
