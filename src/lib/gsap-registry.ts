"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// Register ScrollTrigger eagerly at module level, so any component
// that creates ScrollTrigger-driven animations (in useEffect) finds
// the plugin already registered. React fires child effects before
// parent effects, so waiting until initGSAP() in a parent useEffect
// would be too late.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
}

export function initGSAP() {
  if (typeof window === "undefined") return;

  // CustomEase curves for the Fashionist editorial voice.
  // Registered inside initGSAP since CustomEase.create is idempotent
  // and only needs to run once, but it's fine in useEffect.
  CustomEase.create("disruption", "0.45,0.05,0.55,0.95");
  CustomEase.create("curiosity", "0.33,0,0.2,1");
  CustomEase.create("respect", "0.25,0.1,0.25,1");
  CustomEase.create("aspiration", "0.34,1.56,0.64,1");
  CustomEase.create("intimacy", "0.4,0,0.6,1");
  CustomEase.create("belonging", "0.0,0.0,0.2,1");
}
