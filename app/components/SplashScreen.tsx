"use client";
import React, { useEffect, useState } from "react";
import "./SplashScreen.css";
import { CSSProperties } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
}

interface ParticleStyle extends CSSProperties {
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
    }, 12000); // ⏳ Redirect after 12s

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
        {/* Particle Background */}
        <div className="particles">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={
                {
                  "--x": `${Math.random() - 0.5}`,
                  "--y": `${Math.random() - 0.5}`,
                } as ParticleStyle
              }
            />
          ))}
        </div>

        {/* Logo */}
        <img
          src="/assets/splash/Logo.svg"
          alt="Seraphine Logo"
          className="splash-logo"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Avatar */}
        <img
          src="/assets/splash/seraphine-avatar.png"
          alt="Seraphine Avatar"
          className="splash-avatar"
          style={{ opacity: showContent ? 1 : 0 }}
        />

        {/* Text */}
        <h1 className="splash-title" style={{ opacity: showText ? 1 : 0 }}>
          Welcome to Seraphine Hybrid
        </h1>
        <p className="splash-description" style={{ opacity: showText ? 1 : 0 }}>
          Your AI-powered hybrid experience
        </p>

        {/* Orb */}
        <div
          className="splash-orb"
          style={{
            opacity: showOrb ? 1 : 0,
            animation: showOrb ? "breathing 2s ease-in-out infinite" : "none",
          }}
        />
      </div>
    </main>
  );
}
