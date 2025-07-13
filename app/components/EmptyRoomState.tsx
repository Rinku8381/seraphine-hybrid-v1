"use client";

import React from "react";
import "./EmptyRoomState.css";

interface EmptyRoomStateProps {
  roomName?: string;
  onAddDevice?: () => void;
  onBack?: () => void;
}

const EmptyRoomState: React.FC<EmptyRoomStateProps> = ({
  roomName = "Room",
  onAddDevice,
  onBack,
}) => {
  return (
    <div className="empty-room-container">
      <div className="empty-room-header">
        <div className="breadcrumb">
          <button className="back-button" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="breadcrumb-text">Rooms</span>
          <span className="breadcrumb-separator">/</span>
          <span className="current-room">{roomName}</span>
        </div>
        <h1 className="room-title">{roomName}</h1>
      </div>

      <div className="empty-state-content">
        <div className="seraphine-logo">
          <div className="logo-background">
            <div className="logo-gradient"></div>
            <div className="logo-text">S</div>
          </div>
          <div className="logo-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
          </div>
        </div>

        <div className="empty-state-text">
          <h2 className="empty-title">Tidak ada perangkat</h2>
          <p className="empty-description">
            Tambahkan sekarang untuk mulai mengontrol ruanganmu
          </p>
        </div>

        <button className="add-first-device-btn" onClick={onAddDevice}>
          <div className="btn-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span>Tambah Perangkat Pertama</span>
          <div className="btn-gradient"></div>
        </button>

        <div className="quick-suggestions">
          <h3>Perangkat yang sering ditambahkan:</h3>
          <div className="suggestion-chips">
            <div className="suggestion-chip">
              <span className="chip-icon">💡</span>
              <span>Smart Light</span>
            </div>
            <div className="suggestion-chip">
              <span className="chip-icon">🌡️</span>
              <span>Thermostat</span>
            </div>
            <div className="suggestion-chip">
              <span className="chip-icon">📺</span>
              <span>Smart TV</span>
            </div>
            <div className="suggestion-chip">
              <span className="chip-icon">🔊</span>
              <span>Speaker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyRoomState;
