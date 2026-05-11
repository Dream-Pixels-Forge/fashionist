"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import DecoElement from "@/components/ui/DecoElement";

const COLLECTION_ITEMS = [
  {
    title: "AW25",
    subtitle: "Architectural",
    image: "/images/look-01.webp",
    description: "Evening wear reimagined",
  },
  {
    title: "SS25",
    subtitle: "Urban Bloom",
    image: "/images/look-02.webp",
    description: "Spring street sophistication",
  },
  {
    title: "AW24",
    subtitle: "Noir Ethereal",
    image: "/images/look-03.webp",
    description: "Structural minimalism",
  },
];

export default function CollectionIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on transition hero
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

      // Grid cards stagger reveal
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "respect",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 70%",
              end: "bottom 40%",
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
      id="collection"
      ref={sectionRef}
      className="relative w-full"
    >
      {/* Full-bleed transition hero image */}
      <div className="relative h-[70vh] md:h-screen w-full overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: "url(/images/looks-hero.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-off-white tracking-[-0.02em] text-center leading-none px-6">
            The Collection
          </h2>
        </div>
      </div>

      {/* Bento grid below */}
      <div className="w-full bg-kraft-beige py-20 md:py-28 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h3
            ref={headingRef}
            className="font-heading text-2xl md:text-3xl font-bold text-text mb-2 tracking-[-0.01em]"
          >
            Selected Works
          </h3>
          <p className="text-sm text-text/50 font-body mb-12 md:mb-16 max-w-md">
            A curation of recent collections and editorial stories
          </p>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {COLLECTION_ITEMS.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group relative overflow-hidden bg-kraft-cream"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.subtitle}
                    width={768}
                    height={1344}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <span className="text-[0.625rem] uppercase tracking-[0.2em] text-text/40 font-body">
                    {item.title}
                  </span>
                  <h4 className="font-heading text-lg md:text-xl font-bold text-text mt-1">
                    {item.subtitle}
                  </h4>
                  <p className="text-sm text-text/60 font-body mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bag */}
      <DecoElement
        src="/images/deco_bag.webp"
        alt=""
        className="absolute bottom-[8%] right-[3%] w-16 md:w-20 opacity-25 hidden md:block"
        floatAmplitude={9}
        floatDuration={5}
        rotation={-6}
        parallax={0.3}
        delay={0.4}
      />
    </section>
  );
}
