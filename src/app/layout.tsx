import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "@/lib/fonts";
import GrainOverlay from "@/components/ui/GrainOverlay";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Fashionist — Editorial Lookbook",
  description:
    "A cinematic, scroll-driven fashion lookbook experience. Warm editorial aesthetics meets modern web.",
  keywords: ["fashion", "lookbook", "editorial", "design", "portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Preload LCP hero image */}
      <link rel="preload" as="image" href="/images/hero_section.webp" />
      <body className="bg-kraft-cream text-text font-body antialiased">
        <GrainOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
