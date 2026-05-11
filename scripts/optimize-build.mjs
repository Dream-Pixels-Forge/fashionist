/**
 * Post-build optimization script.
 * Run after `next build` to strip unnecessary files from the export.
 *
 * Currently strips:
 * - .woff font files (modern browsers use .woff2; .woff fallbacks are dead weight)
 * - Updates CSS to remove .woff references
 */
import { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { join, resolve } from "path";

const OUT_DIR = resolve(import.meta.dirname, "..", "out");
const MEDIA_DIR = join(OUT_DIR, "_next", "static", "media");

if (!existsSync(MEDIA_DIR)) {
  console.log("ℹ️  No media directory found — skipping woff stripping.");
  process.exit(0);
}

// Collect all .woff files
const woffFiles = readdirSync(MEDIA_DIR).filter((f) => f.endsWith(".woff"));
console.log(`📦 Found ${woffFiles.length} .woff files in media directory.`);

// Delete woff files
let deletedSize = 0;
for (const file of woffFiles) {
  const filePath = join(MEDIA_DIR, file);
  const stat = existsSync(filePath) ? readFileSync(filePath).length : 0;
  unlinkSync(filePath);
  deletedSize += stat;
}
console.log(`🗑️  Deleted ${woffFiles.length} .woff files (${(deletedSize / 1024 / 1024).toFixed(2)} MB)`);

// Update CSS files to remove woff references
const cssDir = join(OUT_DIR, "_next", "static", "chunks");
const cssFiles = readdirSync(cssDir).filter((f) => f.endsWith(".css"));

let updatedCount = 0;
for (const file of cssFiles) {
  const filePath = join(cssDir, file);
  let css = readFileSync(filePath, "utf-8");
  // Remove woff references from src (e.g. url(...woff) format('woff'), )
  const newCss = css.replace(/,?\s*url\([^)]+\.woff\)\s*format\(['"]woff['"]\)\s*/g, "");
  if (newCss !== css) {
    writeFileSync(filePath, newCss);
    updatedCount++;
  }
}
console.log(`🎯 Updated ${updatedCount} CSS file(s) — removed .woff references.`);
console.log("✅ Build optimization complete.");
