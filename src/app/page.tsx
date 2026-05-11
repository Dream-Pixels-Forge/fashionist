"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { initGSAP } from "@/lib/gsap-registry";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import CollectionIntro from "@/components/sections/CollectionIntro";
import LookCards from "@/components/sections/LookCards";
import BtsCollage from "@/components/sections/BtsCollage";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Expose Lenis globally for nav smooth scroll
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initialize GSAP
    initGSAP();

    return () => {
      (window as unknown as Record<string, unknown>).__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Navigation />
      <HeroSection />
      <PhilosophySection />
      <CollectionIntro />
      <LookCards />
      <BtsCollage />
      <ContactSection />
    </main>
  );
}
