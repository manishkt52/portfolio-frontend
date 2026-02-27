"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

/* =========================================================
   Dynamic Globe Import (No SSR)
========================================================= */

const World = dynamic(() => import("./Globe").then((m) => m.World), {
  ssr: false,
});

/* =========================================================
   GRID GLOBE COMPONENT
========================================================= */

const GridGlobe = () => {
  /* ---------------------------------------
     Stable Color Palette
  --------------------------------------- */
  const colors = useMemo(() => ["#06b6d4", "#3b82f6", "#6366f1"], []);

  const getColor = (index: number) => colors[index % colors.length];

  /* ---------------------------------------
     Globe Configuration (Memoized)
  --------------------------------------- */
  const globeConfig = useMemo(
    () => ({
      globeColor: "#0B1120",
      emissive: "#000000",
      emissiveIntensity: 0.15,
      shininess: 0.9,
      polygonColor: "rgba(255,255,255,0.08)",
      atmosphereColor: "#3B82F6",
      atmosphereAltitude: 0.12,
      ambientLight: "#38bdf8",
      directionalLeftLight: "#ffffff",
      directionalTopLight: "#ffffff",
      pointLight: "#ffffff",
      arcTime: 2500,
      arcLength: 0.9,
      maxRings: 3,
      autoRotate: true,
      autoRotateSpeed: 0.6,
    }),
    [],
  );

  /* ---------------------------------------
     Arc Data (Clean + Memoized)
  --------------------------------------- */
  const sampleArcs = useMemo(() => {
    const baseConnections = [
      [28.6139, 77.209, 3.139, 101.6869], // India → Malaysia
      [51.5072, -0.1276, 40.7128, -74.006], // London → NYC
      [22.3193, 114.1694, 34.0522, -118.2437], // HK → LA
      [-33.8688, 151.2093, 35.6762, 139.6503], // Sydney → Tokyo
      [1.3521, 103.8198, 52.3676, 4.9041], // Singapore → Amsterdam
      [48.8566, 2.3522, 37.7749, -122.4194], // Paris → SF
    ];

    return baseConnections.map((coords, index) => ({
      order: index + 1,
      startLat: coords[0],
      startLng: coords[1],
      endLat: coords[2],
      endLng: coords[3],
      arcAlt: 0.2 + (index % 3) * 0.15,
      color: getColor(index),
    }));
  }, [colors]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full flex items-center justify-center"
    >
      <div className="relative w-full max-w-6xl h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Bottom Gradient Fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0B1120] pointer-events-none z-20" />

        {/* Globe */}
        <div className="absolute inset-0 z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </motion.div>
  );
};

export default GridGlobe;
