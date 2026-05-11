"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import DecoElement from "@/components/ui/DecoElement";

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "curiosity" }
      )
        .fromTo(
          quoteRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "respect" },
          "-=0.3"
        )
        .fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "respect" },
          "-=0.4"
        );

      // Image parallax (subtle)
      gsap.to(imageRef.current, {
        y: "8%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Image fade-in on scroll
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "respect",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative w-full bg-kraft-cream py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[35fr_65fr] gap-12 md:gap-16 items-center">
          {/* Text column */}
          <div className="flex flex-col justify-center">
            <span
              ref={labelRef}
              className="text-[0.625rem] uppercase tracking-[0.2em] text-text/50 mb-6"
            >
              The Philosophy
            </span>
            <blockquote
              ref={quoteRef}
              className="font-heading text-2xl md:text-3xl lg:text-4xl leading-snug text-text italic font-bold"
            >
              &ldquo;Fashion is the armor to survive the reality of everyday
              life.&rdquo;
            </blockquote>
            <p
              ref={textRef}
              className="mt-6 text-sm md:text-base leading-relaxed text-text/70 font-body max-w-md"
            >
              Every garment carries a story — of fabric, form, and the hands
              that shaped it. This collection embodies quiet confidence and
              material presence. We design for those who dress for themselves.
            </p>
          </div>

          {/* Image column */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] md:aspect-auto md:h-[75vh] w-full overflow-hidden will-change-transform"
          >
            <img
              src="/images/designer-portrait.webp"
              alt="Designer portrait"
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Decorative compass */}
      <DecoElement
        src="/images/deco_compas.webp"
        alt=""
        className="absolute top-[10%] right-[5%] w-20 md:w-24 opacity-25 hidden md:block"
        floatAmplitude={7}
        floatDuration={4.5}
        rotation={8}
        parallax={0.2}
        delay={0.2}
      />
    </section>
  );
}
