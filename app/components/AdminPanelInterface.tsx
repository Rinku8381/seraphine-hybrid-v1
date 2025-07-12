"use client";

import React, { useState } from "react";
import "./AdminPanelInterface.css";

interface AdminPanelInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  username: string;
  subscription: "PREMIUM" | "BASIC" | "ENTERPRISE";
  lastActive: string;
  devices: number;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: "ERROR" | "SUCCESS" | "INFO" | "WARN" | "DEBUG";
  message: string;
  source: string;
}

export default function AdminPanelInterface({
  isOpen,
  onClose,
}: AdminPanelInterfaceProps) {
  const [activeTab, setActiveTab] = useState<"users" | "logs">("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [logSearchQuery, setLogSearchQuery] = useState("");

  const sampleUsers: User[] = [
    {
      id: "USR001",
      username: "alexandra.chen",
      subscription: "PREMIUM",
      lastActive: "2 min ago",
      devices: 5,
      status: "ACTIVE",
    },
    {
      id: "USR002",
      username: "marcus.rodriguez",
      subscription: "BASIC",
      lastActive: "1 hour ago",
      devices: 2,
      status: "ACTIVE",
    },
    {
      id: "USR003",
      username: "corp.techsolutions",
      subscription: "ENTERPRISE",
      lastActive: "5 min ago",
      devices: 25,
      status: "ACTIVE",
    },
    {
      id: "USR004",
      username: "sarah.johnson",
      subscription: "PREMIUM",
      lastActive: "3 days ago",
      devices: 3,
      status: "INACTIVE",
    },
    {
      id: "USR005",
      username: "demo.user",
      subscription: "BASIC",
      lastActive: "1 week ago",
      devices: 1,
      status: "SUSPENDED",
    },
  ];

  const sampleLogs: LogEntry[] = [
    {
      id: "LOG001",
      timestamp: "2024-03-15 14:32:15",
      level: "ERROR",
      message: "Device connection timeout for USR001",
      source: "Device Manager",
    },
    {
      id: "LOG002",
      timestamp: "2024-03-15 14:30:42",
      level: "SUCCESS",
      message: "User authentication successful - alexandra.chen",
      source: "Auth Service",
    },
    {
      id: "LOG003",
      timestamp: "2024-03-15 14:28:33",
      level: "INFO",
      message: "System backup completed - 2.3GB archived",
      source: "Backup Service",
    },
    {
      id: "LOG004",
      timestamp: "2024-03-15 14:25:18",
      level: "WARN",
      message: "High memory usage detected - 87% utilized",
      source: "System Monitor",
    },
    {
      id: "LOG005",
      timestamp: "2024-03-15 14:22:45",
      level: "DEBUG",
      message: "API rate limit check passed for corp.techsolutions",
      source: "API Gateway",
    },
    {
      id: "LOG006",
      timestamp: "2024-03-15 14:20:11",
      level: "SUCCESS",
      message: "Device 192.168.1.105 registered successfully",
      source: "Device Manager",
    },
  ];

  const filteredUsers = sampleUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredLogs = sampleLogs.filter(
    (log) =>
      log.message.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(logSearchQuery.toLowerCase()),
  );

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "ENTERPRISE":
        return "#ff006e";
      case "PREMIUM":
        return "#22d3ee";
      case "BASIC":
        return "#64748b";
      default:
        return "#64748b";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "#10b981";
      case "INACTIVE":
        return "#f59e0b";
      case "SUSPENDED":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "#ef4444";
      case "SUCCESS":
        return "#10b981";
      case "INFO":
        return "#22d3ee";
      case "WARN":
        return "#f59e0b";
      case "DEBUG":
        return "#64748b";
      default:
        return "#64748b";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-panel-overlay">
      <div className="admin-panel-container">
        <div className="admin-panel-header">
          <div className="admin-panel-branding">
            <h1 className="admin-panel-title">SERAPHINE HYBRID V1</h1>
            <div className="admin-system-status">
              <span className="status-indicator status-online"></span>
              <span className="status-text">ONLINE</span>
            </div>
          </div>

          <button className="admin-panel-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="admin-panel-tabs">
          <button
            className={`admin-tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 User Management
          </button>
          <button
            className={`admin-tab ${activeTab === "logs" ? "active" : ""}`}
            onClick={() => setActiveTab("logs")}
          >
            💻 Device & Server Logs
          </button>
        </div>

        <div className="admin-panel-content">
          {activeTab === "users" && (
            <div className="user-management-section">
              <div className="section-header">
                <h2 className="section-title">USER MANAGEMENT CONSOLE</h2>
                <div className="section-controls">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="admin-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="admin-action-btn primary">
                    + Add User
                  </button>
                </div>
              </div>

              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>USER ID</th>
                      <th>USERNAME</th>
                      <th>SUBSCRIPTION</th>
                      <th>LAST ACTIVE</th>
                      <th>DEVICES</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="user-id">{user.id}</td>
                        <td className="username">{user.username}</td>
                        <td>
                          <span
                            className="subscription-badge"
                            style={{
                              color: getSubscriptionColor(user.subscription),
                            }}
                          >
                            {user.subscription}
                          </span>
                        </td>
                        <td className="last-active">{user.lastActive}</td>
                        <td className="device-count">{user.devices}</td>
                        <td>
                          <span
                            className="status-badge"
                            style={{ color: getStatusColor(user.status) }}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="user-actions">
                          <button className="action-btn edit">✏️</button>
                          <button className="action-btn delete">🗑️</button>
                          <button className="action-btn view">👁️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-sidebar">
                <div className="sidebar-section">
                  <h3 className="sidebar-title">AI CORE OVERRIDE</h3>
                  <div className="override-controls">
                    <button className="override-btn">🤖 Emergency Stop</button>
                    <button className="override-btn">⚡ Force Restart</button>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">SYSTEM HEALTH</h3>
                  <div className="health-metrics">
                    <div className="metric">
                      <span className="metric-label">CPU:</span>
                      <span className="metric-value">23%</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">RAM:</span>
                      <span className="metric-value">67%</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Storage:</span>
                      <span className="metric-value">45%</span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">QUICK ACTIONS</h3>
                  <div className="quick-actions">
                    <button className="quick-action-btn">
                      📊 Generate Report
                    </button>
                    <button className="quick-action-btn">🔄 Sync Data</button>
                    <button className="quick-action-btn">
                      🛡️ Security Scan
                    </button>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">SECURITY STATUS</h3>
                  <div className="security-status">
                    <div className="security-item">
                      <span className="security-indicator active"></span>
                      <span>Firewall Active</span>
                    </div>
                    <div className="security-item">
                      <span className="security-indicator active"></span>
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="security-item">
                      <span className="security-indicator warning"></span>
                      <span>2FA Recommended</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="logs-section">
              <div className="section-header">
                <h2 className="section-title">SYSTEM LOGS MONITOR</h2>
                <div className="section-controls">
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="admin-search-input"
                    value={logSearchQuery}
                    onChange={(e) => setLogSearchQuery(e.target.value)}
                  />
                  <button className="admin-action-btn secondary">
                    📤 Export Logs
                  </button>
                </div>
              </div>

              <div className="logs-container">
                <div className="logs-header">
                  <span>REAL-TIME SYSTEM LOGS</span>
                  <div className="log-controls">
                    <button className="log-control-btn">⏸️ Pause</button>
                    <button className="log-control-btn">🧹 Clear</button>
                  </div>
                </div>

                <div className="logs-list">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="log-entry">
                      <span className="log-timestamp">{log.timestamp}</span>
                      <span
                        className="log-level"
                        style={{ color: getLogLevelColor(log.level) }}
                      >
                        [{log.level}]
                      </span>
                      <span className="log-source">{log.source}:</span>
                      <span className="log-message">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="device-status-section">
                <h3 className="device-status-title">DEVICE STATUS</h3>
                <div className="device-grid">
                  <div className="device-card">
                    <div className="device-info">
                      <span className="device-name">Main Server</span>
                      <span className="device-ip">192.168.1.100</span>
                    </div>
                    <span className="device-status online">ONLINE</span>
                  </div>
                  <div className="device-card">
                    <div className="device-info">
                      <span className="device-name">Backup Server</span>
                      <span className="device-ip">192.168.1.101</span>
                    </div>
                    <span className="device-status online">ONLINE</span>
                  </div>
                  <div className="device-card">
                    <div className="device-info">
                      <span className="device-name">AI Processing Unit</span>
                      <span className="device-ip">192.168.1.105</span>
                    </div>
                    <span className="device-status warning">HIGH LOAD</span>
                  </div>
                </div>

                <div className="device-controls">
                  <button className="device-control-btn restart">
                    🔄 Restart Device
                  </button>
                  <button className="device-control-btn flush">
                    🧹 Flush Cache
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
