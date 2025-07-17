"use client";

import { useState } from "react";
import "./AddDeviceModal.css";

interface AddDeviceModalProps {
  onClose: () => void;
  onAddDevice: (deviceData: {
    name: string;
    type: string;
    room: string;
    brand: string;
    pairingStatus: string;
  }) => void;
  rooms: string[];
}

export default function AddDeviceModal({
  onClose,
  onAddDevice,
  rooms,
}: AddDeviceModalProps) {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [pairingStatus, setPairingStatus] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const deviceTypes = [
    "Air Conditioner",
    "Light",
    "Climate",
    "Audio",
    "Entertainment",
    "Appliance",
    "Security",
    "Sensor",
    "Switch",
  ];

  const pairingStatuses = ["Auto", "Manual", "Bluetooth", "WiFi", "Zigbee"];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!deviceName.trim()) {
      newErrors.deviceName = "Device name is required";
    }

    if (!deviceType) {
      newErrors.deviceType = "Device type is required";
    }

    if (!selectedRoom) {
      newErrors.selectedRoom = "Room selection is required";
    }

    if (!deviceBrand.trim()) {
      newErrors.deviceBrand = "Device brand is required";
    }

    if (!pairingStatus) {
      newErrors.pairingStatus = "Pairing status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onAddDevice({
        name: deviceName.trim(),
        type: deviceType,
        room: selectedRoom,
        brand: deviceBrand.trim(),
        pairingStatus: pairingStatus,
      });

      // Reset form
      setDeviceName("");
      setDeviceType("");
      setSelectedRoom("");
      setDeviceBrand("");
      setPairingStatus("");
      setErrors({});
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Tambah Perangkat Baru</h2>
          <button
            className="close-btn"
            onClick={onClose}
            title="Tutup"
            aria-label="Tutup"
          >
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

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="deviceName" className="form-label">
              Nama Perangkat
            </label>
            <input
              type="text"
              id="deviceName"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              className={`form-input ${errors.deviceName ? "error" : ""}`}
              placeholder="AC Ruang Tamu"
            />
            {errors.deviceName && (
              <span className="error-message">{errors.deviceName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="deviceType" className="form-label">
              Jenis Perangkat
            </label>
            <select
              id="deviceType"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className={`form-select ${errors.deviceType ? "error" : ""}`}
            >
              <option value="">Pilih jenis perangkat</option>
              {deviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.deviceType && (
              <span className="error-message">{errors.deviceType}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="deviceBrand" className="form-label">
              Merek
            </label>
            <input
              type="text"
              id="deviceBrand"
              value={deviceBrand}
              onChange={(e) => setDeviceBrand(e.target.value)}
              className={`form-input ${errors.deviceBrand ? "error" : ""}`}
              placeholder="TCL AI Inverter"
            />
            {errors.deviceBrand && (
              <span className="error-message">{errors.deviceBrand}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="pairingStatus" className="form-label">
              Status Pairing
            </label>
            <select
              id="pairingStatus"
              value={pairingStatus}
              onChange={(e) => setPairingStatus(e.target.value)}
              className={`form-select ${errors.pairingStatus ? "error" : ""}`}
            >
              <option value="">Pilih status pairing</option>
              {pairingStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.pairingStatus && (
              <span className="error-message">{errors.pairingStatus}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="selectedRoom" className="form-label">
              Ruangan
            </label>
            <select
              id="selectedRoom"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className={`form-select ${errors.selectedRoom ? "error" : ""}`}
            >
              <option value="">Pilih ruangan</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
            {errors.selectedRoom && (
              <span className="error-message">{errors.selectedRoom}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Batal
            </button>
            <button type="submit" className="submit-btn">
              Tambah Perangkat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
