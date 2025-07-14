"use client";
import React, { useEffect, useState } from "react";
import "./SplashScreen.css";
import ParticleEffects from "./ParticleEffects";

interface SplashScreenProps {
  onComplete?: () => void;
}

interface ParticleStyle {
  "--x"?: string;
  "--y"?: string;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showOrb, setShowOrb] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setIsLoaded(true), 800);
    const avatarTimer = setTimeout(() => setShowContent(true), 2000);
    const textTimer = setTimeout(() => setShowText(true), 3500);
    const orbTimer = setTimeout(() => setShowOrb(true), 5000);
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 12000); // ⏳ Redirect after 15s

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(avatarTimer);
      clearTimeout(textTimer);
      clearTimeout(orbTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <main className="splash-main">
      <div className="splash-container">
        <ParticleEffects
          intensity="medium"
          effects={{
            particles: true,
            neural: true,
            scanlines: false,
            ambientLights: true,
            dataStream: false
          }}
        />

        {/* Logo */}
        <img
          src="/assets/splash/Logo.svg"
          alt="Seraphine Logo"
          className={`splash-logo ${isLoaded ? "loaded" : ""}`}
        />

        {/* Avatar */}
        <img
          src="/assets/splash/seraphine-avatar.png"
          alt="Seraphine Avatar"
          className={`splash-avatar ${showContent ? "show" : ""}`}
        />

        {/* Text */}
        <h2 className={`main-text ${showText ? "show" : ""}`}>
          Your house. Your harmony.
        </h2>
        <h1 className={`brand-text ${showText ? "show" : ""}`}>
          Your Seraphine.
        </h1>

        {/* Loading Orb */}
        <img
          src="/assets/splash/loading-orb.gif"
          alt="Loading..."
          className={`loading-orb ${showContent ? "show" : ""}`}
        />
        {/* Section */}
        <div className="splash-container">
          <div className="particle-dot dot1"></div>
          <div className="particle-dot dot2"></div>
          <div className="particle-dot dot3"></div>
          <div className="particle-dot dot4"></div>
        </div>
      </div>
    </main>
  );
}
