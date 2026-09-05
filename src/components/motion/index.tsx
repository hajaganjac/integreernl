"use client";

/* ============================================================
   IntegreerNL motion system.

   Five primitives, used everywhere. Components must not write
   bespoke animation — importing from here keeps timing/easing
   consistent and makes the motion language reviewable in one file.

   Rules enforced here:
   - transform/opacity only (GPU-accelerated); never width/height/top/left
   - scroll reveals fire once, never re-trigger on scroll-up
   - prefers-reduced-motion disables movement everywhere, no exceptions
   ============================================================ */

import {
  motion,
  useReducedMotion,
  useInView,
  animate,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Shared easing — mirrors --ease-out-soft in globals.css. */
const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;

const DISTANCE = 16;
const DURATION = 0.5;
const STAGGER = 0.08;

/* ------------------------------------------------------------
   1. FadeInUp — the workhorse. Fades + rises an element, either
   on mount (hero) or when scrolled into view (everything else).
   ------------------------------------------------------------ */
export function FadeInUp({
  children,
  delay = 0,
  onView = true,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  /** true = reveal on scroll into view; false = animate immediately on mount */
  onView?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) return <Comp className={className}>{children}</Comp>;

  const animateProps = onView
    ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } }
    : { animate: { opacity: 1, y: 0 } };

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: DISTANCE }}
      transition={{ duration: DURATION, delay, ease: EASE_OUT_SOFT }}
      {...animateProps}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------
   2. StaggerChildren — parent orchestrator. Pair with
   <StaggerItem> children for sequenced entrances.
   ------------------------------------------------------------ */
export function StaggerChildren({
  children,
  className,
  delay = 0,
  onView = true,
  stagger = STAGGER,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  onView?: boolean;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <motion.div
      className={className}
      variants={parent}
      initial="hidden"
      {...(onView
        ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : { animate: "show" })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const item: Variants = {
    hidden: { opacity: 0, y: DISTANCE },
    show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE_OUT_SOFT } },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------
   3. ScaleOnHover — springy press/hover feedback for buttons,
   cards and any tappable surface.
   ------------------------------------------------------------ */
export function ScaleOnHover({
  children,
  className,
  hover = 1.03,
  tap = 0.97,
  lift = 0,
}: {
  children: ReactNode;
  className?: string;
  hover?: number;
  tap?: number;
  /** px to translateY on hover — used for card "lift" */
  lift?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      whileHover={{ scale: hover, y: -lift }}
      whileTap={{ scale: tap }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------
   4. CountUp — animates a number when scrolled into view.
   Used by the stats bar to preview the product's "track your
   progress" metaphor on the marketing page itself.
   ------------------------------------------------------------ */
export function CountUp({
  to,
  from = 0,
  duration = 1.4,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(from, to, {
      duration,
      ease: EASE_OUT_SOFT,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------
   5. ScrollProgressReveal — draws a value in on scroll. Backs
   the progress ring and streak bar in "how it works".
   Renders children via a 0→1 progress render-prop.
   ------------------------------------------------------------ */
export function ScrollProgressReveal({
  children,
  duration = 1.2,
  className,
}: {
  children: (progress: number) => ReactNode;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [progress, setProgress] = useState(reduce ? 1 : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, 1, {
      duration,
      ease: EASE_OUT_SOFT,
      onUpdate: setProgress,
    });
    return () => controls.stop();
  }, [inView, reduce, duration]);

  return (
    <div ref={ref} className={className}>
      {children(progress)}
    </div>
  );
}
