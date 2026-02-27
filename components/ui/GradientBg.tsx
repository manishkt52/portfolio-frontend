"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  pointerColor?: string; // "r, g, b"
  size?: string; // e.g. "80%" or "600px"
  blendingValue?: React.CSSProperties["mixBlendMode"];
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  interactive?: boolean;
  pointerOpacity?: number;
  blurStrength?: string; // e.g. "blur-3xl"
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "#0B1120",
  gradientBackgroundEnd = "#111827",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  containerClassName,
  interactive = true,
  pointerOpacity = 0.6,
  blurStrength = "blur-3xl",
}: BackgroundGradientAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  /* ======================================================
     Smooth Pointer Animation (RAF Loop)
  ====================================================== */
  useEffect(() => {
    if (!interactive) return;

    const animate = () => {
      // Smooth interpolation
      current.current.x += (mouse.current.x - current.current.x) * 0.08;
      current.current.y += (mouse.current.y - current.current.y) * 0.08;

      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [interactive]);

  /* ======================================================
     Mouse Move Handler
  ====================================================== */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={interactive ? handleMouseMove : undefined}
      className={cn("absolute inset-0 overflow-hidden", containerClassName)}
      style={{
        background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
      }}
    >
      {/* ================= Content Layer ================= */}
      <div className={cn("relative z-10", className)}>{children}</div>

      {/* ================= Pointer Glow ================= */}
      {interactive && (
        <div
          ref={pointerRef}
          className={cn(
            "pointer-events-none absolute rounded-full",
            blurStrength,
          )}
          style={{
            width: size,
            height: size,
            opacity: pointerOpacity,
            background: `radial-gradient(circle, rgba(${pointerColor},0.8) 0%, rgba(${pointerColor},0.4) 30%, transparent 70%)`,
            mixBlendMode: blendingValue,
            transform: "translate3d(0,0,0)",
          }}
        />
      )}
    </div>
  );
};
