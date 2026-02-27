"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";

/* =========================
   APPROACH SECTION
========================= */

const Approach = () => {
  return (
    <section className="relative w-full py-28 bg-gradient-to-b from-[#0F172A] to-[#0B1120] overflow-hidden">
      {/* Section Heading */}
      <h1 className="heading text-center">
        <span className="bg-gradient-to-r from-purple to-blue-500 bg-clip-text text-transparent">
          My Approach
        </span>
      </h1>

      {/* Cards */}
      <div className="mt-20 flex flex-col lg:flex-row items-center justify-center w-full gap-8 px-6">
        <Card
          title="Planning & Strategy"
          icon={<AceternityIcon order="01" />}
          des="We collaborate to define your goals, audience, and structure.
          Clear planning ensures smooth execution and scalable architecture."
        >
          <CanvasRevealEffect
            animationSpeed={4}
            containerClassName="bg-emerald-900/80 rounded-3xl overflow-hidden"
          />
        </Card>

        <Card
          title="Development & Progress"
          icon={<AceternityIcon order="02" />}
          des="From wireframes to production-ready code, I build iteratively
          while keeping you updated at every milestone."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900/80 rounded-3xl overflow-hidden"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={2}
          />
        </Card>

        <Card
          title="Launch & Optimization"
          icon={<AceternityIcon order="03" />}
          des="After deployment, I optimize performance, SEO, and scalability
          to ensure long-term success."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-900/80 rounded-3xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

export default Approach;

/* =========================
   CARD COMPONENT
========================= */

const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group/canvas-card max-w-sm w-full mx-auto lg:h-[36rem] rounded-3xl p-8
      border border-white/10 backdrop-blur-md
      bg-gradient-to-br from-[#0B1120] to-[#111827]
      transition-all duration-500 hover:scale-[1.03]"
    >
      {/* Subtle corner icons */}
      <Icon className="absolute h-8 w-8 -top-3 -left-3 text-white/20" />
      <Icon className="absolute h-8 w-8 -bottom-3 -right-3 text-white/20" />

      {/* Hover Canvas Effect */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center space-y-6">
        <div className="transition-transform duration-300 group-hover/canvas-card:-translate-y-3">
          {icon}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xs">
          {des}
        </p>
      </div>
    </div>
  );
};

/* =========================
   PHASE ICON
========================= */

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
      {/* Animated Border */}
      <span
        className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite]
        bg-[conic-gradient(from_180deg,#a855f7,#6366f1,#3b82f6,#a855f7)]"
      />

      {/* Inner */}
      <span
        className="relative inline-flex items-center justify-center
        rounded-full bg-[#0F172A] px-6 py-3
        font-bold text-lg text-white backdrop-blur-md"
      >
        {order}
      </span>
    </button>
  );
};

/* =========================
   CORNER ICON
========================= */

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
