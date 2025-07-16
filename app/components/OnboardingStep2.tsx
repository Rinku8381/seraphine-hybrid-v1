"use client";

import React, { useState } from "react";
import "./OnboardingStep2.css";

interface OnboardingStep2Props {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function OnboardingStep2({
  onNext,
  onBack,
  onSkip,
}: OnboardingStep2Props) {
  const [selectedLanguage, setSelectedLanguage] = useState("indonesia");
  const [selectedVoice, setSelectedVoice] = useState("lembut");
  const [selectedTheme, setSelectedTheme] = useState("dark");

  const languages = [
    { id: "indonesia", label: "Indonesia", flag: "🇮🇩" },
    { id: "english", label: "English", flag: "🇺🇸" },
  ];

  const voices = [
    { id: "lembut", label: "Lembut", emoji: "😊" },
    { id: "enerjik", label: "Enerjik", emoji: "⚡" },
    { id: "profesional", label: "Profesional", emoji: "💼" },
    { id: "genit", label: "Genit", emoji: "😏" },
  ];

  const themes = [
    { id: "dark", label: "Dark", preview: "#0a0a0a" },
    { id: "cyberpunk", label: "Cyberpunk", preview: "#ff006e" },
    { id: "nature", label: "Nature", preview: "#00d4aa" },
    {
      id: "custom",
      label: "Custom",
      preview: "linear-gradient(45deg, #ff006e, #00d4ff)",
    },
  ];

  return (
    <div className="onboarding-step2">
      <div className="onboarding-container">
        {/* Progress Indicator */}
        <div className="progress-section">
          <div className="progress-dots">
            <div className="progress-dot completed"></div>
            <div className="progress-dot active"></div>
            <div className="progress-dot"></div>
          </div>
          <span className="progress-text">2/3</span>
        </div>

        {/* Content */}
        <div className="content-section">
          <h1 className="section-title">Personalisasi</h1>
          <p className="section-subtitle">
            Sesuaikan Seraphine dengan preferensi Anda
          </p>

          {/* Language Selection */}
          <div className="setting-group">
            <h3 className="setting-title">Bahasa</h3>
            <div className="option-grid language-grid">
              {languages.map((language) => (
                <button
                  key={language.id}
                  className={`option-card ${selectedLanguage === language.id ? "selected" : ""}`}
                  onClick={() => setSelectedLanguage(language.id)}
                >
                  <span className="option-flag">{language.flag}</span>
                  <span className="option-label">{language.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Selection */}
          <div className="setting-group">
            <h3 className="setting-title">Suara</h3>
            <div className="option-grid voice-grid">
              {voices.map((voice) => (
                <button
                  key={voice.id}
                  className={`option-card ${selectedVoice === voice.id ? "selected" : ""}`}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  <span className="option-emoji">{voice.emoji}</span>
                  <span className="option-label">{voice.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div className="setting-group">
            <h3 className="setting-title">Tema</h3>
            <div className="option-grid theme-grid">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  className={`option-card theme-card ${selectedTheme === theme.id ? "selected" : ""}`}
                  onClick={() => setSelectedTheme(theme.id)}
                >
                  <div
                    className="theme-preview"
                    style={{
                      background:
                        theme.id === "custom" ? theme.preview : theme.preview,
                    }}
                  ></div>
                  <span className="option-label">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-section">
          <div className="button-section">
            <button className="back-button" onClick={onBack}>
              <span className="button-text">Back</span>
            </button>
            <button className="next-button" onClick={onNext}>
              <span className="button-text">Next</span>
            </button>
            <button className="skip-button" onClick={onSkip}>
              <span className="button-text">Skip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
