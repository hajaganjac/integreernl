/**
 * Accessibility audit. Injects axe-core into each route and reports
 * WCAG 2 A/AA violations. Run with the dev server up.
 *
 *   npx tsx scripts/a11y.ts
 */
import { chromium, type Page } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const CHROME =
  "/Users/harun/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const AXE = fs.readFileSync(
  path.join(process.cwd(), "node_modules/axe-core/axe.min.js"),
  "utf8"
);

const PUBLIC_ROUTES = ["/", "/login", "/register"];
const AUTHED_ROUTES = [
  "/dashboard",
  "/courses",
  "/courses/reading",
  "/courses/reading/reading-strategies",
  "/courses/reading/quiz",
  "/courses/reading/vocabulary",
  "/assistant",
];

interface Violation {
  id: string;
  impact: string;
  help: string;
  nodes: { html: string; failureSummary: string }[];
}

async function audit(page: Page, route: string) {
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
  // reveal everything so hidden-by-animation nodes are still analysed
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.5);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);

  await page.addScriptTag({ content: AXE });
  const results = (await page.evaluate(async () => {
    // @ts-expect-error injected global
    return await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    });
  })) as { violations: Violation[] };

  console.log(`\n=== ${route} ===`);
  if (!results.violations.length) {
    console.log("  no WCAG A/AA violations");
    return 0;
  }
  for (const v of results.violations) {
    console.log(`  [${v.impact}] ${v.id} — ${v.help}  (${v.nodes.length} node(s))`);
    console.log(`      ${v.nodes[0].html.slice(0, 130)}`);
    const summary = v.nodes[0].failureSummary?.split("\n").filter(Boolean)[1];
    if (summary) console.log(`      ${summary.trim().slice(0, 140)}`);
  }
  return results.violations.length;
}

async function main() {
  const browser = await chromium.launch({ executablePath: CHROME });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  let total = 0;
  for (const r of PUBLIC_ROUTES) total += await audit(page, r);

  // sign in, then audit the authenticated product surfaces
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  // Wait for hydration: clicking before React attaches its submit handler
  // triggers a native form post that goes nowhere.
  await page.waitForTimeout(1500);
  await page.fill('input[type="email"]', "demo@integreernl.nl");
  await page.fill('input[type="password"]', "DemoAccount2026!");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard", { timeout: 30000 });

  for (const r of AUTHED_ROUTES) total += await audit(page, r);

  console.log(`\nTOTAL violation types: ${total}`);
  await browser.close();
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
