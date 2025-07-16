"use client";

import { useState, useEffect } from "react";
import AddDeviceModal from "./AddDeviceModal";
import SearchFilter from "./SearchFilter";
import RoomSelector from "./RoomSelector";
import DeviceCards from "./DeviceCards";
import EmptyRoomState from "./EmptyRoomState";
import DeviceSettingsModal from "./DeviceSettingsModal";
import SettingsPanel from "./SettingsPanel";
import SeraphineAIInterface from "./SeraphineAIInterface";
import PersonalityCoreInterface from "./PersonalityCoreInterface";
import HeroModeInterface from "./HeroModeInterface";
import HeroModeAlert from "./HeroModeAlert";
import WhisperModeInterface from "./WhisperModeInterface";
import ReflectionJournalInterface from "./ReflectionJournalInterface";
import AdminLoginModal from "./AdminLoginModal";
import AdminPanelInterface from "./AdminPanelInterface";
import CyberpunkAtmosphere from "./ParticleEffects";
import "./Dashboard.css";

interface Device {
  id: string;
  name: string;
  type: string;
  room: string;
  isOn: boolean;
  value?: number;
  brand: string;
  model?: string;
  status: "ON" | "OFF";
  connectionStatus: "Auto" | "Manual" | "Disconnected";
  wifiStrength: number;
}

interface Room {
  id: string;
  name: string;
  deviceCount: number;
  activeDevices: number;
  temperature?: number;
}

