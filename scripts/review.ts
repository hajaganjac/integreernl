/**
 * Design-review helper. Scrolls each <section> into view like a real user,
 * waits for its reveal to settle, then captures the viewport.
 *
 * Deliberately avoids fullPage screenshots: they resize the viewport to the
 * whole document, which perturbs IntersectionObserver-driven reveals and
 * produces misleading blank captures.
 *
 *   npx tsx scripts/review.ts [path] [name] [desktop|mobile]
 */
import { chromium } from "playwright-core";
import path from "node:path";

const CHROME =
  "/Users/harun/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const target = process.argv[2] ?? "/";
const name = process.argv[3] ?? "home";
const mode = (process.argv[4] ?? "desktop") as "desktop" | "mobile";
const OUT = path.join(process.cwd(), ".review");

async function main() {
  const browser = await chromium.launch({ executablePath: CHROME });
  const width = mode === "mobile" ? 390 : 1180;
  const ctx = await browser.newContext({
    viewport: { width, height: mode === "mobile" ? 780 : 860 },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:3000${target}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const count = await page.locator("section").count();

  for (let i = 0; i < count; i++) {
    const sec = page.locator("section").nth(i);
    await sec.scrollIntoViewIfNeeded();
    // let the reveal animation finish before capturing
    await page.waitForTimeout(1100);

    const box = await sec.boundingBox();
    const chunks = box ? Math.max(1, Math.ceil(box.height / (mode === "mobile" ? 780 : 860))) : 1;

    for (let c = 0; c < chunks; c++) {
      if (c > 0) {
        await page.evaluate(
          ([idx, chunk, h]) => {
            const s = document.querySelectorAll("section")[idx as number];
            window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY + (chunk as number) * (h as number));
          },
          [i, c, mode === "mobile" ? 780 : 860]
        );
        await page.waitForTimeout(700);
      }
      const suffix = chunks > 1 ? `-${c}` : "";
      await page.screenshot({ path: path.join(OUT, `${name}-${mode}-${i}${suffix}.png`) });
      console.log(`${name}-${mode}-${i}${suffix}.png`);
    }
  }

  await ctx.close();
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
