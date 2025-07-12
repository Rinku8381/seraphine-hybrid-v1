"use client";

import { useState } from "react";
import "./SettingsPanel.css";

interface SettingsPanelProps {
  onClose: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  plan: "Pro Plan" | "Basic Plan" | "Free Plan";
  monthlyInteractions: number;
  talkTime: string;
}

interface ThemeSettings {
  theme: "Cyberpunk" | "Dark" | "Light" | "Auto";
  uiAnimations: boolean;
}

interface LanguageSettings {
  primary: "Indonesia" | "English" | "Mandarin" | "Japanese";
  dualMode: boolean;
  secondaryLanguage: "ID" | "EN" | "CN" | "JP";
}

interface NotificationSettings {
  push: boolean;
  whisper: boolean;
  realTime: boolean;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [userProfile] = useState<UserProfile>({
    name: "Alex Chen",
    email: "alex.chen@example.com",
    avatar: "👤",
    plan: "Pro Plan",
    monthlyInteractions: 320,
    talkTime: "5j 42m",
  });

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    theme: "Cyberpunk",
    uiAnimations: true,
  });

  const [languageSettings, setLanguageSettings] = useState<LanguageSettings>({
    primary: "Indonesia",
    dualMode: true,
    secondaryLanguage: "EN",
  });

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      push: true,
      whisper: false,
      realTime: true,
    });

  const [activeSection, setActiveSection] = useState<string>("profile");

  const handleThemeChange = (theme: ThemeSettings["theme"]) => {
    setThemeSettings((prev) => ({ ...prev, theme }));
  };

  const handleAnimationsToggle = () => {
    setThemeSettings((prev) => ({ ...prev, uiAnimations: !prev.uiAnimations }));
  };

  const handleLanguageChange = (language: LanguageSettings["primary"]) => {
    setLanguageSettings((prev) => ({ ...prev, primary: language }));
  };

  const handleDualModeToggle = () => {
    setLanguageSettings((prev) => ({ ...prev, dualMode: !prev.dualMode }));
  };

  const handleNotificationToggle = (type: keyof NotificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const sections = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "theme", name: "Theme & Display", icon: "🎨" },
    { id: "language", name: "Language", icon: "🌐" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "connection", name: "Connection & Pairing", icon: "📡" },
    { id: "backup", name: "Backup & Restore", icon: "💾" },
    { id: "personality", name: "Personality Core", icon: "🧠" },
    { id: "security", name: "Security & Privacy", icon: "🔒" },
    { id: "account", name: "Account & Application", icon: "⚙️" },
  ];

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <div className="settings-title">
            <h2>Settings & Account Center</h2>
          </div>
          <button className="settings-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="settings-main">
          {/* Sidebar Navigation */}
          <div className="settings-sidebar">
            <nav className="settings-nav">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`nav-item ${activeSection === section.id ? "active" : ""}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="nav-icon">{section.icon}</span>
                  <span className="nav-text">{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="settings-content">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <div className="content-section">
                <h3 className="section-title">User Profile</h3>

                <div className="profile-card">
                  <div className="profile-avatar">
                    <div className="avatar-circle">
                      <span className="avatar-emoji">{userProfile.avatar}</span>
                    </div>
                    <button className="avatar-edit">📷</button>
                  </div>

                  <div className="profile-info">
                    <div className="profile-name">
                      <h4>{userProfile.name}</h4>
                      <span className="plan-badge">{userProfile.plan}</span>
                    </div>
                    <p className="profile-email">{userProfile.email}</p>
                  </div>
                </div>

                <div className="usage-stats">
                  <h4>Usage Statistics</h4>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-label">Interaksi Bulanan</span>
                      <span className="stat-value">
                        {userProfile.monthlyInteractions}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Waktu Bicara</span>
                      <span className="stat-value">{userProfile.talkTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Theme & Display Section */}
            {activeSection === "theme" && (
              <div className="content-section">
                <h3 className="section-title">Theme & Display</h3>

                <div className="setting-group">
                  <label className="setting-label">Theme</label>
                  <div className="theme-options">
                    {(["Cyberpunk", "Dark", "Light", "Auto"] as const).map(
                      (theme) => (
                        <button
                          key={theme}
                          className={`theme-option ${themeSettings.theme === theme ? "active" : ""}`}
                          onClick={() => handleThemeChange(theme)}
                        >
                          {theme}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="setting-group">
                  <div className="setting-row">
                    <span className="setting-label">UI Animations</span>
                    <button
                      className={`toggle-switch ${themeSettings.uiAnimations ? "active" : ""}`}
                      onClick={handleAnimationsToggle}
                    >
                      <div className="toggle-slider"></div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Language Section */}
            {activeSection === "language" && (
              <div className="content-section">
                <h3 className="section-title">Language Settings</h3>

                <div className="setting-group">
                  <label className="setting-label">Primary Language</label>
                  <div className="language-options">
                    {(
                      ["Indonesia", "English", "Mandarin", "Japanese"] as const
                    ).map((lang) => (
                      <button
                        key={lang}
                        className={`language-option ${languageSettings.primary === lang ? "active" : ""}`}
                        onClick={() => handleLanguageChange(lang)}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="setting-group">
                  <div className="setting-row">
                    <div className="setting-info">
                      <span className="setting-label">Dual Mode</span>
                      <span className="setting-description">ID/EN</span>
                    </div>
                    <button
                      className={`toggle-switch ${languageSettings.dualMode ? "active" : ""}`}
                      onClick={handleDualModeToggle}
                    >
                      <div className="toggle-slider"></div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <div className="content-section">
                <h3 className="section-title">Notification Settings</h3>

                <div className="notification-options">
                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-label">
                        Push Notifications
                      </span>
                      <span className="notification-description">
                        Receive push notifications
                      </span>
                    </div>
                    <button
                      className={`toggle-switch ${notificationSettings.push ? "active" : ""}`}
                      onClick={() => handleNotificationToggle("push")}
                    >
                      <div className="toggle-slider"></div>
                    </button>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-label">Whisper Mode</span>
                      <span className="notification-description">
                        Silent notifications
                      </span>
                    </div>
                    <button
                      className={`toggle-switch ${notificationSettings.whisper ? "active" : ""}`}
                      onClick={() => handleNotificationToggle("whisper")}
                    >
                      <div className="toggle-slider"></div>
                    </button>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <span className="notification-label">
                        Real-time Alerts
                      </span>
                      <span className="notification-description">
                        Instant device updates
                      </span>
                    </div>
                    <button
                      className={`toggle-switch ${notificationSettings.realTime ? "active" : ""}`}
                      onClick={() => handleNotificationToggle("realTime")}
                    >
                      <div className="toggle-slider"></div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other Sections - Placeholder Content */}
            {[
              "connection",
              "backup",
              "personality",
              "security",
              "account",
            ].includes(activeSection) && (
              <div className="content-section">
                <h3 className="section-title">
                  {sections.find((s) => s.id === activeSection)?.name}
                </h3>
                <div className="placeholder-content">
                  <div className="placeholder-icon">
                    {sections.find((s) => s.id === activeSection)?.icon}
                  </div>
                  <p className="placeholder-text">
                    {activeSection === "connection" &&
                      "Manage device connections and pairing settings"}
                    {activeSection === "backup" &&
                      "Configure backup and restore preferences"}
                    {activeSection === "personality" &&
                      "Customize AI personality and behavior"}
                    {activeSection === "security" &&
                      "Security and privacy controls"}
                    {activeSection === "account" &&
                      "Account and application management"}
                  </p>
                  <button className="placeholder-btn">
                    Configure Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
