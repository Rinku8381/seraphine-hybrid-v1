import React, { useState } from "react";
import "./ReflectionJournalInterface.css";

interface JournalEntry {
  id: string;
  date: string;
  time: string;
  mood: "very-happy" | "happy" | "neutral" | "sad" | "very-sad";
  moodIcon: string;
  borderColor: string;
  content: string;
  activities: string[];
}

interface ReflectionJournalInterfaceProps {
  onBack?: () => void;
}

export default function ReflectionJournalInterface({
  onBack,
}: ReflectionJournalInterfaceProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [journalEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "9 Juli 2025",
      time: "19:30",
      mood: "happy",
      moodIcon: "😊",
      borderColor: "#22d3ee",
      content:
        "Hari ini cukup produktif! Berhasil menyelesaikan beberapa tugas penting dan merasa puas dengan hasilnya. Seraphine juga membantu mengingatkan jadwal dengan baik.",
      activities: ["Produktif", "Tugas Selesai", "Bantuan AI"],
    },
    {
      id: "2",
      date: "8 Juli 2025",
      time: "08:15",
      mood: "very-happy",
      moodIcon: "😄",
      borderColor: "#10b981",
      content:
        "Pagi yang luar biasa! Bangun dengan perasaan segar dan penuh energi. Cuaca cerah dan semua sistem rumah berjalan sempurna. Seraphine menyambut dengan mood yang ceria.",
      activities: ["Energi Tinggi", "Cuaca Cerah", "Sistem Optimal"],
    },
    {
      id: "3",
      date: "7 Juli 2025",
      time: "22:45",
      mood: "neutral",
      moodIcon: "😐",
      borderColor: "#22d3ee",
      content:
        "Hari yang biasa-biasa saja. Tidak ada hal istimewa terjadi, tapi juga tidak ada masalah berarti. Seraphine tetap responsif seperti biasa.",
      activities: ["Rutinitas", "Normal", "Stabil"],
    },
  ]);

  const [stats] = useState({
    totalEntries: 3,
    avgMood: 7.3,
    happyDays: 1,
    favorites: 1,
  });

  const [emotionDistribution] = useState({
    gembira: 33,
    senang: 67,
    netral: 0,
    sedih: 0,
  });

  const handlePlayVoice = () => {
    // Placeholder for voice playback functionality
    console.log("Playing Seraphine voice...");
  };

  const handleAddNote = () => {
    // Placeholder for add note functionality
    console.log("Adding new note...");
  };

  const handleReadAloud = (entryId: string) => {
    console.log(`Reading entry ${entryId} with Seraphine voice...`);
  };

  const handleEditEntry = (entryId: string) => {
    console.log(`Editing entry ${entryId}...`);
  };

  const handleDeleteEntry = (entryId: string) => {
    console.log(`Deleting entry ${entryId}...`);
  };

  return (
    <div className="reflection-journal-container">
      <div className="journal-content">
        {/* Header */}
        <div className="journal-header">
          <h1 className="journal-title">SERAPHINE JOURNAL</h1>
          <p className="journal-subtitle">
            Catatan harian yang Seraphine buat untukmu, dengan hati. 💖
          </p>
        </div>

        {/* Control Bar */}
        <div className="control-bar">
          <select
            className="filter-dropdown"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">Semua Catatan</option>
            <option value="happy">Hari Bahagia</option>
            <option value="favorites">Favorit</option>
            <option value="recent">Terbaru</option>
          </select>

          <button className="voice-button" onClick={handlePlayVoice}>
            🔊 Putar Suara Seraphine
          </button>

          <button className="add-note-button" onClick={handleAddNote}>
            ✏️ Tambahkan Catatan
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalEntries}</div>
            <div className="stat-label">Total Entries</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.avgMood}</div>
            <div className="stat-label">Avg Mood</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.happyDays}</div>
            <div className="stat-label">Happy Days</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.favorites}</div>
            <div className="stat-label">Favorites</div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="journal-entries">
          {journalEntries.map((entry) => (
            <div
              key={entry.id}
              className="journal-entry"
              style={{ borderColor: entry.borderColor }}
            >
              <div className="entry-header">
                <div className="entry-date-time">
                  <span className="entry-date">{entry.date}</span>
                  <span className="entry-time">{entry.time}</span>
                </div>
                <div className="entry-mood">
                  <span className="mood-icon">{entry.moodIcon}</span>
                </div>
              </div>

              <div className="entry-content">
                <p>{entry.content}</p>
              </div>

              <div className="entry-activities">
                {entry.activities.map((activity, index) => (
                  <span key={index} className="activity-tag">
                    {activity}
                  </span>
                ))}
              </div>

              <div className="entry-actions">
                <button
                  className="action-button read-aloud"
                  onClick={() => handleReadAloud(entry.id)}
                >
                  🔊 Bacakan dengan suara Seraphine
                </button>
                <button
                  className="action-button edit"
                  onClick={() => handleEditEntry(entry.id)}
                >
                  ✏️ Edit catatan
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mood Analytics */}
        <div className="mood-analytics">
          <h3 className="analytics-title">Mood Analytics Neural Network</h3>

          <div className="analytics-content">
            <div className="mood-graph">
              <div className="graph-placeholder">
                <div className="graph-title">Weekly Mood Trend</div>
                <div className="graph-visual">
                  <div className="graph-bars">
                    <div
                      className="bar"
                      style={{ height: "60%", backgroundColor: "#22d3ee" }}
                    ></div>
                    <div
                      className="bar"
                      style={{ height: "80%", backgroundColor: "#10b981" }}
                    ></div>
                    <div
                      className="bar"
                      style={{ height: "45%", backgroundColor: "#22d3ee" }}
                    ></div>
                    <div
                      className="bar"
                      style={{ height: "70%", backgroundColor: "#10b981" }}
                    ></div>
                    <div
                      className="bar"
                      style={{ height: "55%", backgroundColor: "#22d3ee" }}
                    ></div>
                    <div
                      className="bar"
                      style={{ height: "85%", backgroundColor: "#10b981" }}
                    ></div>
                    <div
                      className="bar"
                      style={{ height: "65%", backgroundColor: "#22d3ee" }}
                    ></div>
                  </div>
                  <div className="graph-labels">
                    <span>Sen</span>
                    <span>Sel</span>
                    <span>Rab</span>
                    <span>Kam</span>
                    <span>Jum</span>
                    <span>Sab</span>
                    <span>Min</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="emotion-distribution">
              <h4 className="distribution-title">Emotion Distribution</h4>
              <div className="distribution-bars">
                <div className="emotion-bar">
                  <span className="emotion-label">Gembira</span>
                  <div className="emotion-progress">
                    <div
                      className="emotion-fill"
                      style={{
                        width: `${emotionDistribution.gembira}%`,
                        backgroundColor: "#10b981",
                      }}
                    ></div>
                  </div>
                  <span className="emotion-percentage">
                    {emotionDistribution.gembira}%
                  </span>
                </div>

                <div className="emotion-bar">
                  <span className="emotion-label">Senang</span>
                  <div className="emotion-progress">
                    <div
                      className="emotion-fill"
                      style={{
                        width: `${emotionDistribution.senang}%`,
                        backgroundColor: "#22d3ee",
                      }}
                    ></div>
                  </div>
                  <span className="emotion-percentage">
                    {emotionDistribution.senang}%
                  </span>
                </div>

                <div className="emotion-bar">
                  <span className="emotion-label">Netral</span>
                  <div className="emotion-progress">
                    <div
                      className="emotion-fill"
                      style={{
                        width: `${emotionDistribution.netral}%`,
                        backgroundColor: "#6b7280",
                      }}
                    ></div>
                  </div>
                  <span className="emotion-percentage">
                    {emotionDistribution.netral}%
                  </span>
                </div>

                <div className="emotion-bar">
                  <span className="emotion-label">Sedih</span>
                  <div className="emotion-progress">
                    <div
                      className="emotion-fill"
                      style={{
                        width: `${emotionDistribution.sedih}%`,
                        backgroundColor: "#ff006e",
                      }}
                    ></div>
                  </div>
                  <span className="emotion-percentage">
                    {emotionDistribution.sedih}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="bottom-actions">
          <button className="action-icon-button" title="Export Data">
            📊
          </button>
          <button className="action-icon-button" title="Share Analytics">
            📤
          </button>
          <button className="action-icon-button" title="Settings">
            ⚙️
          </button>
          <button className="action-icon-button" title="Help">
            ❓
          </button>
          <button className="back-button" onClick={onBack}>
            ← Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
