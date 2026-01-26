import { useState } from "react";
import TongueDrum from "./TongueDrum";
import Leaderboard from "./Leaderboard";
import type { Song } from "../types";

interface HomeProps {
  songs: Song[];
  onStart: (username: string, songId: number) => void;
  copyright: string; // Add copyright prop
}

const Home = ({ songs, onStart, copyright }: HomeProps) => {
  const [username, setUsername] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Menu is visible by default
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  // STYLES
  const styles = {
    container: {
      display: "flex",
      height: "100%",
      width: "100%",
      position: "relative" as const,
    },
    // Left Side: Free Play
    freePlaySection: {
      flex: 1, // Takes remaining space
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)",
      transition: "flex-basis 0.3s ease-in-out", // Smooth resize
    },
    // Right Side: Game Mode Sidebar
    sidebar: {
      // Fixed width when visible, 0 when hidden
      flexBasis: isMenuVisible ? "450px" : "0px",
      minWidth: isMenuVisible ? "450px" : "0px",
      overflowX: "hidden" as const, // Hide content while sliding
      background: "#1e293b",
      borderLeft: "2px solid #334155",
      display: "flex",
      flexDirection: "column" as const,
      transition: "all 0.3s ease-in-out",
      position: "relative" as const,
    },
    sidebarContent: {
      // Fade content in/out so it doesn't look squished
      opacity: isMenuVisible ? 1 : 0,
      padding: "30px",
      height: "100%",
      overflowY: "auto" as const,
      transition: "opacity 0.2s ease-in-out",
      whiteSpace: "nowrap" as const, // Prevent text wrapping during transition
    },
    // The Toggle Button
    toggleButton: {
      position: "absolute" as const,
      top: "20px",
      // Position relative to the left edge of the sidebar
      left: isMenuVisible ? "-40px" : "-40px",
      width: "40px",
      height: "40px",
      background: "#facc15",
      color: "#0f172a",
      border: "none",
      borderRadius: "8px 0 0 8px",
      cursor: "pointer",
      fontSize: "1.2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
      transition: "left 0.3s ease-in-out",
    },
    inputStyle: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #334155",
      background: "#0f172a",
      color: "#fff",
      marginBottom: "15px",
      boxSizing: "border-box" as const,
    },
    copyright: {
      position: "absolute" as const,
      bottom: "10px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#64748b",
      fontSize: "0.8rem",
      pointerEvents: "none" as const,
    },
  };

  return (
    <div style={styles.container}>
      {/* LEFT: Free Play Section */}
      <div style={styles.freePlaySection}>
        <h1 style={{ color: "#facc15", marginBottom: "10px" }}>
          Virtual Tongue Drum
        </h1>
        <h2
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
            fontWeight: "normal",
          }}
        >
          Free Play Mode
        </h2>
        <div
          style={{ width: "100%", maxWidth: "600px", flex: 1, minHeight: 0 }}
        >
          {/* Wrap in a div with minHeight: 0 for flex child scroll fix */}
          <TongueDrum />
        </div>
      </div>

      {/* RIGHT: Game Mode Sidebar */}
      <div style={styles.sidebar}>
        {/* Toggle Button attached to the sidebar */}
        <button onClick={toggleMenu} style={styles.toggleButton}>
          {isMenuVisible ? "▶" : "◀"}
        </button>

        <div style={styles.sidebarContent}>
          <h2
            style={{
              marginTop: 0,
              color: "#facc15",
              borderBottom: "1px solid #334155",
              paddingBottom: "15px",
            }}
          >
            Game Mode
          </h2>

          <div style={{ marginBottom: "30px", marginTop: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#94a3b8",
              }}
            >
              1. Who are you?
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Display Name"
              style={styles.inputStyle}
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#94a3b8",
              }}
            >
              2. Pick a song
            </label>
            <select
              onChange={(e) => setSelectedId(Number(e.target.value))}
              style={styles.inputStyle}
            >
              <option value="">(dropdown menu)</option>
              {songs.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.notes.length} notes)
                </option>
              ))}
            </select>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#94a3b8",
              }}
            >
              3. Start playing!
            </label>
            <button
              onClick={() => {
                if (username && selectedId) onStart(username, selectedId);
              }}
              disabled={!username || !selectedId}
              style={{
                width: "100%",
                padding: "15px",
                background: !username || !selectedId ? "#475569" : "#facc15",
                color: !username || !selectedId ? "#94a3b8" : "#0f172a",
                border: "none",
                borderRadius: "8px",
                cursor: !username || !selectedId ? "not-allowed" : "pointer",
                fontSize: "1.1rem",
                fontWeight: "bold",
                transition: "background 0.2s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              START ▷
            </button>
          </div>

          {/* Leaderboard placed below controls */}
          <Leaderboard songs={songs} />
        </div>
      </div>

      {/* Copyright Notice */}
      <div style={styles.copyright}>{copyright}</div>
    </div>
  );
};

export default Home;
