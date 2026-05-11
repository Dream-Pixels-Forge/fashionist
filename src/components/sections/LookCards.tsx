"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const LOOKS = [
  { id: "look-01", image: "/images/look-01.webp", title: "Architectural" },
  { id: "look-02", image: "/images/look-02.webp", title: "Urban Bloom" },
  { id: "look-03", image: "/images/look-03.webp", title: "Noir Ethereal" },
  { id: "look-04", image: "/images/look-04.webp", title: "Silhouette" },
  { id: "look-05", image: "/images/look-05.webp", title: "Monochrome" },
];

export default function LookCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP entrance on active panel image
  useEffect(() => {
    const img = imageRefs.current[activeIndex];
    if (!img) return;
    gsap.fromTo(
      img,
      { scale: 1.1, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.9, ease: "respect" }
    );
  }, [activeIndex]);

  return (
    <section
      id="looks"
      ref={sectionRef}
      className="relative w-full bg-matte-black"
    >
      {/* Header */}
      <div className="px-6 md:px-10 pt-10 pb-3 md:pt-14 md:pb-4">
        <span className="font-heading text-xl md:text-2xl font-bold text-off-white tracking-[-0.01em]">
          The Looks
        </span>
        <p className="text-xs md:text-sm text-off-white/40 font-body mt-1 tracking-wide">
          Click to explore each look
        </p>
      </div>

      {/* Horizontal accordion */}
      <div className="h-[65vh] md:h-[70vh] flex flex-row px-6 md:px-10 pb-6 md:pb-10 gap-[3px]">
        {LOOKS.map((look, i) => {
          const isActive = activeIndex === i;
          return (
            <div
              key={look.id}
              onClick={() => setActiveIndex(i)}
              className={`
                relative overflow-hidden cursor-pointer
                transition-[flex] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${isActive ? "flex-[4]" : "flex-[0.3] md:flex-[0.25]"}
                ${!isActive && "hover:flex-[0.5] md:hover:flex-[0.4]"}
              `}
            >
              {/* Image */}
              <div
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                className="absolute inset-0 will-change-transform"
              >
                <img
                  src={look.image}
                  alt={look.title}
                  width={768}
                  height={1344}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Collapsed: vertical number label on the right edge */}
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-xl md:text-2xl font-bold text-off-white/80 tracking-wide -rotate-90 whitespace-nowrap origin-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              )}

              {/* Expanded: bottom-left info */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-heading text-5xl md:text-7xl font-bold text-off-white leading-none block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-sm md:text-base text-off-white/70 mt-1 block">
                        {look.title}
                      </span>
                    </div>
                    <span className="font-heading text-sm md:text-base text-off-white/40">
                      {String(i + 1)}/{String(LOOKS.length)}
                    </span>
                  </div>
                </div>
              )}

              {/* Active accent — right edge line */}
              <div
                className={`
                  absolute right-0 top-3 bottom-3 w-[1px]
                  transition-opacity duration-500
                  ${isActive ? "opacity-100" : "opacity-0"}
                `}
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(250,250,245,0.5), transparent)",
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
