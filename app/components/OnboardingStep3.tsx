"use client";

import React, { useState } from "react";
import "./OnboardingStep3.css";

interface OnboardingStep3Props {
  onNext: () => void;
  onBack: () => void;
}

export default function OnboardingStep3({
  onNext,
  onBack,
}: OnboardingStep3Props) {
  const [rooms, setRooms] = useState(["Bedroom", "Office"]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([
    "TV",
    "Lampu",
  ]);
  const [newRoomName, setNewRoomName] = useState("");

  const availableRooms = ["Living Room", "Kitchen", "Bathroom", "Garage"];
  const devices = [
    { id: "tv", label: "TV", icon: "📺" },
    { id: "lampu", label: "Lampu", icon: "💡" },
    { id: "ac", label: "AC", icon: "❄️" },
    { id: "cctv", label: "CCTV", icon: "📹" },
    { id: "speaker", label: "Speaker", icon: "🔊" },
    { id: "fan", label: "Kipas", icon: "🌀" },
  ];

  const addRoom = (roomName: string) => {
    if (roomName && !rooms.includes(roomName)) {
      setRooms([...rooms, roomName]);
      setNewRoomName("");
    }
  };

  const removeRoom = (roomName: string) => {
    setRooms(rooms.filter((room) => room !== roomName));
  };

  const toggleDevice = (deviceId: string) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId],
    );
  };

  return (
    <div className="onboarding-step3">
      <div className="onboarding-container">
        {/* Progress Indicator */}
        <div className="progress-section">
          <div className="progress-dots">
            <div className="progress-dot completed"></div>
            <div className="progress-dot completed"></div>
            <div className="progress-dot active"></div>
          </div>
          <span className="progress-text">3/3</span>
        </div>

        {/* Content */}
        <div className="content-section">
          <h1 className="section-title">Setup Rumah</h1>
          <p className="section-subtitle">
            Atur ruangan dan perangkat yang ingin dikontrol
          </p>

          {/* Room Management */}
          <div className="setting-group">
            <h3 className="setting-title">Ruangan</h3>

            {/* Current Rooms */}
            <div className="room-list">
              {rooms.map((room) => (
                <div key={room} className="room-item">
                  <span className="room-name">{room}</span>
                  <button
                    className="remove-room-btn"
                    onClick={() => removeRoom(room)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Room */}
            <div className="add-room-section">
              <div className="quick-add-rooms">
                {availableRooms
                  .filter((room) => !rooms.includes(room))
                  .map((room) => (
                    <button
                      key={room}
                      className="quick-add-btn"
                      onClick={() => addRoom(room)}
                    >
                      + {room}
                    </button>
                  ))}
              </div>

              <div className="custom-room-input">
                <input
                  type="text"
                  placeholder="Nama ruangan custom..."
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addRoom(newRoomName)}
                  className="room-input"
                />
                <button
                  className="add-custom-btn"
                  onClick={() => addRoom(newRoomName)}
                  disabled={!newRoomName.trim()}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Device Selection */}
          <div className="setting-group">
            <h3 className="setting-title">Perangkat</h3>
            <p className="setting-description">
              Pilih perangkat yang ingin dikontrol
            </p>

            <div className="device-grid">
              {devices.map((device) => (
                <button
                  key={device.id}
                  className={`device-card ${selectedDevices.includes(device.id) ? "selected" : ""}`}
                  onClick={() => toggleDevice(device.id)}
                >
                  <span className="device-icon">{device.icon}</span>
                  <span className="device-label">{device.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-section">
          <button className="nav-button back-button" onClick={onBack}>
            <span className="button-arrow">←</span>
            <span className="button-text">Kembali</span>
          </button>

          <button className="nav-button next-button" onClick={onNext}>
            <span className="button-text">Selesai</span>
            <span className="button-arrow">✓</span>
          </button>
        </div>
      </div>
    </div>
  );
}
