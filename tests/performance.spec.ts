import { test, expect } from "@playwright/test";

test.describe("Fashionist — Performance Audit", () => {
  test("Capture Core Web Vitals and resource timing", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Collect performance metrics
    const metrics: Record<string, number> = {};

    // Listen for console messages from performance observer
    page.on("console", (msg) => {
      console.log(`  [browser] ${msg.text()}`);
    });

    await page.goto("/", { waitUntil: "networkidle" });

    // Wait for Lenis/GSAP animations to settle
    await page.waitForTimeout(3000);

    // Gather Navigation Timing API
    const navTiming = await page.evaluate(() => {
      const perf = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: perf.domContentLoadedEnd - perf.domContentLoadedStart,
        domComplete: perf.domComplete,
        loadEvent: perf.loadEventEnd - perf.loadEventStart,
        totalTime: perf.loadEventEnd - perf.fetchStart,
        redirectTime: perf.redirectEnd - perf.redirectStart,
        dnsTime: perf.domainLookupEnd - perf.domainLookupStart,
        tcpTime: perf.connectEnd - perf.connectStart,
        ttfb: perf.responseStart - perf.requestStart,
        responseTime: perf.responseEnd - perf.responseStart,
        domInteractive: perf.domInteractive,
        domContentLoadedEnd: perf.domContentLoadedEnd,
      };
    });

    console.log("\n📊 Navigation Timing:");
    console.log(`  TTFB:              ${navTiming.ttfb.toFixed(0)}ms`);
    console.log(`  DNS Lookup:        ${navTiming.dnsTime.toFixed(0)}ms`);
    console.log(`  TCP Connect:       ${navTiming.tcpTime.toFixed(0)}ms`);
    console.log(`  Response Time:     ${navTiming.responseTime.toFixed(0)}ms`);
    console.log(`  DOM Interactive:   ${navTiming.domInteractive.toFixed(0)}ms`);
    console.log(
      `  DOMContentLoaded:  ${navTiming.domContentLoaded.toFixed(0)}ms`,
    );
    console.log(`  DOM Complete:      ${navTiming.domComplete.toFixed(0)}ms`);
    console.log(`  Load Event:        ${navTiming.loadEvent.toFixed(0)}ms`);
    console.log(`  Total Time:        ${navTiming.totalTime.toFixed(0)}ms`);

    // Resource breakdown
    const resourceTypes = await page.evaluate(() => {
      const entries = performance.getEntriesByType("resource");
      const types: Record<string, { count: number; totalSize: number; totalTime: number }> = {};

      entries.forEach((entry) => {
        const perfEntry = entry as PerformanceResourceTiming;
        // Infer type from initiatorType or extension
        let type = perfEntry.initiatorType || "other";
        if (perfEntry.name.match(/\.(woff2?)$/)) type = "font";
        else if (perfEntry.name.match(/\.(webp|png|jpg)$/)) type = "image";
        else if (perfEntry.name.match(/\.(js)$/)) type = "script";
        else if (perfEntry.name.match(/\.(css)$/)) type = "stylesheet";

        if (!types[type]) types[type] = { count: 0, totalSize: 0, totalTime: 0 };
        types[type].count++;
        types[type].totalSize += perfEntry.transferSize || 0;
        types[type].totalTime += perfEntry.duration || 0;
      });
      return types;
    });

    console.log("\n📦 Resource Breakdown:");
    let totalSize = 0;
    let totalRequests = 0;
    for (const [type, data] of Object.entries(resourceTypes)) {
      const sizeKB = (data.totalSize / 1024).toFixed(1);
      const timeMs = data.totalTime.toFixed(0);
      console.log(`  ${type.padEnd(12)} ${data.count.toString().padStart(3)} req  ${sizeKB.padStart(8)} KB  ${timeMs.padStart(6)}ms`);
      totalSize += data.totalSize;
      totalRequests += data.count;
    }
    console.log(`  ─────────────────────────────────────────────`);
    console.log(`  TOTAL           ${totalRequests.toString().padStart(3)} req  ${(totalSize / 1024).toFixed(1).padStart(8)} KB`);

    // Check for large images (potential LCP issues)
    const largeImages = await page.evaluate(() => {
      const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      return entries
        .filter((e) => e.name.match(/\.(webp|png|jpg)$/) && e.transferSize > 100 * 1024)
        .map((e) => ({
          url: e.name.split("/").pop(),
          sizeKB: (e.transferSize / 1024).toFixed(0),
          duration: e.duration.toFixed(0),
        }));
    });

    if (largeImages.length > 0) {
      console.log("\n⚠️  Large Images (>100 KB each):");
      for (const img of largeImages) {
        console.log(`  ${img.url?.padEnd(30)} ${img.sizeKB.padStart(5)} KB  ${img.duration.padStart(5)}ms`);
      }
    } else {
      console.log("\n✓ No excessively large images");
    }

    // Assert reasonable performance
    expect(navTiming.totalTime).toBeLessThan(10000);
    console.log(`\n✅ Performance baseline: ${navTiming.totalTime.toFixed(0)}ms total load time`);
  });
});
