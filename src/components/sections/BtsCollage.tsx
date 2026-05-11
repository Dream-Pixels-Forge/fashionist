"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BTS_IMAGES = [
  { id: "bts-01", src: "/images/bts-01.webp", width: 1184, height: 864, span: "row-span-2" },
  { id: "bts-02", src: "/images/bts-02.webp", width: 1184, height: 864, span: "row-span-1" },
  { id: "bts-03", src: "/images/bts-03.webp", width: 1184, height: 864, span: "row-span-1" },
  { id: "bts-04", src: "/images/bts-04.webp", width: 1184, height: 864, span: "row-span-2" },
  { id: "bts-05", src: "/images/bts-05.webp", width: 1024, height: 1024, span: "row-span-1" },
  { id: "bts-06", src: "/images/bts-06.webp", width: 1024, height: 1024, span: "row-span-1" },
  { id: "bts-07", src: "/images/bts-07.webp", width: 1024, height: 1024, span: "row-span-1" },
];

export default function BtsCollage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on hero transition image
      gsap.to(heroRef.current, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "curiosity",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bento grid: staggered reveal with alternating directions
      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        const xFrom = i % 2 === 0 ? -30 : 30;
        gsap.fromTo(
          img,
          { x: xFrom, y: 30, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "belonging",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="bts"
      ref={sectionRef}
      className="relative w-full"
    >
      {/* Full-bleed transition hero */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: "url(/images/bts-hero.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-off-white tracking-[-0.02em] text-center leading-none px-6">
            Behind the Seams
          </h2>
        </div>
      </div>

      {/* Bento grid collage */}
      <div className="w-full bg-kraft-beige py-16 md:py-24 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h3
            ref={headingRef}
            className="font-heading text-xl md:text-2xl font-bold text-text mb-2 tracking-[-0.01em]"
          >
            The Process
          </h3>
          <p className="text-sm text-text/50 font-body mb-10 md:mb-14 max-w-md">
            Candid moments from the studio and behind the scenes
          </p>

          {/* Asymmetrical bento grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[240px]"
          >
            {BTS_IMAGES.map((img, i) => (
              <div
                key={img.id}
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                className={`overflow-hidden bg-kraft-tan/20 ${
                  i === 0
                    ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
                    : i === 1
                    ? "col-span-1 row-span-1 md:col-span-1 md:row-span-1"
                    : i === 2
                    ? "col-span-1 row-span-1 md:col-span-1 md:row-span-1"
                    : i === 3
                    ? "col-span-2 row-span-1 md:col-span-2 md:row-span-2"
                    : i === 4
                    ? "col-span-1 row-span-1"
                    : i === 5
                    ? "col-span-1 row-span-1"
                    : "col-span-2 row-span-1 md:col-span-1"
                }`}
              >
                <img
                  src={img.src}
                  alt={`Behind the scenes ${i + 1}`}
                  width={img.width}
                  height={img.height}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
