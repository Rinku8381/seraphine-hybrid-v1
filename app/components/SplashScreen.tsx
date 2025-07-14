"use client";
import React, { useEffect, useState } from "react";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 8000); // splash screen tampil 8 detik

    return () => {
      clearInterval(dotInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="brand-glow">
          <div className="character-avatar">
            <div className="avatar-glow"></div>
            <img
              src="/assets/splash/seraphine-avatar.png"
              alt="Seraphine Avatar"
              className="avatar-image"
            />
          </div>
          <h1 className="brand-title">SERAPHINE HYBRID V1</h1>
          <p className="brand-tagline">Your house. Your harmony. <br /> <span>Your Seraphine.</span></p>
        </div>

        <div className="loading-section">
          <img src="/assets/splash/loading-orb.gif" alt="Loading..." className="loading-orb" />
          <div className="loading-dots">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`dot ${dots > i ? "active" : ""}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
