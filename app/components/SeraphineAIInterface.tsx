"use client";

import { useState, useRef } from "react";
import "./SeraphineAIInterface.css";

interface SeraphineAIInterfaceProps {
  onClose: () => void;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  attachments?: string[];
}

interface NavigationMode {
  id: string;
  name: string;
  icon: string;
  active: boolean;
}

export default function SeraphineAIInterface({
  onClose,
}: SeraphineAIInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Halo! Saya Seraphine, asisten AI Anda. Bagaimana saya bisa membantu Anda hari ini?",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      type: "user",
      content:
        "Hi Seraphine! Bisa bantu saya cek status semua perangkat di rumah?",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      type: "ai",
      content:
        "Tentu! Saya akan memeriksa status semua perangkat untuk Anda. Berdasarkan pemindaian terakhir: 5 perangkat aktif, 2 perangkat sedang standby. Apakah ada yang ingin Anda kontrol secara khusus?",
      timestamp: new Date(Date.now() - 180000),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [navigationModes, setNavigationModes] = useState<NavigationMode[]>([
    { id: "video", name: "Video Call", icon: "📹", active: false },
    { id: "games", name: "Mini-Games", icon: "🎮", active: false },
    { id: "shop", name: "Shop", icon: "🛒", active: false },
    { id: "journal", name: "Journal", icon: "📔", active: false },
    { id: "vr", name: "VR/AR", icon: "🥽", active: false },
    { id: "whisper", name: "Whisper", icon: "🤫", active: true },
  ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "Terima kasih atas pesan Anda! Saya sedang memproses permintaan Anda.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleVoiceModeToggle = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      setIsRecording(true);
      setTimeout(() => setIsRecording(false), 3000);
    }
  };

  const handlePrivateModeToggle = () => {
    setIsPrivateMode(!isPrivateMode);
  };

  const handleNavigationModeChange = (modeId: string) => {
    setNavigationModes((prev) =>
      prev.map((mode) => ({ ...mode, active: mode.id === modeId })),
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Files uploaded:", files);
      // Handle file upload logic here
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log("Files dropped:", files);
      // Handle file drop logic here
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="seraphine-overlay">
      <div className="seraphine-interface">
        <div className="seraphine-header">
          <div className="interface-title">
            <h2>Seraphine AI Room</h2>
          </div>
          <div className="header-controls">
            <button
              className={`mode-toggle voice ${isVoiceMode ? "active" : ""}`}
              onClick={handleVoiceModeToggle}
            >
              <span className="toggle-icon">🎤</span>
              <span className="toggle-text">Voice</span>
            </button>
            <button
              className={`mode-toggle private ${isPrivateMode ? "active" : ""}`}
              onClick={handlePrivateModeToggle}
            >
              <span className="toggle-icon">🔒</span>
              <span className="toggle-text">Private</span>
            </button>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="seraphine-main">
          {/* AI Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-container">
              <div
                className={`avatar-circle ${isRecording ? "recording" : ""}`}
              >
                <div className="avatar-glow"></div>
                <div className="avatar-core">
                  <span className="avatar-emoji">🤖</span>
                </div>
              </div>
              {isRecording && (
                <div className="recording-indicator">
                  <div className="recording-pulse"></div>
                  <span className="recording-text">Listening...</span>
                </div>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="chat-section">
            <div className="messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.type}-message`}
                >
                  <div className="message-content">
                    <p>{message.content}</p>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* File Drop Area */}
            <div
              className={`file-drop-area ${isDragOver ? "drag-over" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="drop-content">
                <div className="drop-icon">📎</div>
                <p className="drop-text">
                  {isDragOver ? "Drop files here" : "Drag & drop files here"}
                </p>
              </div>
            </div>

            {/* Input Section */}
            <div className="input-section">
              <div className="input-container">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message to Seraphine..."
                  className="message-input"
                />
                <div className="input-actions">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    className="hidden-file-input"
                  />
                  <button
                    className="action-btn attachment"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    📎
                  </button>
                  <button
                    className={`action-btn voice ${isRecording ? "recording" : ""}`}
                    onClick={handleVoiceModeToggle}
                  >
                    🎤
                  </button>
                  <button
                    className="action-btn send"
                    onClick={handleSendMessage}
                  >
                    📤
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="navigation-bar">
          <div className="nav-modes">
            {navigationModes.map((mode) => (
              <button
                key={mode.id}
                className={`nav-mode ${mode.active ? "active" : ""}`}
                onClick={() => handleNavigationModeChange(mode.id)}
              >
                <span className="mode-icon">{mode.icon}</span>
                <span className="mode-name">{mode.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
