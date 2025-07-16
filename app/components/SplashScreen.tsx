"use client";
import React, { useEffect, useState } from "react";
import "./SplashScreen.css";
import ParticleEffects from "./ParticleEffects";

interface SplashScreenProps {
onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps): React.JSX.Element {
const [isLoaded, setIsLoaded] = useState(false);
const [showContent, setShowContent] = useState(false);
const [showText, setShowText] = useState(false);

useEffect(() => {
const timers = [
setTimeout(() => setIsLoaded(true), 800),
setTimeout(() => setShowContent(true), 2000),
setTimeout(() => setShowText(true), 3500),
setTimeout(() => onComplete?.(), 12000),
];
return () => timers.forEach(clearTimeout);
}, [onComplete]);

return (

    <main className="splash-main">
      {/* 🎵 Background Music */}
      <audio autoPlay loop preload="auto">
        <source
          src="/assets/splash/splash-futuristic-synthwave.mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className="splash-container">
        {/* 💫 Particle FX Layer */}
        <ParticleEffects
          intensity="medium"
          effects={{
            particles: true,
            neural: true,
            scanlines: false,
            ambientLights: true,
            dataStream: false,
          }}
        />

        {/* 🌟 All Magical FX here */}
        <div className="effects-layer">
          {/* ✨ Starlight */}
          <div className="starlight-overlay" />

          {/* 🌀 Rising Fog Particles */}
          {[...Array(10)].map((_, i) => (
            <span
              key={`rise-${i}`}
              className="rising-particle"
              style={{
                left: `${5 + i * 9}%`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}

          {/* 🧚 Fireflies */}
          {[
            { top: "10%", left: "20%", delay: "0s", color: "cyan" },
            { top: "30%", left: "70%", delay: "1.3s", color: "magenta" },
            { top: "45%", left: "35%", delay: "2.1s", color: "purple" },
            { top: "60%", left: "80%", delay: "0.6s", color: "gold" },
            { top: "72%", left: "10%", delay: "3.5s", color: "blue" },
            { top: "80%", left: "55%", delay: "1.8s", color: "cyan" },
            { top: "20%", left: "85%", delay: "2.9s", color: "magenta" },
            { top: "38%", left: "50%", delay: "0.9s", color: "purple" },
            { top: "65%", left: "30%", delay: "4.2s", color: "gold" },
            { top: "5%", left: "5%", delay: "3s", color: "blue" },
            { top: "15%", left: "60%", delay: "3.3s", color: "magenta tiny" },
          ].map((f, i) => (
            <span
              key={`ff-${i}`}
              className={`firefly ${f.color}`}
              style={{ top: f.top, left: f.left, animationDelay: f.delay }}
            />
          ))}
        </div>

        {/* 🌙 Logo */}
        <img
          src="/assets/splash/Logo.svg"
          alt="Seraphine Logo"
          className={`splash-logo ${isLoaded ? "loaded" : ""}`}
        />

        {/* 🌸 Avatar */}
        <div className="avatar-wrapper">
          <div className="avatar-glow" />
          <img
            src="/assets/splash/seraphine-avatar.png"
            alt="Seraphine"
            className={`splash-avatar ${showContent ? "show" : ""}`}
          />
        </div>

        {/* 💬 Text */}
        <h2 className={`main-text ${showText ? "show" : ""}`}>
          Your house. Your harmony.
        </h2>
        <h1 className={`brand-text ${showText ? "show" : ""}`}>
          Your Seraphine.
        </h1>

        {/* 🪄 Loading */}
        <img
          src="/assets/splash/loading-orb.gif"
          alt="Loading..."
          className={`loading-orb ${showContent ? "show" : ""}`}
        />
        </div>
    </main>
  );
}
