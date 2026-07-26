"use client";

import { useEffect, useState } from "react";
import { Instagram, Linkedin, Mail } from "lucide-react";

/**
 * The utility strip only has room for one contact on a phone, so instead of
 * pinning it to the number this cycles through every way to reach Dockside.
 */
const contacts = [
  {
    key: "email",
    href: "mailto:admin@docksideconstructions.com",
    label: "admin@docksideconstructions.com",
    icon: Mail,
    external: false,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/search/results/companies/?keywords=Dockside%20Constructions",
    label: "linkedin.com/Dockside",
    icon: Linkedin,
    external: true,
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/explore/search/keyword/?q=Dockside%20Constructions",
    label: "@dockside_constructions",
    icon: Instagram,
    external: true,
  },
];

const HOLD_MS = 3600;
const FADE_MS = 420;

export function NavContactTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cycle = window.setInterval(() => {
      if (reduceMotion) {
        setIndex((current) => (current + 1) % contacts.length);
        return;
      }

      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % contacts.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS);

    return () => window.clearInterval(cycle);
  }, []);

  const contact = contacts[index];
  const Icon = contact.icon;

  return (
    <div className="industrial-nav__ticker" aria-label="Contact Dockside">
      <a
        key={contact.key}
        className={`industrial-nav__ticker-item${visible ? " is-visible" : ""}`}
        href={contact.href}
        {...(contact.external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        <Icon aria-hidden="true" />
        <span>{contact.label}</span>
      </a>
    </div>
  );
}
