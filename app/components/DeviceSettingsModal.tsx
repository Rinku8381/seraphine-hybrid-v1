"use client";

import { useState } from "react";
import "./DeviceSettingsModal.css";

interface DeviceSettingsModalProps {
  device: {
    id: string;
    name: string;
    type: string;
    room: string;
    isOn: boolean;
    brand: string;
    model?: string;
    status: "ON" | "OFF";
    connectionStatus: "Auto" | "Manual" | "Disconnected";
    wifiStrength: number;
  };
  onClose: () => void;
  onSave: (settings: DeviceSettings) => void;
}

interface DeviceSettings {
  status: "ON" | "OFF";
  pairingMode: "Auto Pairing" | "Manual Pairing" | "Disconnected";
  voiceControl: boolean;
  advancedOptions: {
    folderSync: boolean;
    routine: boolean;
    timer: boolean;
    plugin: boolean;
  };
}

export default function DeviceSettingsModal({
  device,
  onClose,
  onSave,
}: DeviceSettingsModalProps) {
  const [settings, setSettings] = useState<DeviceSettings>({
    status: device.status,
    pairingMode:
      device.connectionStatus === "Auto"
        ? "Auto Pairing"
        : device.connectionStatus === "Manual"
          ? "Manual Pairing"
          : "Disconnected",
    voiceControl: true,
    advancedOptions: {
      folderSync: false,
      routine: true,
      timer: false,
      plugin: false,
    },
  });

  const handleStatusToggle = () => {
    setSettings((prev) => ({
      ...prev,
      status: prev.status === "ON" ? "OFF" : "ON",
    }));
  };

  const handlePairingModeChange = (
    mode: "Auto Pairing" | "Manual Pairing" | "Disconnected",
  ) => {
    setSettings((prev) => ({
      ...prev,
      pairingMode: mode,
    }));
  };

  const handleVoiceControlToggle = () => {
    setSettings((prev) => ({
      ...prev,
      voiceControl: !prev.voiceControl,
    }));
  };

  const handleAdvancedOptionToggle = (
    option: keyof DeviceSettings["advancedOptions"],
  ) => {
    setSettings((prev) => ({
      ...prev,
      advancedOptions: {
        ...prev.advancedOptions,
        [option]: !prev.advancedOptions[option],
      },
    }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const getSignalStrength = () => {
    const strength = device.wifiStrength;
    return Array.from({ length: 4 }, (_, i) => i < strength);
  };

  return (
    <div className="device-settings-overlay">
      <div className="device-settings-modal">
        <div className="device-settings-header">
          <div className="device-settings-title">
            <h2>{device.name}</h2>
            <span className="device-location">{device.room}</span>
          </div>
          <button className="device-settings-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="device-settings-content">
          {/* Device Status Control */}
          <div className="device-status-section">
            <div className="status-header">
              <span className="status-label">Device Status</span>
              <div className="status-toggle-container">
                <button
                  className={`status-toggle ${settings.status === "ON" ? "active" : ""}`}
                  onClick={handleStatusToggle}
                >
                  <div className="toggle-switch"></div>
                </button>
                <span className="status-text">{settings.status}</span>
              </div>
            </div>
          </div>

          {/* Pairing Mode */}
          <div className="pairing-section">
            <label className="section-label">Pairing Mode</label>
            <div className="pairing-dropdown">
              <select
                value={settings.pairingMode}
                onChange={(e) => handlePairingModeChange(e.target.value as any)}
                className="pairing-select"
              >
                <option value="Auto Pairing">Auto Pairing</option>
                <option value="Manual Pairing">Manual Pairing</option>
                <option value="Disconnected">Disconnected</option>
              </select>
            </div>
          </div>

          {/* Connection Status */}
          <div className="connection-section">
            <div className="connection-header">
              <span className="section-label">Connection Status</span>
              <div className="signal-strength">
                {getSignalStrength().map((active, index) => (
                  <div
                    key={index}
                    className={`signal-bar ${active ? "active" : ""}`}
                  ></div>
                ))}
              </div>
            </div>
            <div className="connection-info">
              <span className="connection-text">
                {settings.pairingMode === "Auto Pairing"
                  ? "Connected"
                  : settings.pairingMode === "Manual Pairing"
                    ? "Manual"
                    : "Disconnected"}
              </span>
              <span className="signal-text">
                Signal: {device.wifiStrength}/4
              </span>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="advanced-section">
            <label className="section-label">Advanced Options</label>
            <div className="advanced-grid">
              <div className="advanced-option">
                <button
                  className={`option-btn ${settings.advancedOptions.folderSync ? "active" : ""}`}
                  onClick={() => handleAdvancedOptionToggle("folderSync")}
                >
                  <div className="option-icon">📁</div>
                  <span className="option-text">FolderSync</span>
                </button>
              </div>
              <div className="advanced-option">
                <button
                  className={`option-btn ${settings.advancedOptions.routine ? "active" : ""}`}
                  onClick={() => handleAdvancedOptionToggle("routine")}
                >
                  <div className="option-icon">🔄</div>
                  <span className="option-text">Routine</span>
                </button>
              </div>
              <div className="advanced-option">
                <button
                  className={`option-btn ${settings.advancedOptions.timer ? "active" : ""}`}
                  onClick={() => handleAdvancedOptionToggle("timer")}
                >
                  <div className="option-icon">⏰</div>
                  <span className="option-text">Timer</span>
                </button>
              </div>
              <div className="advanced-option">
                <button
                  className={`option-btn ${settings.advancedOptions.plugin ? "active" : ""}`}
                  onClick={() => handleAdvancedOptionToggle("plugin")}
                >
                  <div className="option-icon">🔌</div>
                  <span className="option-text">Plugin</span>
                </button>
              </div>
              <div className="advanced-option">
                <button className="option-btn remove">
                  <div className="option-icon">🗑️</div>
                  <span className="option-text">Remove</span>
                </button>
              </div>
            </div>
          </div>

          {/* Voice Control */}
          <div className="voice-control-section">
            <div className="voice-control-header">
              <span className="section-label">
                Ubah pengaturan dengan suara
              </span>
              <button
                className={`voice-toggle ${settings.voiceControl ? "active" : ""}`}
                onClick={handleVoiceControlToggle}
              >
                <div className="toggle-switch"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="device-settings-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
