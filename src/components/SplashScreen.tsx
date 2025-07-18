// SplashScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/splash.module.css';
import ParticleEffects from '@/components/ParticleEffects';
import TermsModal from '@/components/TermsModal';

export default function SplashScreen(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();
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
    setTimeout(() => {
      router.push('/login');
    }, 300);
  };

  const handleDecline = () => {
    setShowTerms(false);
    // Optionally, navigate to a landing or error page:
    // router.push('/');
  };

  return (
    <main className={styles.splashMain}>
      <audio ref={audioRef} loop preload="auto">
        <source src="/assets/splash/SplashFuturisticSynthwave.mp3" type="audio/mpeg" />
      </audio>

      {(!showTerms && isLoaded && showContent) && (
        <div className={styles.splashContainer}>
          <ParticleEffects />

          <div className={styles.starlightOverlay} />

          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className={styles.risingParticle}
            />
          ))}

          {/* --- Avatar with gradient background --- */}
          <div className={styles.avatarWrapper}>
            <img
              src="/assets/splash/GradientBackAvatar.png"
              alt="Avatar Gradient Background"
              className={styles.avatarGradient}
            />
            <img
              src="/assets/splash/SeraphineAvatar.png"
              alt="Seraphine Avatar"
              className={styles.avatarImage}
            />
          </div>
          {/* --- End Avatar --- */}

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
            onClick={() => {
              audioRef.current?.play();
              setShowTerms(true);
            }}
          >
            Get Started
          </button>
        </div>
      )}

      {showTerms && (
        <TermsModal
          isVisible={showTerms}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </main>

  );
}
// SplashScreen.tsx