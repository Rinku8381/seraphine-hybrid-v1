"use client";

import React, { useState } from "react";
import "./AdminLoginModal.css";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminLoginModalProps) {
  const [adminCode, setAdminCode] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check credentials (Easter egg: 'SERAPHINE' / 'HYBRID')
    if (adminCode === "SERAPHINE" && securityKey === "HYBRID") {
      setIsLoading(false);
      onSuccess();
    } else {
      setError("Invalid credentials. Access denied.");
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setAdminCode("");
    setSecurityKey("");
    setError("");
    setShowPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-modal">
        <button className="admin-login-close" onClick={handleClose}>
          ×
        </button>

        <div className="admin-login-header">
          <div className="admin-login-icon">🛡️</div>
          <h2 className="admin-login-title">SERAPHINE ADMIN</h2>
          <p className="admin-login-subtitle">SECURE ACCESS PORTAL</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <label htmlFor="adminCode" className="admin-input-label">
              Admin Code
            </label>
            <input
              id="adminCode"
              type="text"
              className="admin-input"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="Enter admin code"
              required
            />
          </div>

          <div className="admin-input-group">
            <label htmlFor="securityKey" className="admin-input-label">
              Security Key
            </label>
            <div className="admin-password-wrapper">
              <input
                id="securityKey"
                type={showPassword ? "text" : "password"}
                className="admin-input"
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                placeholder="Enter security key"
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {error && <div className="admin-error-message">{error}</div>}

          <button
            type="submit"
            className="admin-authorize-btn"
            disabled={isLoading || !adminCode || !securityKey}
          >
            {isLoading ? (
              <span className="admin-loading">
                <span className="admin-spinner"></span>
                AUTHORIZING...
              </span>
            ) : (
              <span className="admin-auth-content">
                <span className="admin-auth-icon">🛡️</span>
                AUTHORIZE ACCESS
              </span>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p className="admin-restriction-notice">
            RESTRICTED ACCESS • AUTHORIZED PERSONNEL ONLY
          </p>
          <p className="admin-easter-egg-hint">Try 'SERAPHINE' / 'HYBRID'</p>
        </div>
      </div>
    </div>
  );
}
