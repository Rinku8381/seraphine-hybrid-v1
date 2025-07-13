"use client";

import { useState } from "react";
import "./LoginScreen.css";
import AdminLoginModal from "./AdminLoginModal";
import AdminPanelInterface from "./AdminPanelInterface";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState<"email" | "phone" | "admin">(
    "email",
  );
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Implement Google OAuth
    onLoginSuccess();
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email login:", { email, password });
    // Implement email login
    onLoginSuccess();
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Phone login:", { phone });
    // Implement phone verification
    onLoginSuccess();
  };

  const handleAdminLogin = () => {
    setIsAdminModalOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminModalOpen(false);
    setIsAdminPanelOpen(true);
  };

  const handleAdminPanelClose = () => {
    setIsAdminPanelOpen(false);
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Choose your preferred login method</p>
        </div>

        <div className="login-content">
          {/* Google Login */}
          <button className="google-login-button" onClick={handleGoogleLogin}>
            <div className="google-icon">G</div>
            <span>Continue with Google</span>
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          {/* Login Tabs */}
          <div className="login-tabs">
            <button
              className={`tab-button ${activeTab === "email" ? "active" : ""}`}
              onClick={() => setActiveTab("email")}
            >
              Email
            </button>
            <button
              className={`tab-button ${activeTab === "phone" ? "active" : ""}`}
              onClick={() => setActiveTab("phone")}
            >
              Phone
            </button>
            <button
              className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
          </div>

          {/* Email Login Form */}
          {activeTab === "email" && (
            <form className="login-form" onSubmit={handleEmailLogin}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="login-submit-button">
                Sign In
              </button>
            </form>
          )}

          {/* Phone Login Form */}
          {activeTab === "phone" && (
            <form className="login-form" onSubmit={handlePhoneLogin}>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <p className="form-helper">We'll send you a verification code</p>
              <button type="submit" className="login-submit-button">
                Send Code
              </button>
            </form>
          )}

          {/* Admin Login Section */}
          {activeTab === "admin" && (
            <div className="admin-login-section">
              <div className="admin-info">
                <div className="admin-icon">🛡️</div>
                <h3 className="admin-section-title">SERAPHINE ADMIN ACCESS</h3>
                <p className="admin-description">
                  Secure portal for authorized personnel to access system
                  administration tools and user management.
                </p>
              </div>
              <button
                type="button"
                className="admin-access-button"
                onClick={handleAdminLogin}
              >
                🛡️ Open Admin Portal
              </button>
              <p className="admin-warning">
                ⚠️ RESTRICTED ACCESS • AUTHORIZED PERSONNEL ONLY
              </p>
            </div>
          )}
        </div>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <span className="signup-link">Sign up here</span>
          </p>
        </div>
      </div>

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      <AdminPanelInterface
        isOpen={isAdminPanelOpen}
        onClose={handleAdminPanelClose}
      />
    </div>
  );
}
