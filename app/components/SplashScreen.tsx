"use client";
import React, { useEffect, useState } from "react";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 500);
    const contentTimer = setTimeout(() => setShowContent(true), 1500);
    const textTimer = setTimeout(() => setShowText(true), 2500);
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 5000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(contentTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <main className="splash-main">
      <div className="splash-container">
        <img
          src="/assets/splash/Logo.svg"
          alt="Seraphine Logo"
          className={`splash-logo ${isLoaded ? "loaded" : ""}`}
        />
        <img
          src="/assets/splash/seraphine-avatar.png"
          alt="Seraphine Avatar"
          className={`splash-avatar ${showContent ? "show" : ""}`}
        />
        <h2 className={`main-text ${showText ? "show" : ""}`}>
          Your house. Your harmony.
        </h2>
        <h1 className={`brand-text ${showText ? "show" : ""}`}>
          Your Seraphine.
        </h1>
        <img
          src="/assets/splash/loading-orb.gif"
          alt="Loading..."
          className={`loading-orb ${showContent ? "show" : ""}`}
        />
        <div className="content-section">
          <div className="section-item"></div>
          <div className="section-item"></div>
          <div className="section-item"></div>
        </div>
      </div>
    </main>
  );
}
