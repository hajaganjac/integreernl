/**
 * Verifies prefers-reduced-motion is honoured: with the preference set,
 * no element should be left mid-animation or invisible, and CSS
 * animation/transition durations should be neutralised.
 */
import { chromium } from "playwright-core";

const CHROME =
  "/Users/harun/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

async function main() {
  const browser = await chromium.launch({ executablePath: CHROME });

  for (const pref of ["reduce", "no-preference"] as const) {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: pref,
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    const result = await page.evaluate(() => {
      let invisible = 0;
      let animated = 0;
      const offenders: string[] = [];
      document.querySelectorAll("main *").forEach((el) => {
        const cs = getComputedStyle(el);
        const op = parseFloat(cs.opacity);
        if (op < 0.5) {
          invisible++;
          if (offenders.length < 4)
            offenders.push(`${el.tagName}.${(el.className || "").toString().slice(0, 40)}`);
        }
        const dur = parseFloat(cs.animationDuration) || 0;
        if (dur > 0.05) animated++;
      });
      return { invisible, animated, offenders };
    });

    console.log(`prefers-reduced-motion: ${pref}`);
    console.log(`  elements below 0.5 opacity : ${result.invisible}`);
    console.log(`  elements with animation>50ms: ${result.animated}`);
    if (result.offenders.length) console.log(`  e.g. ${result.offenders.join(" | ")}`);
    await ctx.close();
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
