"use client";

import React, { useState } from "react";
import "./PersonalityCoreInterface.css";

interface PersonalityType {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient: string;
  characteristics: string[];
}

interface PersonalityCoreInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const personalityTypes: PersonalityType[] = [
  {
    id: "lembut",
    name: "Lembut & Penyayang",
    description:
      "Seraphine akan berbicara dengan nada yang hangat dan suportif",
    color: "#ff006e",
    gradient: "linear-gradient(135deg, #ff006e, #ff4081)",
    characteristics: [
      "Empati tinggi",
      "Suara lembut",
      "Responsif terhadap emosi",
    ],
  },
  {
    id: "tegas",
    name: "Tegas & Profesional",
    description: "Seraphine akan memberikan respons yang jelas dan efisien",
    color: "#22d3ee",
    gradient: "linear-gradient(135deg, #22d3ee, #0ea5e9)",
    characteristics: ["Komunikasi langsung", "Fokus efisiensi", "Analitis"],
  },
  {
    id: "genit",
    name: "Genit & Interaktif",
    description: "Seraphine akan berinteraksi dengan cara yang menyenangkan",
    color: "#A855F7",
    gradient: "linear-gradient(135deg, #A855F7, #ec4899)",
    characteristics: ["Playful", "Humor ringan", "Ekspresif"],
  },
  {
    id: "cuek",
    name: "Cuek Tapi Pintar",
    description: "Seraphine akan memberikan jawaban cerdas dengan sikap santai",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)",
    characteristics: [
      "Santai tapi akurat",
      "Minimal effort",
      "Smart solutions",
    ],
  },
  {
    id: "diam",
    name: "Diam Tapi Cekatan",
    description: "Seraphine akan bekerja efisien dengan komunikasi minimal",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    characteristics: ["Minimal words", "Action oriented", "Quick execution"],
  },
];

export default function PersonalityCoreInterface({
  isOpen,
  onClose,
}: PersonalityCoreInterfaceProps) {
  const [selectedPersonality, setSelectedPersonality] =
    useState<string>("lembut");
  const [emotionRange, setEmotionRange] = useState<number>(50);
  const [memoryScope, setMemoryScope] = useState<string>("extended");
  const [adaptiveLearning, setAdaptiveLearning] = useState<boolean>(true);
  const [moodEvolution, setMoodEvolution] = useState<boolean>(true);

  if (!isOpen) return null;

  const handlePersonalitySelect = (personalityId: string) => {
    setSelectedPersonality(personalityId);
  };

  const handlePreviewVoice = (personalityId: string) => {
    console.log(`Preview voice for ${personalityId}`);
  };

  const handleSavePersonality = () => {
    console.log("Saving personality settings:", {
      personality: selectedPersonality,
      emotionRange,
      memoryScope,
      adaptiveLearning,
      moodEvolution,
    });
  };

  const handlePreviewStyle = () => {
    console.log("Previewing voice and style");
  };

  const handleReset = () => {
    setSelectedPersonality("lembut");
    setEmotionRange(50);
    setMemoryScope("extended");
    setAdaptiveLearning(true);
    setMoodEvolution(true);
  };

  return (
    <div className="personality-core-overlay">
      <div className="personality-core-container">
        <div className="personality-core-header">
          <h2 className="personality-core-title">Personality Core</h2>
          <button className="close-button" onClick={onClose}>
            <span className="close-icon">×</span>
          </button>
        </div>

        <div className="personality-core-content">
          <div className="personality-selection-section">
            <h3 className="section-title">Pilih Kepribadian Seraphine</h3>
            <div className="personality-grid">
              {personalityTypes.map((personality) => (
                <div
                  key={personality.id}
                  className={`personality-card ${selectedPersonality === personality.id ? "selected" : ""}`}
                  onClick={() => handlePersonalitySelect(personality.id)}
                  style={
                    {
                      "--personality-color": personality.color,
                      "--personality-gradient": personality.gradient,
                    } as React.CSSProperties
                  }
                >
                  <div className="personality-card-inner">
                    <div className="personality-header">
                      <h4 className="personality-name">{personality.name}</h4>
                      <button
                        className="preview-voice-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewVoice(personality.id);
                        }}
                      >
                        🎵
                      </button>
                    </div>
                    <p className="personality-description">
                      {personality.description}
                    </p>
                    <div className="personality-characteristics">
                      {personality.characteristics.map((char, index) => (
                        <span key={index} className="characteristic-tag">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="advanced-settings-section">
            <h3 className="section-title">Pengaturan Lanjutan</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">Emotion Range</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={emotionRange}
                    onChange={(e) => setEmotionRange(Number(e.target.value))}
                    className="emotion-slider"
                  />
                  <span className="slider-value">
                    {emotionRange}% Ekspresif
                  </span>
                </div>
              </div>

              <div className="setting-item">
                <label className="setting-label">Memory Scope</label>
                <select
                  value={memoryScope}
                  onChange={(e) => setMemoryScope(e.target.value)}
                  className="memory-select"
                >
                  <option value="minimal">Minimal (24 jam)</option>
                  <option value="standard">Standard (7 hari)</option>
                  <option value="extended">Extended (30 hari)</option>
                  <option value="unlimited">Unlimited</option>
                </select>
              </div>

              <div className="setting-item">
                <label className="setting-label">Adaptive Learning</label>
                <div className="toggle-container">
                  <input
                    type="checkbox"
                    id="adaptive-learning"
                    checked={adaptiveLearning}
                    onChange={(e) => setAdaptiveLearning(e.target.checked)}
                    className="toggle-input"
                  />
                  <label htmlFor="adaptive-learning" className="toggle-label">
                    <span className="toggle-slider"></span>
                  </label>
                  <span className="toggle-text">Belajar dari interaksi</span>
                </div>
              </div>

              <div className="setting-item">
                <label className="setting-label">Mood-based Evolution</label>
                <div className="toggle-container">
                  <input
                    type="checkbox"
                    id="mood-evolution"
                    checked={moodEvolution}
                    onChange={(e) => setMoodEvolution(e.target.checked)}
                    className="toggle-input"
                  />
                  <label htmlFor="mood-evolution" className="toggle-label">
                    <span className="toggle-slider"></span>
                  </label>
                  <span className="toggle-text">Evolusi berdasarkan mood</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bonus-features-section">
            <h3 className="section-title">Bonus Features</h3>
            <div className="bonus-features-grid">
              <button className="bonus-feature-btn">
                <span className="feature-icon">🎭</span>
                <span className="feature-text">Mix Personality</span>
              </button>
              <button className="bonus-feature-btn">
                <span className="feature-icon">📥</span>
                <span className="feature-text">Download Plugin</span>
              </button>
              <button className="bonus-feature-btn">
                <span className="feature-icon">🎤</span>
                <span className="feature-text">Live Voice Switch</span>
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="action-btn primary"
              onClick={handleSavePersonality}
            >
              Simpan Gaya Seraphine
            </button>
            <button
              className="action-btn secondary"
              onClick={handlePreviewStyle}
            >
              Preview Suara & Gaya
            </button>
            <button className="action-btn tertiary" onClick={handleReset}>
              Reset ke Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
