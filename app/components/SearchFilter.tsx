"use client";

import React, { useState, useMemo } from "react";
import "./SearchFilter.css";

interface Device {
  id: string;
  name: string;
  type: string;
  room: string;
  status: "ON" | "OFF";
  brand?: string;
}

interface Room {
  id: string;
  name: string;
  deviceCount: number;
}

interface Scene {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
}

interface SearchFilterProps {
  devices?: Device[];
  rooms?: Room[];
  scenes?: Scene[];
  onClose?: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  devices = [],
  rooms = [],
  scenes = [],
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Items");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Default data for demo
  const defaultDevices: Device[] = [
    {
      id: "1",
      name: "Smart Lamp",
      type: "Light",
      room: "Living Room",
      status: "ON",
      brand: "Philips",
    },
    {
      id: "2",
      name: "Smart Thermostat",
      type: "Climate",
      room: "Bedroom",
      status: "OFF",
      brand: "Nest",
    },
    {
      id: "3",
      name: "Smart Speaker",
      type: "Audio",
      room: "Kitchen",
      status: "ON",
      brand: "Amazon",
    },
    {
      id: "4",
      name: "Smart TV",
      type: "Entertainment",
      room: "Living Room",
      status: "ON",
      brand: "Samsung",
    },
    {
      id: "5",
      name: "Coffee Maker",
      type: "Appliance",
      room: "Kitchen",
      status: "OFF",
      brand: "Keurig",
    },
  ];

  const defaultRooms: Room[] = [
    { id: "1", name: "Bedroom", deviceCount: 5 },
    { id: "2", name: "Living Room", deviceCount: 8 },
    { id: "3", name: "Kitchen", deviceCount: 4 },
    { id: "4", name: "Bathroom", deviceCount: 2 },
    { id: "5", name: "Office", deviceCount: 6 },
    { id: "6", name: "Study", deviceCount: 3 },
  ];

  const defaultScenes: Scene[] = [
    { id: "1", name: "Comfort Mode", status: "ACTIVE" },
    { id: "2", name: "Away Mode", status: "INACTIVE" },
    { id: "3", name: "Nurse Mode", status: "INACTIVE" },
    { id: "4", name: "Emergency Mode", status: "INACTIVE" },
    { id: "5", name: "Night Mode", status: "ACTIVE" },
  ];

  const allDevices = devices.length > 0 ? devices : defaultDevices;
  const allRooms = rooms.length > 0 ? rooms : defaultRooms;
  const allScenes = scenes.length > 0 ? scenes : defaultScenes;

  const filterOptions = ["All Items", "Devices", "Rooms", "Scenes"];

  const filteredResults = useMemo(() => {
    let results: any[] = [];

    if (filterType === "All Items" || filterType === "Devices") {
      const filteredDevices = allDevices.filter(
        (device) =>
          device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          device.room.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      results = [
        ...results,
        ...filteredDevices.map((d) => ({ ...d, itemType: "device" })),
      ];
    }

    if (filterType === "All Items" || filterType === "Rooms") {
      const filteredRooms = allRooms.filter((room) =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      results = [
        ...results,
        ...filteredRooms.map((r) => ({ ...r, itemType: "room" })),
      ];
    }

    if (filterType === "All Items" || filterType === "Scenes") {
      const filteredScenes = allScenes.filter((scene) =>
        scene.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      results = [
        ...results,
        ...filteredScenes.map((s) => ({ ...s, itemType: "scene" })),
      ];
    }

    return results;
  }, [searchQuery, filterType, allDevices, allRooms, allScenes]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Light":
        return "💡";
      case "Climate":
        return "🌡️";
      case "Audio":
        return "🔊";
      case "Entertainment":
        return "📺";
      case "Appliance":
        return "☕";
      default:
        return "📱";
    }
  };

  const getRoomIcon = () => "🏠";
  const getSceneIcon = () => "🎭";

  return (
    <div className="search-filter-overlay">
      <div className="search-filter-modal">
        <div className="search-filter-header">
          <h2 className="search-filter-title">Search & Filter</h2>
          <button className="search-filter-close" onClick={onClose}>
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

        <div className="search-filter-controls">
          <div className="search-input-container">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search devices, rooms, scenes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-dropdown-container">
            <button
              className="filter-dropdown-trigger"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span>{filterType}</span>
              <svg
                className={`filter-dropdown-arrow ${isFilterOpen ? "open" : ""}`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isFilterOpen && (
              <div className="filter-dropdown-menu">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    className={`filter-dropdown-item ${filterType === option ? "active" : ""}`}
                    onClick={() => {
                      setFilterType(option);
                      setIsFilterOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="search-results-header">
          <span className="results-count">
            {filteredResults.length} results
          </span>
        </div>

        <div className="search-results">
          {filteredResults.length === 0 ? (
            <div className="no-results">
              <p>No results found</p>
            </div>
          ) : (
            filteredResults.map((item, index) => (
              <div
                key={`${item.itemType}-${item.id || index}`}
                className="search-result-item"
              >
                <div className="result-icon">
                  {item.itemType === "device" && getDeviceIcon(item.type)}
                  {item.itemType === "room" && getRoomIcon()}
                  {item.itemType === "scene" && getSceneIcon()}
                </div>

                <div className="result-content">
                  <div className="result-name">{item.name}</div>

                  {item.itemType === "device" && (
                    <div className="result-details">
                      <span className="device-type">{item.type}</span>
                      {item.brand && (
                        <span className="device-brand">{item.brand}</span>
                      )}
                      <span className="device-room">{item.room}</span>
                    </div>
                  )}

                  {item.itemType === "room" && (
                    <div className="result-details">
                      <span className="room-device-count">
                        {item.deviceCount} devices
                      </span>
                    </div>
                  )}

                  {item.itemType === "scene" && (
                    <div className="result-details">
                      <span className="scene-type">Scene</span>
                    </div>
                  )}
                </div>

                <div className="result-status">
                  {item.itemType === "device" && (
                    <span
                      className={`status-badge ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  )}

                  {item.itemType === "scene" && (
                    <span
                      className={`status-badge ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  )}

                  {item.itemType === "room" && (
                    <svg
                      className="chevron-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
