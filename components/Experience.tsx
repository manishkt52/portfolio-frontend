"use client";

import React from "react";
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const Experience = () => {
  return (
    <section className="py-24 w-full">
      <h1 className="heading text-center">
        <span className="bg-gradient-to-r from-purple to-blue-500 bg-clip-text text-transparent">
          My Work Experience
        </span>
      </h1>

      <div className="w-full mt-16 grid lg:grid-cols-4 grid-cols-1 gap-8">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "linear-gradient(135deg, #0B1120, #111827)",
              borderRadius: "calc(1.75rem * 0.96)",
            }}
            className="flex-1 text-white border border-white/10 backdrop-blur-md"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-6 gap-4">
              <img
                src={card.thumbnail}
                alt={card.title}
                className="lg:w-24 md:w-20 w-16 object-contain"
              />

              <div className="lg:ms-5">
                <h2 className="text-start text-lg md:text-xl font-semibold text-white">
                  {card.title}
                </h2>

                <p className="text-start text-slate-400 mt-3 text-sm md:text-base leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Experience;
