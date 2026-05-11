"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import DecoElement from "@/components/ui/DecoElement";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ken Burns zoom on background (continuous slow zoom)
      gsap.to(bgRef.current, {
        scale: 1.05,
        duration: 12,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // Parallax on scroll
      gsap.to(bgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Title text reveal — mask from bottom
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "disruption",
            delay: 0.3,
          }
        );
      }

      // Tagline fade-up
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "respect",
            delay: 0.9,
          }
        );
      }

      // Scroll indicator — continuous gentle bounce
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          opacity: 0.5,
          duration: 1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.5,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-matte-black"
    >
      {/* Background image with Ken Burns */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url(/images/hero_section.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale: 1,
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-off-white px-6">
        <h1
          ref={titleRef}
          className="font-heading text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.02em] text-center leading-none will-change-transform"
        >
          FASHIONIST
        </h1>
        <p
          ref={taglineRef}
          className="mt-6 text-base md:text-lg font-light tracking-[0.15em] uppercase text-off-white/70"
        >
          Editorial Lookbook
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.625rem] uppercase tracking-[0.2em] text-off-white/50">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-off-white/50 to-transparent" />
      </div>

      {/* Decorative elements */}
      <DecoElement
        src="/images/deco_ruler.webp"
        alt=""
        className="absolute top-[15%] right-[8%] w-16 md:w-20 opacity-30"
        floatAmplitude={8}
        floatDuration={4}
        rotation={-12}
        delay={0.3}
      />
      <DecoElement
        src="/images/deco_cisor.webp"
        alt=""
        className="absolute bottom-[20%] left-[6%] w-14 md:w-16 opacity-25"
        floatAmplitude={6}
        floatDuration={3.5}
        rotation={15}
        parallax={0.3}
        delay={0.6}
      />
    </section>
  );
}
