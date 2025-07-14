import React, { useEffect, useState } from "react";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 8000); // splash 8 detik

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="brand-glow" />
        <div className="character-avatar">
          <img
            src="/assets/splash/seraphine-avatar.png"
            alt="Seraphine Avatar"
            className="avatar-image"
          />
        </div>
        <h1 className="brand-title">SERAPHINE HYBRID V1</h1>
        <p className="brand-tagline">
          Your house. Your harmony. <br />
          <span>Your Seraphine.</span>
        </p>
        <div className="loading-section">
          {Array.from({ length: dots }).map((_, i) => (
            <div key={i} className="loading-dot" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
