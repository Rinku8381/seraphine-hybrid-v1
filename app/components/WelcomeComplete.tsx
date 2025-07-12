"use client";

import React from "react";
import "./WelcomeComplete.css";

interface WelcomeCompleteProps {
  onToDashboard: () => void;
}

export default function WelcomeComplete({
  onToDashboard,
}: WelcomeCompleteProps) {
  return (
    <div className="welcome-complete">
      <div className="welcome-container">
        {/* Completion Animation */}
        <div className="completion-section">
          <div className="check-animation">
            <div className="check-circle">
              <div className="check-mark">✓</div>
            </div>
            <div className="success-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
              <div className="particle particle-6"></div>
            </div>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-container">
            <div className="avatar-glow celebration"></div>
            <div className="avatar-circle">
              <div className="avatar-image">S</div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="content-section">
          <h1 className="completion-title">Semua sudah siap~</h1>
          <p className="completion-subtitle">
            Selamat! Setup rumah pintar Anda telah selesai. Seraphine siap
            membantu mengelola semua perangkat di rumah Anda.
          </p>

          <div className="features-preview">
            <div className="feature-item">
              <span className="feature-icon">🏠</span>
              <span className="feature-text">Kontrol Ruangan</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎛️</span>
              <span className="feature-text">Kelola Perangkat</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span className="feature-text">Tema Personal</span>
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="button-section">
          <button className="dashboard-button" onClick={onToDashboard}>
            <span className="button-text">Masuk ke Dashboard</span>
            <div className="button-arrow">→</div>
          </button>

          <p className="celebration-note">
            Mari mulai perjalanan rumah pintar Anda! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
