"use client";

import React, { useState, useEffect } from "react";
import "./HeroModeInterface.css";

interface SystemDevice {
  id: string;
  name: string;
  status: "active" | "inactive" | "locked";
  location: string;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  device: string;
  status: "success" | "warning" | "info";
}

interface HeroModeInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateHeroMode: () => void;
}

const systemDevices: SystemDevice[] = [
  {
    id: "door-main",
    name: "Pintu Utama",
    status: "locked",
    location: "Entrance",
  },
  {
    id: "camera-outdoor",
    name: "Kamera Luar",
    status: "active",
    location: "Front Yard",
  },
  {
    id: "camera-indoor",
    name: "Kamera Dalam",
    status: "active",
    location: "Living Room",
  },
  {
    id: "sensor-motion",
    name: "Sensor Gerak",
    status: "active",
    location: "Hallway",
  },
  {
    id: "alarm-system",
    name: "Sistem Alarm",
    status: "active",
    location: "Control Panel",
  },
  {
    id: "lights-outdoor",
    name: "Lampu Luar",
    status: "active",
    location: "Garden",
  },
];

const initialActivityLog: ActivityLog[] = [
  {
    id: "1",
    timestamp: "19:45:23",
    action: "Sistem dimulai",
    device: "Control Panel",
    status: "success",
  },
  {
    id: "2",
    timestamp: "19:44:15",
    action: "Kamera outdoor aktif",
    device: "Kamera Luar",
    status: "success",
  },
  {
    id: "3",
    timestamp: "19:43:01",
    action: "Pintu utama terkunci",
    device: "Pintu Utama",
    status: "success",
  },
  {
    id: "4",
    timestamp: "19:42:30",
    action: "Sensor gerak online",
    device: "Sensor Gerak",
    status: "info",
  },
  {
    id: "5",
    timestamp: "19:41:45",
    action: "Lampu luar menyala",
    device: "Lampu Luar",
    status: "info",
  },
];

