import confetti from "canvas-confetti";

const BRAND_COLORS = ["#1f6469", "#297d84", "#f97316", "#fb923c"];

export function fireConfetti(colors: string[] = BRAND_COLORS) {
  confetti({
    particleCount: 60,
    spread: 65,
    startVelocity: 35,
    origin: { y: 0.7 },
    colors,
    zIndex: 9999,
    disableForReducedMotion: true,
  });
}

export function fireBigConfetti(colors: string[] = BRAND_COLORS) {
  const end = Date.now() + 700;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.65 },
      colors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.65 },
      colors,
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({
    particleCount: 100,
    spread: 100,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors,
    zIndex: 9999,
    disableForReducedMotion: true,
  });
}
