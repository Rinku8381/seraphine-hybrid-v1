"use client";

import React, { useEffect, useRef } from "react";
import "./ParticleEffects.css";

// Floating Data Particles Component
interface FloatingParticlesProps {
  count?: number;
  speed?: "slow" | "normal" | "fast";
  color?: "primary" | "secondary" | "mixed";
}

export function FloatingParticles({
  count = 20,
  speed = "normal",
  color = "mixed",
}: FloatingParticlesProps) {
  return (
    <div className={`floating-particles ${speed} ${color}`}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="particle"
          style={
            {
              "--delay": `${i * 0.3}s`,
              "--duration": `${8 + Math.random() * 4}s`,
              "--start-x": `${Math.random() * 100}%`,
              "--end-x": `${Math.random() * 100}%`,
              "--size": `${2 + Math.random() * 4}px`,
            } as React.CSSProperties
          }
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </div>
      ))}
    </div>
  );
}

// Neural Network Background
export function NeuralNetworkBackground() {
  return (
    <div className="neural-network-background">
      <svg className="neural-svg" width="100%" height="100%">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Neural nodes */}
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i}>
            <circle
              cx={`${20 + (i % 4) * 25}%`}
              cy={`${20 + Math.floor(i / 4) * 30}%`}
              r="3"
              fill="#22d3ee"
              filter="url(#glow)"
              className="neural-node"
              style={
                {
                  "--delay": `${i * 0.5}s`,
                  "--duration": `${3 + Math.random() * 2}s`,
                } as React.CSSProperties
              }
            />

            {/* Neural connections */}
            {i < 11 && (
              <line
                x1={`${20 + (i % 4) * 25}%`}
                y1={`${20 + Math.floor(i / 4) * 30}%`}
                x2={`${20 + ((i + 1) % 4) * 25}%`}
                y2={`${20 + Math.floor((i + 1) / 4) * 30}%`}
                stroke="#22d3ee"
                strokeWidth="1"
                opacity="0.3"
                filter="url(#glow)"
                className="neural-connection"
                style={{ "--delay": `${i * 0.3}s` } as React.CSSProperties}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// Matrix Rain Effect
interface MatrixRainProps {
  intensity?: "light" | "medium" | "heavy";
}

export function MatrixRain({ intensity = "light" }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix rain parameters
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    // Intensity settings
    const intensitySettings = {
      light: { speed: 0.3, opacity: 0.05 },
      medium: { speed: 0.5, opacity: 0.1 },
      heavy: { speed: 0.8, opacity: 0.15 },
    };

    const settings = intensitySettings[intensity];

    const draw = () => {
      // Semi-transparent black background for fading effect
      ctx.fillStyle = `rgba(0, 0, 0, ${0.05})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = `rgba(34, 211, 238, ${settings.opacity})`;
      ctx.font = `${fontSize}px Consolas, monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        if (Math.random() < settings.speed) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillText(char, x, y);

          // Reset drop to top randomly
          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        opacity: 0.3,
      }}
    />
  );
}

