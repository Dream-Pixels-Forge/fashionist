"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface DecoElementProps {
  src: string;
  alt: string;
  className?: string;
  floatAmplitude?: number;
  floatDuration?: number;
  parallax?: number;
  rotation?: number;
  delay?: number;
  /** Opacity to fade in from */
  startOpacity?: number;
}

export default function DecoElement({
  src,
  alt,
  className = "",
  floatAmplitude = 6,
  floatDuration = 3,
  parallax = 0,
  rotation = 0,
  delay = 0,
  startOpacity = 0.3,
}: DecoElementProps) {
  const elRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Entrance: fade-up and rotate to settled position
      gsap.fromTo(
        el,
        { opacity: 0, y: 20, rotate: rotation - 5 },
        {
          opacity: startOpacity,
          y: 0,
          rotate: rotation,
          duration: 1.2,
          ease: "respect",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Gentle float bob
      gsap.to(el, {
        y: floatAmplitude,
        duration: floatDuration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay + 0.5,
      });

      // Parallax on scroll
      if (parallax !== 0) {
        gsap.to(el, {
          y: `${parallax * 10}%`,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [floatAmplitude, floatDuration, parallax, rotation, delay, startOpacity]);

  return (
    <img
      ref={elRef}
      src={src}
      alt={alt}
      width={1024}
      height={1024}
      className={`pointer-events-none select-none ${className}`}
      loading="lazy"
    />
  );
}
