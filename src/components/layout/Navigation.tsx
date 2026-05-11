"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Collection", href: "#collection" },
  { label: "Looks", href: "#looks" },
  { label: "BTS", href: "#bts" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const lenis = (window as unknown as Record<string, unknown>)
      .__lenis as { scrollTo: (target: string) => void } | undefined;
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      // Fallback native smooth scroll
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-matte-black/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, "#hero")}
          className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src="/logo/fashionist-mark.svg"
            alt=""
            className="h-4 md:h-5 w-auto"
          />
          <span className="font-heading text-sm uppercase tracking-[0.15em] font-bold text-off-white">
            Fashionist
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="group relative text-[0.6875rem] uppercase tracking-[0.15em] text-off-white/70 hover:text-off-white transition-colors duration-300"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-off-white/60 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block w-5 h-px bg-off-white transition-transform duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[2.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-off-white transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-off-white transition-transform duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[2.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-matte-black/98 backdrop-blur-sm transition-all duration-400 overflow-hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm uppercase tracking-[0.15em] text-off-white/80 hover:text-off-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
