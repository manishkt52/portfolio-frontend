"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
}

export function HoverBorderGradient({
  children,
  as: Tag = "button",
  containerClassName,
  className,
  duration = 1.2,
  clockwise = true,
  ...props
}: React.PropsWithChildren<HoverBorderGradientProps>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* =====================================================
     Direction Rotation Logic
  ===================================================== */
  const rotateDirection = (current: Direction): Direction => {
    const directions: Direction[] = ["TOP", "RIGHT", "BOTTOM", "LEFT"];
    const index = directions.indexOf(current);

    const nextIndex = clockwise
      ? (index + 1) % directions.length
      : (index - 1 + directions.length) % directions.length;

    return directions[nextIndex];
  };

  /* =====================================================
     Auto Rotate When Not Hovered
  ===================================================== */
  useEffect(() => {
    if (hovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setDirection((prev) => rotateDirection(prev));
    }, duration * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hovered, duration, clockwise]);

  /* =====================================================
     Gradient Maps (Dark SaaS Theme)
  ===================================================== */
  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(40% 60% at 50% 0%, rgba(99,102,241,0.9) 0%, transparent 70%)",
    RIGHT:
      "radial-gradient(40% 60% at 100% 50%, rgba(99,102,241,0.9) 0%, transparent 70%)",
    BOTTOM:
      "radial-gradient(40% 60% at 50% 100%, rgba(99,102,241,0.9) 0%, transparent 70%)",
    LEFT: "radial-gradient(40% 60% at 0% 50%, rgba(99,102,241,0.9) 0%, transparent 70%)",
  };

  const hoverHighlight =
    "radial-gradient(80% 120% at 50% 50%, rgba(168,85,247,0.85) 0%, transparent 70%)";

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl p-[1px] overflow-hidden",
        containerClassName,
      )}
      {...props}
    >
      {/* Animated Border Layer */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-md"
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], hoverHighlight]
            : movingMap[direction],
        }}
        transition={{
          duration,
          ease: "linear",
        }}
      />

      {/* Inner Button Content */}
      <div
        className={cn(
          "relative z-10 rounded-xl px-5 py-2 text-sm font-medium",
          "bg-[#0F172A] text-white",
          "transition-all duration-300",
          "hover:bg-[#111827]",
          className,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
