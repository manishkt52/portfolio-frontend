"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { IoCopyOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

/**
 * IMPORTANT:
 * react-lottie is NOT SSR safe.
 * So we dynamically import it with ssr: false
 */
const Lottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-4 lg:gap-8 mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["VueJS", "NuxtJS", "GraphQL"];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // ✅ SSR-safe clipboard handling
  const handleCopy = () => {
    const text = "hsu@jsmastery.pro";

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none flex flex-col justify-between",
        className,
      )}
      style={{
        background:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 ? "flex justify-center" : ""} h-full`}>
        {/* Background Image */}
        <div className="w-full h-full absolute inset-0">
          {img && (
            <img
              src={img}
              alt="bento-image"
              className={cn(
                imgClassName,
                "object-cover object-center w-full h-full",
              )}
            />
          )}
        </div>

        {/* Spare Image */}
        {spareImg && (
          <div
            className={`absolute right-0 -bottom-5 ${
              id === 5 ? "w-full opacity-80" : ""
            }`}
          >
            <img
              src={spareImg}
              alt="spare-image"
              className="object-cover object-center w-full h-full"
            />
          </div>
        )}

        {/* Background Animation */}
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl" />
          </BackgroundGradientAnimation>
        )}

        {/* Content */}
        <div
          className={cn(
            titleClassName,
            "relative z-10 min-h-40 flex flex-col p-5 lg:p-10 transition duration-200 group-hover/bento:translate-x-2 text-white",
          )}
        >
          {/* Description */}
          {description && (
            <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-white/80">
              {description}
            </div>
          )}

          {/* Title */}
          {title && (
            <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold text-white">
              {title}
            </div>
          )}

          {/* 3D Globe */}
          {id === 2 && <GridGlobe />}

          {/* Tech Stack */}
          {id === 3 && (
            <div className="flex gap-2 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 lg:gap-6">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="py-2 px-3 lg:py-3 lg:px-4 text-xs lg:text-base rounded-lg text-center bg-[#10132E] text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 lg:gap-6">
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="py-2 px-3 lg:py-3 lg:px-4 text-xs lg:text-base rounded-lg text-center bg-[#10132E] text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Copy Email */}
          {id === 6 && (
            <div className="mt-5 relative">
              <div className="absolute -bottom-5 right-0">
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline className="text-white" />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31] text-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
