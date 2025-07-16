"use client";

import React, { useState } from "react";
import "./RoomSelector.css";

interface Room {
  id: string;
  name: string;
  deviceCount: number;
  isSelected?: boolean;
}

interface RoomSelectorProps {
  rooms?: Room[];
  selectedRoomId?: string;
  onRoomSelect?: (roomId: string) => void;
  onAddNewRoom?: () => void;
  onClose?: () => void;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({
  rooms = [],
  selectedRoomId,
  onRoomSelect,
  onAddNewRoom,
  onClose,
}) => {
  const [activeRoomId, setActiveRoomId] = useState(selectedRoomId || "");

  // Default rooms data for demo
  const defaultRooms: Room[] = [
    { id: "1", name: "Bedroom", deviceCount: 5 },
    { id: "2", name: "Living Room", deviceCount: 8 },
    { id: "3", name: "Kitchen", deviceCount: 4 },
    { id: "4", name: "Office", deviceCount: 6 },
    { id: "5", name: "Bathroom", deviceCount: 2 },
    { id: "6", name: "Study", deviceCount: 3 },
  ];

  const roomList = rooms.length > 0 ? rooms : defaultRooms;

  const handleRoomSelect = (roomId: string) => {
    setActiveRoomId(roomId);
    onRoomSelect?.(roomId);
  };

  const handleAddNewRoom = () => {
    onAddNewRoom?.();
  };

  const getRoomIcon = (roomName: string) => {
    switch (roomName.toLowerCase()) {
      case "bedroom":
        return "🛏️";
      case "living room":
        return "🛋️";
      case "kitchen":
        return "🍳";
      case "office":
        return "💼";
      case "bathroom":
        return "🚿";
      case "study":
        return "📚";
      case "dining room":
        return "🍽️";
      case "garage":
        return "🚗";
      case "basement":
        return "🏠";
      case "attic":
        return "🏚️";
      default:
        return "🏠";
    }
  };

  return (
    <div className="room-selector-overlay">
      <div className="room-selector-container">
        <div className="room-selector-header">
          <div className="app-title">
            <h1>Seraphine Hybrid V1</h1>
            <div className="selected-rooms-indicator">
              {roomList
                .filter((room) => room.id === activeRoomId)
                .map((room) => (
                  <span key={room.id} className="selected-room-tag">
                    {room.name}
                  </span>
                ))}
            </div>
          </div>
          <button className="room-selector-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="room-selector-content">
          <h2 className="section-title">Pilih Ruangan</h2>

          <div className="rooms-grid">
            {roomList.map((room) => (
              <div
                key={room.id}
                className={`room-card ${activeRoomId === room.id ? "selected" : ""}`}
                onClick={() => handleRoomSelect(room.id)}
              >
                <div className="room-card-inner">
                  <div className="room-icon">{getRoomIcon(room.name)}</div>
                  <div className="room-info">
                    <h3 className="room-name">{room.name}</h3>
                    <p className="room-device-count">
                      {room.deviceCount}{" "}
                      {room.deviceCount === 1 ? "device" : "devices"}
                    </p>
                  </div>
                  <div className="room-status-indicator">
                    <div className="status-dot"></div>
                  </div>
                </div>
                {activeRoomId === room.id && (
                  <div className="selection-glow"></div>
                )}
              </div>
            ))}

            <div className="add-room-card" onClick={handleAddNewRoom}>
              <div className="add-room-inner">
                <div className="add-room-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="add-room-text">
                  <h3>Tambah Ruangan Baru</h3>
                  <p>Buat ruangan baru</p>
                </div>
              </div>
            </div>
          </div>

          {activeRoomId && (
            <div className="selected-room-panel">
              <div className="panel-header">
                <h3>
                  {roomList.find((r) => r.id === activeRoomId)?.name} - Device
                  Management
                </h3>
                <button className="manage-devices-btn">
                  Manage Devices
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="panel-content">
                <p>
                  {roomList.find((r) => r.id === activeRoomId)?.deviceCount}{" "}
                  devices connected
                </p>
                <div className="quick-actions">
                  <button className="quick-action-btn">Add Device</button>
                  <button className="quick-action-btn">Room Settings</button>
                  <button className="quick-action-btn">Automation</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomSelector;
