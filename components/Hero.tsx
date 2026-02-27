"use client";

import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1e1b4b] pb-20 pt-36">
      {/* 🔥 Spotlights */}
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="white"
      />
      <Spotlight
        className="h-[80vh] w-[50vw] top-10 left-full"
        fill="#6366F1"
      />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#3B82F6" />

      {/* 🔥 Grid Background (Subtle Dark Version) */}
      <div className="absolute inset-0 bg-grid-white/[0.03]" />

      {/* 🔥 Radial Fade Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black)] pointer-events-none" />

      {/* 🔥 Main Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center space-y-8">
        {/* Top Label */}
        <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-indigo-300 max-w-xs">
          Dynamic Web Magic with Next.js
        </p>

        {/* Main Heading */}
        <TextGenerateEffect
          words="Transforming Concepts into Seamless User Experiences"
          className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white"
        />

        {/* Subtitle */}
        <p className="max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
          Hi! I&apos;m Manish — an AI Engineer & Next.js Developer crafting
          modern, scalable, and high-performance digital experiences.
        </p>

        {/* CTA Button */}
        <a href="#about">
          <MagicButton
            title="Show my work"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
