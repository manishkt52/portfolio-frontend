"use client";

import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

/* =========================================================
   CANVAS REVEAL EFFECT
========================================================= */

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-full w-full relative overflow-hidden",
        containerClassName,
      )}
    >
      <DotMatrix
        colors={colors}
        dotSize={dotSize}
        opacities={opacities}
        animationSpeed={animationSpeed}
      />

      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

/* =========================================================
   DOT MATRIX
========================================================= */

interface DotMatrixProps {
  colors: number[][];
  opacities: number[];
  dotSize: number;
  animationSpeed: number;
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors,
  opacities,
  dotSize,
  animationSpeed,
}) => {
  const uniforms = useMemo(() => {
    const normalizedColors = colors.map((c) => [
      c[0] / 255,
      c[1] / 255,
      c[2] / 255,
    ]);

    return {
      u_colors: { value: normalizedColors },
      u_opacities: { value: opacities },
      u_dot_size: { value: dotSize },
      u_animation_speed: { value: animationSpeed },
    };
  }, [colors, opacities, dotSize, animationSpeed]);

  return <Shader source={fragmentShader} uniforms={uniforms} maxFps={60} />;
};

/* =========================================================
   SHADER MATERIAL
========================================================= */

type UniformMap = Record<string, { value: any }>;

const ShaderMaterialComponent = ({
  source,
  uniforms,
  maxFps = 60,
}: {
  source: string;
  uniforms: UniformMap;
  maxFps?: number;
}) => {
  const { size } = useThree();
  const ref = useRef<THREE.Mesh>(null!);
  const lastFrame = useRef(0);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: source,
      uniforms: {
        ...uniforms,
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(size.width, size.height),
        },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, [size.width, size.height, source, uniforms]);

  useFrame(({ clock }) => {
    const now = clock.getElapsedTime();
    if (now - lastFrame.current < 1 / maxFps) return;
    lastFrame.current = now;

    material.uniforms.u_time.value = now;
    material.uniforms.u_resolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

/* =========================================================
   SHADER WRAPPER
========================================================= */

const Shader: React.FC<{
  source: string;
  uniforms: UniformMap;
  maxFps?: number;
}> = ({ source, uniforms, maxFps }) => {
  return (
    <Canvas className="absolute inset-0" dpr={[1, 2]} gl={{ antialias: false }}>
      <ShaderMaterialComponent
        source={source}
        uniforms={uniforms}
        maxFps={maxFps}
      />
    </Canvas>
  );
};

/* =========================================================
   SHADERS
========================================================= */

const vertexShader = `
precision mediump float;
in vec3 position;
out vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform float u_opacities[10];
uniform float u_dot_size;
uniform float u_animation_speed;

out vec4 fragColor;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 grid = floor(st * 40.0);

  float rand = random(grid + floor(u_time * u_animation_speed));
  float opacity = u_opacities[int(rand * 10.0)];

  float dot = step(0.95, fract(st.x * 40.0)) * step(0.95, fract(st.y * 40.0));

  vec3 color = u_colors[int(rand * 3.0)];

  fragColor = vec4(color, dot * opacity);
}
`;
