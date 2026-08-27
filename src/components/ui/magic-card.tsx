"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

interface MagicCardBaseProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
  /**
   * Surface painted under the spotlight. Defaults to the page background.
   * Set this rather than giving the child its own background: the child renders
   * above the spotlight layer, so an opaque child would hide the effect.
   */
  surfaceClassName?: string;
}

interface MagicCardGradientProps extends MagicCardBaseProps {
  mode?: "gradient";
  gradientColor?: string;
  gradientOpacity?: number;

  glowFrom?: never;
  glowTo?: never;
  glowAngle?: never;
  glowSize?: never;
  glowBlur?: never;
  glowOpacity?: never;
}

interface MagicCardOrbProps extends MagicCardBaseProps {
  mode: "orb";
  glowFrom?: string;
  glowTo?: string;
  glowAngle?: number;
  glowSize?: number;
  glowBlur?: number;
  glowOpacity?: number;

  gradientColor?: never;
  gradientOpacity?: never;
}

type MagicCardProps = MagicCardGradientProps | MagicCardOrbProps;
type ResetReason = "enter" | "leave" | "global" | "init";

function isOrbMode(props: MagicCardProps): props is MagicCardOrbProps {
  return props.mode === "orb";
}

/**
 * Tracks the `.dark` class on <html>.
 *
 * Upstream reads this from `next-themes`, which this project does not use — dark
 * mode is a class toggled directly on the document element, so we observe that.
 * Only orb mode needs it, for picking a blend mode.
 */
function useIsDarkTheme() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    const read = () => setIsDark(root.classList.contains("dark"));

    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export function MagicCard(props: MagicCardProps) {
  const {
    children,
    className,
    gradientSize = 200,
    // Derived from the brand token rather than a flat tint: the fixed tints are
    // only a few percent off the card surface, so the spotlight was invisible.
    gradientColor = "color-mix(in srgb, var(--color-brand) 22%, transparent)",
    gradientOpacity = 0.8,
    gradientFrom = "var(--color-brand)",
    gradientTo = "var(--color-accent-orchid)",
    surfaceClassName = "bg-background",
    mode = "gradient",
  } = props;

  const glowFrom = isOrbMode(props)
    ? (props.glowFrom ?? "var(--color-brand)")
    : "var(--color-brand)";
  const glowTo = isOrbMode(props)
    ? (props.glowTo ?? "var(--color-accent-orchid)")
    : "var(--color-accent-orchid)";
  const glowAngle = isOrbMode(props) ? (props.glowAngle ?? 90) : 90;
  const glowSize = isOrbMode(props) ? (props.glowSize ?? 420) : 420;
  const glowBlur = isOrbMode(props) ? (props.glowBlur ?? 60) : 60;
  const glowOpacity = isOrbMode(props) ? (props.glowOpacity ?? 0.9) : 0.9;

  const isDarkTheme = useIsDarkTheme();

  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 });

  const modeRef = React.useRef(mode);
  const glowOpacityRef = React.useRef(glowOpacity);
  const gradientSizeRef = React.useRef(gradientSize);

  React.useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  React.useEffect(() => {
    glowOpacityRef.current = glowOpacity;
  }, [glowOpacity]);

  React.useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  const reset = React.useCallback(
    (reason: ResetReason = "leave") => {
      const currentMode = modeRef.current;

      if (currentMode === "orb") {
        if (reason === "enter") orbVisible.set(glowOpacityRef.current);
        else orbVisible.set(0);
        return;
      }

      const off = -gradientSizeRef.current;
      mouseX.set(off);
      mouseY.set(off);
    },
    [mouseX, mouseY, orbVisible],
  );

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  React.useEffect(() => {
    reset("init");
  }, [reset]);

  React.useEffect(() => {
    const handleGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset("global");
    };
    const handleBlur = () => reset("global");
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset("global");
    };

    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset]);

  // Hoisted out of the JSX: upstream calls these inside conditional branches,
  // which is a conditional hook call. They are cheap, so build both up front.
  const borderBackground = useMotionTemplate`
    linear-gradient(var(--color-background) 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      var(--color-border) 100%
    ) border-box
  `;

  const spotlightBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 100%
    )
  `;

  return (
    <motion.div
      className={cn(
        "group/magic relative isolate overflow-hidden rounded-[inherit] border border-transparent",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => reset("leave")}
      onPointerEnter={() => reset("enter")}
      style={{ background: borderBackground }}
    >
      <div className={cn("absolute inset-px z-20 rounded-[inherit]", surfaceClassName)} />

      {mode === "gradient" && (
        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/magic:opacity-100"
          style={{ background: spotlightBackground, opacity: gradientOpacity }}
        />
      )}

      {mode === "orb" && (
        <motion.div
          suppressHydrationWarning
          aria-hidden="true"
          className="pointer-events-none absolute z-30"
          style={{
            width: glowSize,
            height: glowSize,
            x: orbX,
            y: orbY,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: 9999,
            filter: `blur(${glowBlur}px)`,
            opacity: orbVisible,
            background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,
            mixBlendMode: isDarkTheme ? "screen" : "multiply",
            willChange: "transform, opacity",
          }}
        />
      )}

      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
