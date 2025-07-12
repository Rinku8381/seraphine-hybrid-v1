"use client";

import { useEffect, useState } from "react";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    // Animate dots every 500ms
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    // Complete after 10 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 10000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="brand-section">
          <div className="character-avatar">
            <div className="avatar-glow"></div>
            <div className="avatar-image"></div>
          </div>
          <h1 className="brand-title">SERAPHINE HYBRID V1</h1>
          <p className="brand-tagline">
            Your house. Your harmony. Your Seraphine.
          </p>
        </div>

        <div className="loading-section">
          <div className="loading-dots">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`dot ${index <= dots - 1 ? "active" : ""}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
