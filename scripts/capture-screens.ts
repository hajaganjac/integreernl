/**
 * Captures screenshots of the REAL running product for use as marketing
 * visuals (replacing stock photography). Requires the dev server running
 * on :3000 and the demo user to exist (scripts/demo-user.ts).
 *
 *   npx tsx scripts/capture-screens.ts
 */
import { chromium } from "playwright-core";
import path from "node:path";

const CHROME =
  "/Users/harun/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const BASE = "http://localhost:3000";
const OUT = path.join(process.cwd(), "public", "product");

const EMAIL = "demo@integreernl.nl";
const PASSWORD = "DemoAccount2026!";

async function main() {
  const browser = await chromium.launch({ executablePath: CHROME });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2, // retina-quality output
  });
  const page = await context.newPage();

  // --- log in -------------------------------------------------
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard", { timeout: 20000 });
  await page.waitForTimeout(1500); // let charts finish drawing

  // --- 1. dashboard -------------------------------------------
  await page.screenshot({
    path: path.join(OUT, "dashboard.png"),
    clip: { x: 0, y: 0, width: 1280, height: 820 },
  });
  console.log("captured dashboard.png");

  // --- 2. quiz, mid-question with feedback showing ------------
  await page.goto(`${BASE}/courses/reading/quiz`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  // answer the first question so the screenshot shows the feedback state,
  // which is the most interesting part of the quiz UI
  const firstOption = page.locator("h2 + div button").first();
  await firstOption.click();
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: path.join(OUT, "quiz.png"),
    clip: { x: 0, y: 0, width: 1280, height: 820 },
  });
  console.log("captured quiz.png");

  // --- 3. AI assistant with a real conversation ---------------
  await page.goto(`${BASE}/assistant`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const suggestion = page.getByRole("button", { name: /hebben/i }).first();
  if (await suggestion.count()) {
    await suggestion.click();
    await page.waitForTimeout(2000);
  }
  await page.screenshot({
    path: path.join(OUT, "assistant.png"),
    clip: { x: 0, y: 0, width: 1280, height: 820 },
  });
  console.log("captured assistant.png");

  // --- 4. vocabulary flashcard --------------------------------
  await page.goto(`${BASE}/courses/reading/vocabulary`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(OUT, "flashcards.png"),
    clip: { x: 0, y: 0, width: 1280, height: 820 },
  });
  console.log("captured flashcards.png");

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