// Cyber Grid Background
export function CyberGrid() {
  return (
    <div className="cyber-grid">
      <div className="grid-lines horizontal">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="grid-line"
            style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="grid-lines vertical">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="grid-line"
            style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

// Holographic Scanlines
export function HolographicScanlines() {
  return (
    <div className="holographic-scanlines">
      <div className="scanline-container">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="scanline"
            style={
              {
                "--delay": `${i * 2}s`,
                "--duration": `${8 + i}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

// Data Stream Effect
interface DataStreamProps {
  direction?: "horizontal" | "vertical" | "diagonal";
  count?: number;
}

export function DataStream({
  direction = "horizontal",
  count = 5,
}: DataStreamProps) {
  return (
    <div className={`data-stream ${direction}`}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="stream-line"
          style={
            {
              "--delay": `${i * 1.5}s`,
              "--offset": `${i * 20}%`,
            } as React.CSSProperties
          }
        >
          <div className="stream-data">
            {">>>"
              .repeat(20)
              .split("")
              .map((char, j) => (
                <span
                  key={j}
                  style={
                    { "--char-delay": `${j * 0.1}s` } as React.CSSProperties
                  }
                >
                  {char}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Ambient Light Orbs
export function AmbientLightOrbs() {
  return (
    <div className="ambient-light-orbs">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="light-orb"
          style={
            {
              "--delay": `${i * 0.8}s`,
              "--duration": `${6 + Math.random() * 4}s`,
              "--start-x": `${Math.random() * 100}%`,
              "--start-y": `${Math.random() * 100}%`,
              "--end-x": `${Math.random() * 100}%`,
              "--end-y": `${Math.random() * 100}%`,
              "--size": `${40 + Math.random() * 60}px`,
              "--hue": `${Math.random() * 60 + 170}deg`, // Blue to cyan range
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// Circuit Board Pattern
export function CircuitBoardPattern() {
  return (
    <div className="circuit-board">
      <svg className="circuit-svg" width="100%" height="100%">
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20,20 L80,20 L80,80 L20,80 Z M40,0 L40,40 M60,40 L100,40 M60,60 L60,100 M0,60 L40,60"
              stroke="rgba(34, 211, 238, 0.1)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="20" cy="20" r="2" fill="rgba(34, 211, 238, 0.3)" />
            <circle cx="80" cy="20" r="2" fill="rgba(34, 211, 238, 0.3)" />
            <circle cx="80" cy="80" r="2" fill="rgba(34, 211, 238, 0.3)" />
            <circle cx="20" cy="80" r="2" fill="rgba(34, 211, 238, 0.3)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" opacity="0.1" />
      </svg>
    </div>
  );
}

// Combined Cyberpunk Atmosphere
interface CyberpunkAtmosphereProps {
  effects?: {
    particles?: boolean;
    neural?: boolean;
    matrix?: boolean;
    grid?: boolean;
    scanlines?: boolean;
    dataStream?: boolean;
    ambientLights?: boolean;
    circuitBoard?: boolean;
  };
  intensity?: "minimal" | "moderate" | "full";
}

export function CyberpunkAtmosphere({
  effects = {},
  intensity = "moderate",
}: CyberpunkAtmosphereProps) {
  const defaultEffects = {
    minimal: {
      particles: true,
      scanlines: true,
      ambientLights: false,
      grid: false,
      neural: false,
      matrix: false,
      dataStream: false,
      circuitBoard: false,
    },
    moderate: {
      particles: true,
      neural: true,
      scanlines: true,
      ambientLights: true,
      grid: false,
      matrix: false,
      dataStream: true,
      circuitBoard: false,
    },
    full: {
      particles: true,
      neural: true,
      matrix: true,
      grid: true,
      scanlines: true,
      dataStream: true,
      ambientLights: true,
      circuitBoard: true,
    },
  };

  const activeEffects = { ...defaultEffects[intensity], ...effects };

  return (
    <div className="cyberpunk-atmosphere">
      {activeEffects.circuitBoard && <CircuitBoardPattern />}
      {activeEffects.grid && <CyberGrid />}
      {activeEffects.neural && <NeuralNetworkBackground />}
      {activeEffects.matrix && <MatrixRain intensity="light" />}
      {activeEffects.particles && (
        <FloatingParticles count={15} speed="normal" />
      )}
      {activeEffects.scanlines && <HolographicScanlines />}
      {activeEffects.dataStream && (
        <DataStream direction="horizontal" count={3} />
      )}
      {activeEffects.ambientLights && <AmbientLightOrbs />}
    </div>
  );
}

// Export all components
export default {
  FloatingParticles,
  NeuralNetworkBackground,
  MatrixRain,
  CyberGrid,
  HolographicScanlines,
  DataStream,
  AmbientLightOrbs,
  CircuitBoardPattern,
  CyberpunkAtmosphere,
};