interface Notification {
  id: string;
  type: "energy" | "device" | "security";
  title: string;
  message: string;
  time: string;
}

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
  const [isRoomSelectorOpen, setIsRoomSelectorOpen] = useState(false);
  const [isDeviceSettingsOpen, setIsDeviceSettingsOpen] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isSeraphineAIOpen, setIsSeraphineAIOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isPersonalityCoreOpen, setIsPersonalityCoreOpen] = useState(false);
  const [isHeroModeOpen, setIsHeroModeOpen] = useState(false);
  const [isHeroModeAlertOpen, setIsHeroModeAlertOpen] = useState(false);
  const [isWhisperModeOpen, setIsWhisperModeOpen] = useState(false);
  const [isReflectionJournalOpen, setIsReflectionJournalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [selectedDeviceForSettings, setSelectedDeviceForSettings] =
    useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeScene, setActiveScene] = useState("Comfort");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<
    "dashboard" | "room-detail" | "room-selector"
  >("dashboard");

  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Smart Lamp",
      type: "Light",
      room: "Bedroom",
      isOn: true,
      value: 75,
      brand: "Philips",
      model: "Hue",
      status: "ON",
      connectionStatus: "Auto",
      wifiStrength: 4,
    },
    {
      id: "2",
      name: "Thermostat",
      type: "Climate",
      room: "Living Room",
      isOn: true,
      value: 22,
      brand: "Nest",
      model: "Pro",
      status: "ON",
      connectionStatus: "Auto",
      wifiStrength: 3,
    },
    {
      id: "3",
      name: "Speaker",
      type: "Audio",
      room: "Kitchen",
      isOn: false,
      value: 60,
      brand: "Amazon",
      model: "Echo",
      status: "OFF",
      connectionStatus: "Manual",
      wifiStrength: 2,
    },
    {
      id: "4",
      name: "TV",
      type: "Entertainment",
      room: "Living Room",
      isOn: true,
      brand: "Samsung",
      model: '55" QLED',
      status: "ON",
      connectionStatus: "Auto",
      wifiStrength: 4,
    },
    {
      id: "5",
      name: "Coffee Maker",
      type: "Appliance",
      room: "Kitchen",
      isOn: false,
      brand: "Keurig",
      model: "K-Elite",
      status: "OFF",
      connectionStatus: "Disconnected",
      wifiStrength: 1,
    },
  ]);

  const [rooms] = useState<Room[]>([
    {
      id: "1",
      name: "Bedroom",
      deviceCount: 3,
      activeDevices: 2,
      temperature: 23,
    },
    {
      id: "2",
      name: "Living Room",
      deviceCount: 4,
      activeDevices: 3,
      temperature: 22,
    },
    {
      id: "3",
      name: "Kitchen",
      deviceCount: 2,
      activeDevices: 1,
      temperature: 21,
    },
    {
      id: "4",
      name: "Bathroom",
      deviceCount: 2,
      activeDevices: 0,
      temperature: 24,
    },
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "energy",
      title: "Energy Savings",
      message: "Your monthly energy consumption decreased by 15%",
      time: "2 min ago",
    },
    {
      id: "2",
      type: "device",
      title: "Device Update",
      message: "Smart Thermostat firmware updated successfully",
      time: "1 hour ago",
    },
    {
      id: "3",
      type: "security",
      title: "Security Alert",
      message: "Front door lock battery is low",
      time: "3 hours ago",
    },
  ]);

  const scenesModes = [
    { name: "Night", icon: "🌙", active: false },
    { name: "Comfort", icon: "🏠", active: true },
    { name: "Away", icon: "🚗", active: false },
    { name: "Nurse", icon: "🏥", active: false },
    { name: "Emergency", icon: "🚨", active: false },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId ? { ...device, isOn: !device.isOn } : device,
      ),
    );
  };

  const updateDeviceValue = (deviceId: string, value: number) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId ? { ...device, value } : device,
      ),
    );
  };

  const handleAddDevice = (deviceData: {
    name: string;
    type: string;
    room: string;
    brand: string;
    pairingStatus: string;
  }) => {
    const newDevice: Device = {
      id: Date.now().toString(),
      name: deviceData.name,
      type: deviceData.type,
      room: deviceData.room,
      brand: deviceData.brand,
      isOn: false,
      status: "OFF",
      connectionStatus: deviceData.pairingStatus as
        | "Auto"
        | "Manual"
        | "Disconnected",
      wifiStrength: Math.floor(Math.random() * 4) + 1,
    };

    setDevices((prev) => [...prev, newDevice]);
    setIsAddDeviceModalOpen(false);
  };

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId(roomId);
    setCurrentView("room-detail");
    setIsRoomSelectorOpen(false);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedRoomId(null);
  };

  const getSelectedRoom = () => {
    return rooms.find((room) => room.id === selectedRoomId);
  };

  const getRoomDevices = (roomName: string) => {
    return devices.filter((device) => device.room === roomName);
  };

  const handleDeviceToggle = (deviceId: string, newStatus: "ON" | "OFF") => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId
          ? { ...device, status: newStatus, isOn: newStatus === "ON" }
          : device,
      ),
    );
  };

  const handleDeviceSettings = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    if (device) {
      setSelectedDeviceForSettings(device);
      setIsDeviceSettingsOpen(true);
    }
  };

  const handleDeviceSettingsSave = (settings: any) => {
    if (selectedDeviceForSettings) {
      setDevices((prev) =>
        prev.map((device) =>
          device.id === selectedDeviceForSettings.id
            ? {
                ...device,
                status: settings.status,
                isOn: settings.status === "ON",
                connectionStatus:
                  settings.pairingMode === "Auto Pairing"
                    ? "Auto"
                    : settings.pairingMode === "Manual Pairing"
                      ? "Manual"
                      : "Disconnected",
              }
            : device,
        ),
      );
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminModalOpen(false);
    setIsAdminPanelOpen(true);
  };

  const handleAdminPanelClose = () => {
    setIsAdminPanelOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  return (
    <div className="dashboard-container">
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-content">
            <h2>Are you sure you want to logout?</h2>
            <div className="logout-buttons">
              <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="dashboard-nav">
        <div className="nav-items">
          <button 
            onClick={() => setCurrentView("dashboard")}
            className={`nav-item ${currentView === "dashboard" ? "active" : ""}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentView("room-selector")}
            className={`nav-item ${currentView === "room-selector" ? "active" : ""}`}
          >
            Rooms
          </button>
          <button 
            onClick={() => setIsSettingsPanelOpen(true)}
            className="nav-item"
          >
            Settings
          </button>
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="nav-item logout-btn"
          >
            Logout
          </button>
        </div>
      </nav>
      <CyberpunkAtmosphere
        intensity="moderate"
        effects={{
          particles: true,
          neural: true,
          scanlines: true,
          ambientLights: true,
          dataStream: true,
        }}
      />
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-logo">
          <span className="logo-text">Seraphine</span>
        </div>
        <div className="header-actions">
          <button
            className="header-icon"
            onClick={() => setIsSearchFilterOpen(true)}
            title="Search & Filter"
          >
            🔍
          </button>
          <button
            className="header-icon"
            onClick={() => setIsRoomSelectorOpen(true)}
            title="Room Selector"
          >
            🏠
          </button>
          <button
            className="header-icon"
            onClick={() => setIsPersonalityCoreOpen(true)}
            title="Personality Core"
          >
            🎭
          </button>
          <button
            className="header-icon"
            onClick={() => setIsHeroModeOpen(true)}
            title="Hero Mode"
          >
            🛡️
          </button>
          <button
            className="header-icon"
            onClick={() => setIsWhisperModeOpen(true)}
            title="Whisper Mode"
          >
            🤫
          </button>
          <button
            className="header-icon"
            onClick={() => setIsReflectionJournalOpen(true)}
            title="Reflection Journal"
          >
            📖
          </button>
          <button
            className="header-icon"
            onClick={() => setIsSettingsPanelOpen(true)}
            title="Settings"
          >
            ⚙️
          </button>
          <button
            className="header-icon"
            onClick={() => setIsAdminModalOpen(true)}
            title="Admin Panel"
          >
            🛡️
          </button>
          <button className="header-icon">🔔</button>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card temperature">
            <div className="stat-icon">🌡️</div>
            <div className="stat-content">
              <span className="stat-value">22°C</span>
              <span className="stat-label">Temperature</span>
            </div>
          </div>
          <div className="stat-card humidity">
            <div className="stat-icon">💧</div>
            <div className="stat-content">
              <span className="stat-value">65%</span>
              <span className="stat-label">Humidity</span>
            </div>
          </div>
          <div className="stat-card weather">
            <div className="stat-icon">⛅</div>
            <div className="stat-content">
              <span className="stat-value">Partly Cloudy</span>
              <span className="stat-label">Weather</span>
            </div>
          </div>
          <div className="stat-card time">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <span className="stat-value">{currentTime}</span>
              <span className="stat-label">Time</span>
            </div>
          </div>
          <div className="stat-card energy">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <span className="stat-value">2.4 kWh</span>
              <span className="stat-label">Energy</span>
            </div>
          </div>
        </div>
      </section>

      {currentView === "dashboard" && (
        <>
          {/* Room Control */}
          <section className="rooms-section">
            <h2 className="section-title">Room Control</h2>
            <div className="rooms-grid">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="room-card clickable"
                  onClick={() => handleRoomSelect(room.id)}
                >
                  <div className="room-header">
                    <h3 className="room-name">{room.name}</h3>
                    <span className="room-temp">{room.temperature}°C</span>
                  </div>
                  <div className="room-stats">
                    <span className="room-devices">
                      {room.activeDevices}/{room.deviceCount} devices active
                    </span>
                  </div>
                  <div className="room-controls">
                    <button className="room-control-btn">💡</button>
                    <button className="room-control-btn">🌡️</button>
                    <button className="room-control-btn">🔒</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Device Overview */}
          <section className="devices-section">
            <div className="section-header">
              <h2 className="section-title">Device Overview</h2>
              <button
                className="add-device-btn"
                onClick={() => setIsAddDeviceModalOpen(true)}
              >
                + Add Device
              </button>
            </div>

            {/* Search */}
            <div className="search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button
                  className="filter-btn"
                  onClick={() => setIsSearchFilterOpen(true)}
                >
                  🔽
                </button>
              </div>
            </div>

            <div className="devices-grid">
              {filteredDevices.map((device) => (
                <div key={device.id} className="device-card">
                  <div className="device-header">
                    <div className="device-info">
                      <h3 className="device-name">{device.name}</h3>
                      <span className="device-room">{device.room}</span>
                    </div>
                    <div className="device-header-actions">
                      <button
                        className="device-settings-btn"
                        onClick={() => handleDeviceSettings(device.id)}
                        title="Device Settings"
                      >
                        ⚙️
                      </button>
                      <button
                        className={`device-toggle ${device.isOn ? "active" : ""}`}
                        onClick={() => toggleDevice(device.id)}
                      >
                        <div className="toggle-switch"></div>
                      </button>
                    </div>
                  </div>

                  {device.value !== undefined && device.isOn && (
                    <div className="device-controls">
                      {device.type === "Light" && (
                        <div className="brightness-control">
                          <span className="control-label">
                            Brightness: {device.value}%
                          </span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={device.value}
                            onChange={(e) =>
                              updateDeviceValue(
                                device.id,
                                parseInt(e.target.value),
                              )
                            }
                            className="slider brightness-slider"
                          />
                        </div>
                      )}
                      {device.type === "Climate" && (
                        <div className="temperature-control">
                          <span className="control-label">
                            Temperature: {device.value}°C
                          </span>
                          <input
                            type="range"
                            min="16"
                            max="30"
                            value={device.value}
                            onChange={(e) =>
                              updateDeviceValue(
                                device.id,
                                parseInt(e.target.value),
                              )
                            }
                            className="slider temperature-slider"
                          />
                        </div>
                      )}
                      {device.type === "Audio" && (
                        <div className="volume-control">
                          <span className="control-label">
                            Volume: {device.value}%
                          </span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={device.value}
                            onChange={(e) =>
                              updateDeviceValue(
                                device.id,
                                parseInt(e.target.value),
                              )
                            }
                            className="slider volume-slider"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Scene Modes */}
          <section className="scenes-section">
            <h2 className="section-title">Scene Modes</h2>
            <div className="scenes-grid">
              {scenesModes.map((scene) => (
                <button
                  key={scene.name}
                  className={`scene-card ${scene.active ? "active" : ""}`}
                  onClick={() => setActiveScene(scene.name)}
                >
                  <div className="scene-icon">{scene.icon}</div>
                  <span className="scene-name">{scene.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* AI Chat Interface */}
          <section className="chat-section">
            <h2 className="section-title">Seraphine AI</h2>
            <div className="chat-container">
              <div className="chat-avatar">
                <div className="avatar-circle">
                  <span className="avatar-emoji">🤖</span>
                </div>
              </div>
              <div className="chat-content">
                <div className="chat-messages">
                  <div className="message ai-message">
                    <span>
                      Good afternoon! How can I help you manage your smart home
                      today?
                    </span>
                  </div>
                </div>
                <div className="chat-input-container">
                  <input
                    type="text"
                    placeholder="Ask Seraphine anything..."
                    className="chat-input"
                  />
                  <button
                    className="send-btn"
                    onClick={() => setIsSeraphineAIOpen(true)}
                  >
                    📤
                  </button>
                </div>
                <button
                  className="ai-fullscreen-btn"
                  onClick={() => setIsSeraphineAIOpen(true)}
                >
                  Open Full AI Interface
                </button>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="notifications-section">
            <h2 className="section-title">Notifications</h2>
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-card ${notification.type}`}
                >
                  <div className="notification-icon">
                    {notification.type === "energy" && "⚡"}
                    {notification.type === "device" && "📱"}
                    {notification.type === "security" && "🔒"}
                  </div>
                  <div className="notification-content">
                    <h4 className="notification-title">{notification.title}</h4>
                    <p className="notification-message">
                      {notification.message}
                    </p>
                    <span className="notification-time">
                      {notification.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Room Detail View */}
      {currentView === "room-detail" &&
        selectedRoomId &&
        (() => {
          const selectedRoom = getSelectedRoom();
          const roomDevices = getRoomDevices(selectedRoom?.name || "");

          if (!selectedRoom) return null;

          return roomDevices.length === 0 ? (
            <EmptyRoomState
              roomName={selectedRoom.name}
              onAddDevice={() => setIsAddDeviceModalOpen(true)}
              onBack={handleBackToDashboard}
            />
          ) : (
            <DeviceCards
              roomName={selectedRoom.name}
              devices={roomDevices}
              onDeviceToggle={handleDeviceToggle}
              onDeviceSettings={handleDeviceSettings}
              onBack={handleBackToDashboard}
            />
          );
        })()}

      {/* Modals */}
      {isAddDeviceModalOpen && (
        <AddDeviceModal
          onClose={() => setIsAddDeviceModalOpen(false)}
          onAddDevice={handleAddDevice}
          rooms={rooms.map((room) => room.name)}
        />
      )}

      {isSearchFilterOpen && (
        <SearchFilter
          devices={devices.map((d) => ({
            id: d.id,
            name: d.name,
            type: d.type,
            room: d.room,
            status: d.status || (d.isOn ? "ON" : "OFF"),
            brand: d.brand,
          }))}
          rooms={rooms.map((r) => ({
            id: r.id,
            name: r.name,
            deviceCount: r.deviceCount,
          }))}
          onClose={() => setIsSearchFilterOpen(false)}
        />
      )}

      {isRoomSelectorOpen && (
        <RoomSelector
          rooms={rooms.map((r) => ({
            id: r.id,
            name: r.name,
            deviceCount: r.deviceCount,
          }))}
          selectedRoomId={selectedRoomId || ""}
          onRoomSelect={handleRoomSelect}
          onAddNewRoom={() => {
            console.log("Add new room functionality");
            // You can implement add new room modal here
          }}
          onClose={() => setIsRoomSelectorOpen(false)}
        />
      )}

      {/* Device Settings Modal */}
      {isDeviceSettingsOpen && selectedDeviceForSettings && (
        <DeviceSettingsModal
          device={selectedDeviceForSettings}
          onClose={() => {
            setIsDeviceSettingsOpen(false);
            setSelectedDeviceForSettings(null);
          }}
          onSave={handleDeviceSettingsSave}
        />
      )}

      {/* Settings Panel */}
      {isSettingsPanelOpen && (
        <SettingsPanel onClose={() => setIsSettingsPanelOpen(false)} />
      )}

      {/* Seraphine AI Interface */}
      {isSeraphineAIOpen && (
        <SeraphineAIInterface onClose={() => setIsSeraphineAIOpen(false)} />
      )}

      {/* Personality Core Interface */}
      {isPersonalityCoreOpen && (
        <PersonalityCoreInterface
          isOpen={isPersonalityCoreOpen}
          onClose={() => setIsPersonalityCoreOpen(false)}
        />
      )}

      {/* Hero Mode Interface */}
      {isHeroModeOpen && (
        <HeroModeInterface
          isOpen={isHeroModeOpen}
          onClose={() => setIsHeroModeOpen(false)}
          onActivateHeroMode={() => {
            setIsHeroModeOpen(false);
            setIsHeroModeAlertOpen(true);
          }}
        />
      )}

      {/* Hero Mode Alert */}
      {isHeroModeAlertOpen && (
        <HeroModeAlert
          isOpen={isHeroModeAlertOpen}
          onClose={() => setIsHeroModeAlertOpen(false)}
          onDeactivateHeroMode={() => {
            setIsHeroModeAlertOpen(false);
            setIsHeroModeOpen(true);
          }}
        />
      )}

      {/* Whisper Mode Interface */}
      {isWhisperModeOpen && (
        <WhisperModeInterface onBack={() => setIsWhisperModeOpen(false)} />
      )}

      {/* Reflection Journal Interface */}
      {isReflectionJournalOpen && (
        <ReflectionJournalInterface
          onBack={() => setIsReflectionJournalOpen(false)}
        />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Admin Panel Interface */}
      <AdminPanelInterface
        isOpen={isAdminPanelOpen}
        onClose={handleAdminPanelClose}
      />
    </div>
  );
}
