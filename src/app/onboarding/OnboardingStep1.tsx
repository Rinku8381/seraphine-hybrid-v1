"use client";

import React from "react";
import "./OnboardingStep1.css";

interface OnboardingStep1Props {
  onNext: () => void;
  onSkip: () => void;
}

export default function OnboardingStep1({ onNext, onSkip }: OnboardingStep1Props) {
  return (
    <div className="onboarding-step1">
      <div className="onboarding-container">
        {/* Progress Indicator */}
        <div className="progress-section">
          <div className="progress-dots">
            <div className="progress-dot active"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
          </div>
          <span className="progress-text">1/3</span>
        </div>

        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-container">
            <div className="avatar-glow"></div>
            <div className="avatar-circle">
              <div className="avatar-image">S</div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="content-section">
          <h1 className="welcome-title">
            Selamat Datang di
            <br />
            Rumah Seraphine
          </h1>
          <p className="welcome-subtitle">
            Mari kita atur rumah pintar Anda bersama untuk pengalaman yang lebih
            personal dan nyaman
          </p>
        </div>

        {/* Button Section */}
        <div className="button-section">
          <button className="setup-button" onClick={onNext}>
            <span className="button-text">Mulai Setup</span>
            <div className="button-arrow">→</div>
          </button>
          <button className="skip-button" onClick={onSkip}>
            <span className="button-text">Skip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
