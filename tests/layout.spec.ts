import { test, expect } from "@playwright/test";

test.describe("Fashionist — Layout Capture & Validation", () => {
  const resolutions = [
    { name: "mobile", width: 375, height: 812 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop-small", width: 1440, height: 900 },
    { name: "desktop-large", width: 1920, height: 1080 },
  ];

  for (const { name, width, height } of resolutions) {
    test(`Capture ${name} view (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      // Wait for GSAP/Lenis to settle + fonts to load
      await page.waitForTimeout(3000);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `dev_notes/captured/layout-${name}.png`,
        fullPage: true,
      });
      console.log(`✓ Captured ${name} view`);
    });
  }

  test("Check for layout issues at desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(3000);
    await page.evaluate(() => document.fonts.ready);

    // Check for text clipping
    const clippedText = await page.evaluate(() => {
      const elements = document.querySelectorAll("h1, h2, h3, h4, p, span, a");
      const clipped: string[] = [];
      elements.forEach((el) => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (
          el.textContent?.trim() &&
          rect.width > 0 &&
          rect.height > 0 &&
          style.overflow === "hidden" &&
          el.scrollWidth > rect.width
        ) {
          clipped.push(`${el.tagName} "${el.textContent.trim().slice(0, 40)}"`);
        }
      });
      return clipped.slice(0, 10);
    });

    if (clippedText.length > 0) {
      console.log("⚠ Potential text clipping detected:", clippedText);
    } else {
      console.log("✓ No text clipping detected");
    }

    // Verify key sections render
    const sections = [
      { id: "#hero", name: "Hero" },
      { id: "#philosophy", name: "Philosophy" },
      { id: "#collection", name: "Collection" },
      { id: "#looks", name: "Looks" },
      { id: "#bts", name: "BTS" },
      { id: "#contact", name: "Contact" },
    ];

    for (const { id, name } of sections) {
      const el = page.locator(id);
      await expect(el).toBeVisible();
      console.log(`✓ Section "${name}" (#${id}) is visible`);
    }

    await page.screenshot({
      path: "dev_notes/captured/layout-analysis.png",
      fullPage: true,
    });
  });

  test("Check navigation scrolls to sections", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(3000);

    // Click each nav link and verify scroll
    const navLinks = [
      { label: "Philosophy", section: "#philosophy" },
      { label: "Collection", section: "#collection" },
      { label: "Looks", section: "#looks" },
      { label: "BTS", section: "#bts" },
      { label: "Contact", section: "#contact" },
    ];

    for (const { label, section } of navLinks) {
      const link = page.locator("nav a", { hasText: label }).first();
      await link.click();
      await page.waitForTimeout(1000);

      const sectionEl = page.locator(section);
      await expect(sectionEl).toBeInViewport();
      console.log(`✓ Nav "${label}" scrolls to ${section}`);
    }
  });
});
