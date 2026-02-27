"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* =========================================================
   FLOATING NAV
========================================================= */

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  /* ----------------------------------------
     Scroll Logic (Cleaner + More Stable)
  ---------------------------------------- */
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      setVisible(true);
    } else {
      if (latest > lastScroll) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
    }
    setLastScroll(latest);
  });

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        className={cn(
          "fixed top-8 inset-x-0 z-[5000] mx-auto",
          "flex items-center justify-center",
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center gap-6 px-8 py-4 rounded-xl",
            "border border-white/10",
            "bg-[#0F172A]/70 backdrop-blur-xl",
            "shadow-lg shadow-black/20",
          )}
        >
          {navItems.map((navItem, idx) => (
            <Link
              key={idx}
              href={navItem.link}
              className="relative flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-white"
            >
              {navItem.icon && (
                <span className="sm:hidden">{navItem.icon}</span>
              )}

              <span className="cursor-pointer">{navItem.name}</span>

              {/* Subtle Hover Underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-purple to-blue-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};
