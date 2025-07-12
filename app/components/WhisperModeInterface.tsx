import React, { useState } from "react";
import "./WhisperModeInterface.css";

interface WhisperModeInterfaceProps {
  onBack?: () => void;
}

interface OptionalFeature {
  id: string;
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
}

export default function WhisperModeInterface({
  onBack,
}: WhisperModeInterfaceProps) {
  const [isWhisperModeOn, setIsWhisperModeOn] = useState(true);
  const [volumeOutput, setVolumeOutput] = useState(28);
  const [optionalFeatures, setOptionalFeatures] = useState<OptionalFeature[]>([
    {
      id: "night-meditation",
      name: "Night Meditation",
      icon: "🧘",
      color: "#A855F7",
      enabled: false,
    },
    {
      id: "bedtime-stories",
      name: "Cerita Sebelum Tidur",
      icon: "📖",
      color: "#ff006e",
      enabled: false,
    },
    {
      id: "sleep-companion",
      name: "Sleep Companion",
      icon: "😴",
      color: "#A855F7",
      enabled: false,
    },
    {
      id: "auto-deactivate",
      name: "Auto Deactivate",
      icon: "⏰",
      color: "#22d3ee",
      enabled: false,
    },
  ]);

  const toggleFeature = (featureId: string) => {
    setOptionalFeatures((prev) =>
      prev.map((feature) =>
        feature.id === featureId
          ? { ...feature, enabled: !feature.enabled }
          : feature,
      ),
    );
  };

  return (
    <div className="whisper-mode-container">
      <div className="whisper-mode-content">
        {/* Header */}
        <div className="whisper-header">
          <h1 className="whisper-title">Whisper Mode</h1>
          <p className="whisper-description">
            Mode bisikan aktif. Seraphine berbicara lebih lembut dan lebih
            pelan…
          </p>
        </div>

        {/* Main Interface */}
        <div className="whisper-main">
          {/* User Avatar Section */}
          <div className="user-avatar-section">
            <div className="user-avatar">
              <div className="avatar-image">S</div>
            </div>
          </div>

          {/* Central Control */}
          <div className="central-control">
            <div className="control-circle">
              <div className="teal-accent-dot"></div>
              <div className="toggle-container">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isWhisperModeOn}
                    onChange={(e) => setIsWhisperModeOn(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">
                  {isWhisperModeOn ? "ON" : "OFF"}
                </span>
              </div>
            </div>
            <div className="status-text">
              {isWhisperModeOn
                ? "Aktif: Interaksi diam & lembut"
                : "Tidak aktif"}
            </div>
          </div>

          {/* Volume Control */}
          <div className="volume-control">
            <label className="volume-label">Volume Output</label>
            <div className="volume-slider-container">
              <span className="volume-min">25%</span>
              <input
                type="range"
                min="25"
                max="35"
                value={volumeOutput}
                onChange={(e) => setVolumeOutput(Number(e.target.value))}
                className="volume-slider"
              />
              <span className="volume-max">35%</span>
            </div>
            <div className="volume-value">{volumeOutput}%</div>
          </div>
        </div>

        {/* Optional Features */}
        <div className="optional-features">
          <h3 className="features-title">Optional Features</h3>
          <div className="features-grid">
            {optionalFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`feature-card ${feature.enabled ? "enabled" : ""}`}
                onClick={() => toggleFeature(feature.id)}
              >
                <div
                  className="feature-dot"
                  style={{ backgroundColor: feature.color }}
                ></div>
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-name">{feature.name}</span>
                {feature.enabled && <div className="feature-check">✓</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Status Indicators */}
        <div className="status-indicators">
          <div className="do-not-disturb">
            <div className="dnd-dot"></div>
            <span>Jangan ganggu aktif</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="back-button" onClick={onBack}>
            Kembali ke Mode Normal
          </button>
        </div>
      </div>
    </div>
  );
}
