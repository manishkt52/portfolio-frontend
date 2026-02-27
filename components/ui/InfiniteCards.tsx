"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface InfiniteMovingCardsProps {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  /* ----------------------------------------
     Duplicate Items Safely (React Way)
  ---------------------------------------- */
  const duplicatedItems = useMemo(() => {
    return [...items, ...items];
  }, [items]);

  /* ----------------------------------------
     Speed Control
  ---------------------------------------- */
  const speedMap = {
    fast: "20s",
    normal: "40s",
    slow: "80s",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className,
      )}
    >
      <ul
        className={cn(
          "flex w-max gap-12 py-8 animate-infinite-scroll",
          direction === "right" && "animate-infinite-scroll-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animationDuration: speedMap[speed],
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <li
            key={idx}
            className="w-[85vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 rounded-2xl border border-white/10 p-8 md:p-12 bg-gradient-to-br from-[#0B1120] to-[#111827]"
          >
            <blockquote>
              <p className="text-sm md:text-lg leading-relaxed text-slate-300">
                {item.quote}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src="/profile.svg"
                  alt={item.name}
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex flex-col">
                  <span className="text-white font-semibold text-base md:text-lg">
                    {item.name}
                  </span>
                  <span className="text-slate-400 text-sm">{item.title}</span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes infinite-scroll-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll linear infinite;
        }

        .animate-infinite-scroll-reverse {
          animation: infinite-scroll-reverse linear infinite;
        }
      `}</style>
    </div>
  );
};
