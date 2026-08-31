import { useEffect, useState } from "react";
import { MagneticButton } from "./primitives/magnetic-button";

const NAV = [
  { label: "Product", href: "#solution" },
  { label: "Architecture", href: "#architecture" },
  { label: "Developers", href: "#dx" },
  { label: "Docs", href: "https://wiki.plugport.wtf/" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-hairline bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6"
      >
        <a href="#" className="group flex items-center gap-2.5" aria-label="PlugPort home">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight">PlugPort</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="https://console.plugport.wtf/"
            className="hidden rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            Console
          </a>
          <MagneticButton href="https://wiki.plugport.wtf/" variant="primary" className="!py-2 !text-[13px]">
            Start building
          </MagneticButton>
        </div>
      </nav>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="7" stroke="currentColor" strokeOpacity="0.25" />
      <circle cx="16" cy="16" r="4" fill="currentColor" />
      <circle cx="16" cy="6.5" r="1.6" fill="#10b981" />
      <circle cx="24.5" cy="20" r="1.6" fill="#60a5fa" />
      <circle cx="7.5" cy="20" r="1.6" fill="#f87171" />
      <path
        d="M16 8v4M22.5 18.5L18.5 16.5M9.5 18.5L13.5 16.5"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
