import Image from "next/image";
import Link from "next/link";

export const DOCKSIDE_LOGO_SRC = "/brand/dockside-company-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`industrial-wordmark flex items-center gap-3 ${className}`} aria-label="Dockside home">
      <div className="industrial-wordmark__logo relative shrink-0">
        <Image
          src={DOCKSIDE_LOGO_SRC}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 88px, 72px"
          className="industrial-wordmark__logo-image"
        />
      </div>
      <div className="industrial-wordmark__type flex flex-col">
        <span className="font-display text-xl font-extrabold uppercase tracking-wider text-[#8B3F4A]">DOCKSIDE</span>
        <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-widest text-[#8B3F4A]">CONSTRUCTIONS PRIVATE LIMITED</span>
      </div>
    </Link>
  );
}