export default function HeroModeInterface({
  isOpen,
  onClose,
  onActivateHeroMode,
}: HeroModeInterfaceProps) {
  const [threatLevel, setThreatLevel] = useState<number>(15);
  const [systemStatus, setSystemStatus] = useState<
    "normal" | "alert" | "critical"
  >("normal");
  const [activityLog, setActivityLog] =
    useState<ActivityLog[]>(initialActivityLog);
  const [seraphineGlow, setSeraphineGlow] = useState<boolean>(true);

  useEffect(() => {
    const glowInterval = setInterval(() => {
      setSeraphineGlow((prev) => !prev);
    }, 2000);

    return () => clearInterval(glowInterval);
  }, []);

  if (!isOpen) return null;

  const handleQuickControl = (device: string) => {
    console.log(`Quick control: ${device}`);
    const newActivity: ActivityLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString("id-ID", { hour12: false }),
      action: `Manual control: ${device}`,
      device: device,
      status: "info",
    };
    setActivityLog((prev) => [newActivity, ...prev.slice(0, 4)]);
  };

  const handleTestHeroMode = () => {
    setThreatLevel(85);
    setSystemStatus("critical");
    onActivateHeroMode();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#22d3ee";
      case "locked":
        return "#10b981";
      case "inactive":
        return "#6b7280";
      default:
        return "#22d3ee";
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "info":
        return "#22d3ee";
      default:
        return "#22d3ee";
    }
  };

  return (
    <div className="hero-mode-overlay">
      <div className="hero-mode-container">
        <div className="hero-mode-header">
          <div className="header-left">
            <h2 className="hero-mode-title">Hero Mode Dashboard</h2>
            <div className="system-status-indicator">
              <span className={`status-dot ${systemStatus}`}></span>
              <span className="status-text">
                Sistem{" "}
                {systemStatus === "normal"
                  ? "Normal"
                  : systemStatus === "alert"
                    ? "Siaga"
                    : "Kritis"}
              </span>
            </div>
          </div>
          <div className="header-right">
            <button className="test-hero-btn" onClick={handleTestHeroMode}>
              Test Hero Mode
            </button>
            <button className="close-button" onClick={onClose}>
              <span className="close-icon">×</span>
            </button>
          </div>
        </div>

        <div className="hero-mode-content">
          <div className="main-dashboard">
            <div className="seraphine-avatar-section">
              <div
                className={`seraphine-avatar ${seraphineGlow ? "glowing" : ""}`}
              >
                <div className="avatar-inner">
                  <div className="avatar-core"></div>
                  <div className="avatar-rings">
                    <div className="ring ring-1"></div>
                    <div className="ring ring-2"></div>
                    <div className="ring ring-3"></div>
                  </div>
                </div>
              </div>
              <div className="avatar-status">
                <h3 className="avatar-name">SERAPHINE</h3>
                <p className="avatar-mode">Guardian Mode Active</p>
              </div>
            </div>

            <div className="security-level-section">
              <h3 className="section-title">Security Level</h3>
              <div className="threat-level-container">
                <div className="threat-level-bar">
                  <div
                    className="threat-level-fill"
                    style={{
                      width: `${threatLevel}%`,
                      background:
                        threatLevel < 30
                          ? "#10b981"
                          : threatLevel < 70
                            ? "#f59e0b"
                            : "#ef4444",
                    }}
                  ></div>
                </div>
                <div className="threat-level-info">
                  <span className="threat-percentage">{threatLevel}%</span>
                  <span className="threat-label">
                    {threatLevel < 30
                      ? "Low Threat"
                      : threatLevel < 70
                        ? "Medium Threat"
                        : "High Threat"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="house-map-section">
            <h3 className="section-title">House Overview</h3>
            <div className="house-map">
              <div className="room living-room">
                <div className="room-label">Living Room</div>
                <div className="room-status normal"></div>
              </div>
              <div className="room kitchen">
                <div className="room-label">Kitchen</div>
                <div className="room-status normal"></div>
              </div>
              <div className="room bedroom">
                <div className="room-label">Bedroom</div>
                <div className="room-status normal"></div>
              </div>
              <div className="room entrance">
                <div className="room-label">Entrance</div>
                <div className="room-status secured"></div>
              </div>
              <div className="room garden">
                <div className="room-label">Garden</div>
                <div className="room-status monitored"></div>
              </div>
            </div>
          </div>

          <div className="quick-controls-section">
            <h3 className="section-title">Quick Controls</h3>
            <div className="controls-grid">
              <button
                className="control-btn"
                onClick={() => handleQuickControl("Lampu")}
              >
                <div className="control-icon">💡</div>
                <span className="control-label">Lampu</span>
              </button>
              <button
                className="control-btn"
                onClick={() => handleQuickControl("AC")}
              >
                <div className="control-icon">❄️</div>
                <span className="control-label">AC</span>
              </button>
              <button
                className="control-btn"
                onClick={() => handleQuickControl("Kunci")}
              >
                <div className="control-icon">🔒</div>
                <span className="control-label">Kunci</span>
              </button>
              <button
                className="control-btn"
                onClick={() => handleQuickControl("Kamera")}
              >
                <div className="control-icon">📹</div>
                <span className="control-label">Kamera</span>
              </button>
            </div>
          </div>

          <div className="system-status-section">
            <h3 className="section-title">System Status</h3>
            <div className="device-status-grid">
              {systemDevices.map((device) => (
                <div key={device.id} className="device-status-item">
                  <div className="device-info">
                    <span className="device-name">{device.name}</span>
                    <span className="device-location">{device.location}</span>
                  </div>
                  <div className="device-status-indicator">
                    <span
                      className="device-status-dot"
                      style={{ backgroundColor: getStatusColor(device.status) }}
                    ></span>
                    <span className="device-status-text">
                      {device.status === "active"
                        ? "Aktif"
                        : device.status === "locked"
                          ? "Terkunci"
                          : "Tidak Aktif"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-log-section">
            <h3 className="section-title">Recent Activity</h3>
            <div className="activity-log">
              {activityLog.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-time">{activity.timestamp}</div>
                  <div className="activity-content">
                    <div className="activity-action">{activity.action}</div>
                    <div className="activity-device">{activity.device}</div>
                  </div>
                  <div
                    className="activity-status-dot"
                    style={{
                      backgroundColor: getActivityStatusColor(activity.status),
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
