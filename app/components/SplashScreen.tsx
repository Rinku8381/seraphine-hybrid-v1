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
    }, 12000); // ⏳ Redirect after 30s

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
      {/* === Audio Background === */}
  <audio autoPlay loop preload="auto">
    <source src="/assets/splash/splash-futuristic-synthwave.mp3" type="audio/mpeg" />
  </audio>
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
        <div className="avatar-wrapper">
          <div className="avatar-glow"></div>
          <img
            src="/assets/splash/seraphine-avatar.png"
            alt="Seraphine"
            className={`splash-avatar ${showContent ? "show" : ""}`}
          />
        </div>

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
        {/* Fireflies */}
        <span className="firefly" style={{ top: "10%", left: "20%", animationDelay: "0s" }}></span>
        <span className="firefly" style={{ top: "30%", left: "70%", animationDelay: "1s" }}></span>
        <span className="firefly" style={{ top: "50%", left: "40%", animationDelay: "2s" }}></span>
        <span className="firefly" style={{ top: "65%", left: "80%", animationDelay: "3s" }}></span>
        <span className="firefly" style={{ top: "75%", left: "10%", animationDelay: "4s" }}></span>
        <span className="firefly" style={{ top: "85%", left: "50%", animationDelay: "5s" }}></span>
        <span className="firefly tiny cyan" style={{ top: "50%", left: "25%", animationDelay: "2.2s" }}></span>

        {/* Enhanced Magical Fireflies */}
        <>
        <span className="firefly cyan" style={{ top: "10%", left: "20%", animationDelay: "0s" }}></span>
        <span className="firefly magenta" style={{ top: "30%", left: "70%", animationDelay: "1.3s" }}></span>
        <span className="firefly purple" style={{ top: "45%", left: "35%", animationDelay: "2.1s" }}></span>
        <span className="firefly gold" style={{ top: "60%", left: "80%", animationDelay: "0.6s" }}></span>
        <span className="firefly blue" style={{ top: "72%", left: "10%", animationDelay: "3.5s" }}></span>
        <span className="firefly cyan" style={{ top: "80%", left: "55%", animationDelay: "1.8s" }}></span>
        <span className="firefly magenta" style={{ top: "20%", left: "85%", animationDelay: "2.9s" }}></span>
        <span className="firefly purple" style={{ top: "38%", left: "50%", animationDelay: "0.9s" }}></span>
        <span className="firefly gold" style={{ top: "65%", left: "30%", animationDelay: "4.2s" }}></span>
        <span className="firefly blue" style={{ top: "5%", left: "5%", animationDelay: "3s" }}></span>
        <span className="firefly tiny magenta" style={{ top: "15%", left: "60%", animationDelay: "3.3s" }}></span>
        </>
        {/* Particle Effects */}
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
