// SplashScreen.tsx
import React, { useState, useEffect } from 'react';
import styles from '@/styles/splash.module.css';
import ParticleEffects from '@/components/ParticleEffects';
import TermsModal from '@/components/TermsModal';

export default function SplashScreen(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => setShowContent(true), 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setShowTerms(false);
    window.location.href = "/login"; // Redirect to login after accepting terms
  };

  const handleDecline = () => {
    setShowTerms(false);
    // Optionally redirect to error/landing page
  };

  return (
    <main className={styles.splashMain}>
      <audio autoPlay loop preload="auto">
        <source src="/assets/splash/splash-futuristic-synthwave.mp3" type="audio/mpeg" />
      </audio>

      <div className={styles.splashContainer}>
        <ParticleEffects />

        <div className={styles.starlightOverlay} />

        {[...Array(10)].map((_, i) => (
          <span key={i} className={styles.risingParticle} style={{ left: `${5 + i * 10}%` }} />
        ))}

        <img src="/assets/splash/logo.svg" alt="Seraphine Logo" className={`${styles.splashLogo} ${isLoaded ? styles.loaded : ''}`} />

        <h1 className={`${styles.splashTitle} ${isLoaded ? styles.loaded : ''}`}>
          <span>Seraphine</span>
          <span>Hybrid</span>
        </h1>

        <p className={`${styles.splashSubtitle} ${isLoaded ? styles.loaded : ''}`}>
          Welcome to the future of smart home automation
        </p>

        <button
          className={`${styles.startButton} ${isLoaded ? styles.loaded : ''}`}
          onClick={() => setShowTerms(true)}
        >
          Get Started
        </button>

        {showTerms && (
          <TermsModal
            isVisible={showTerms}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}
      </div>
    </main>
  );
}
// SplashScreen.tsx