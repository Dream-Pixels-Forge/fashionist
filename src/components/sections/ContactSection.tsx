"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import DecoElement from "@/components/ui/DecoElement";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "Behance", href: "#" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        brandRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "curiosity" }
      )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "respect" },
          "-=0.3"
        )
        .fromTo(
          socialRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "respect" },
          "-=0.2"
        )
        .fromTo(
          copyrightRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "respect" },
          "-=0.2"
        );

      // Pulse animation on CTA (subtle, idle)
      gsap.to(ctaRef.current, {
        scale: 1.02,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-matte-black py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle grain texture on matte black background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <div className="relative mx-auto w-full max-w-xl px-6 text-center">
        <span ref={brandRef} className="inline-flex items-center justify-center gap-3">
          <img
            src="/logo/fashionist-mark.svg"
            alt=""
            className="h-8 md:h-10 w-auto"
          />
          <span className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-off-white tracking-[-0.02em]">
            FASHIONIST
          </span>
        </span>
        <p className="mt-4 text-sm text-off-white/40 font-body tracking-wide">
          Let&apos;s create something beautiful together.
        </p>

        <div className="mt-12">
          <a
            ref={ctaRef}
            href="mailto:hello@fashionist.com"
            className="inline-block px-10 py-4 border border-off-white/30 text-off-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-off-white hover:text-matte-black transition-all duration-500"
          >
            Start a Conversation
          </a>
        </div>

        <div
          ref={socialRef}
          className="mt-12 flex justify-center gap-8"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[0.6875rem] uppercase tracking-[0.2em] text-off-white/40 hover:text-off-white transition-colors duration-300 hover:-translate-y-0.5 inline-block"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p
          ref={copyrightRef}
          className="mt-16 text-[0.625rem] text-off-white/25 tracking-wider uppercase"
        >
          &copy; {new Date().getFullYear()} Fashionist. All rights reserved.
        </p>
      </div>

      {/* Decorative heel */}
      <DecoElement
        src="/images/deco_heel.webp"
        alt=""
        className="absolute bottom-[5%] left-[5%] w-16 md:w-20 opacity-20"
        floatAmplitude={8}
        floatDuration={4}
        rotation={-10}
        delay={0.5}
      />
      <DecoElement
        src="/images/deco_cisor.webp"
        alt=""
        className="absolute top-[10%] right-[5%] w-14 md:w-16 opacity-15"
        floatAmplitude={5}
        floatDuration={3.5}
        rotation={25}
        delay={0.8}
      />
    </section>
  );
}
