import { useState } from "react";
import TongueDrum from "./TongueDrum";
import Leaderboard from "./Leaderboard";
import type { Song } from "../types";

interface HomeProps {
  songs: Song[];
  onStart: (username: string, songId: number) => void;
  copyright: string;
}

const Home = ({ songs, onStart, copyright }: HomeProps) => {
  const [username, setUsername] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  const isDisabled = !username || !selectedId;

  // --- THEME PALETTE (Clean White & Slate) ---
  const colors = {
    gradient:
      "radial-gradient(circle at center, rgb(246, 191, 80) 0%, #ef8af2cf 100%)",

    // Left Text
    titleMain: "#ffffff",
    titleSub: "#ffdd47",
    copyright: "rgba(255, 255, 255, 0.8)",

    // Right Side
    sidebarBg: "rgba(255, 255, 255, 0.95)", // Clean White
    sidebarTextMain: "#334155", // Slate
    sidebarTextSub: "#64748b",

    // Controls
    inputBg: "#f8fafc",
    buttonBg: "#f59e0b", // Amber/Orange
    buttonText: "#ffffff",
  };

  const styles = {
    container: {
      display: "flex",
      height: "100%",
      width: "100%",
      position: "relative" as const,
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      overflow: "hidden",
    },
    // Left Side: Free Play
    freePlaySection: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: colors.gradient,
      transition: "flex-basis 0.3s ease-in-out",
      position: "relative" as const,
      overflowY: "auto" as const,
    },
    // Right Side: Game Mode Sidebar
    sidebar: {
      flexBasis: isMenuVisible ? "450px" : "0px",
      minWidth: isMenuVisible ? "450px" : "0px",
      overflowX: "hidden" as const,
      background: colors.sidebarBg,
      borderLeft: "1px solid rgba(255,255,255,0.8)",
      display: "flex",
      flexDirection: "column" as const,
      transition: "all 0.3s ease-in-out",
      position: "relative" as const,
      boxShadow: "-10px 0 30px rgba(0,0,0,0.05)",
      zIndex: 20,
    },
    sidebarContent: {
      opacity: isMenuVisible ? 1 : 0,
      padding: "40px",
      height: "100%",
      overflowY: "auto" as const,
      transition: "opacity 0.2s ease-in-out",
      whiteSpace: "nowrap" as const,
    },
    toggleButton: {
      position: "absolute" as const,
      top: "20px",
      left: "-40px",
      width: "40px",
      height: "40px",
      background: colors.sidebarBg,
      color: colors.sidebarTextMain,
      border: "none",
      borderRadius: "8px 0 0 8px",
      cursor: "pointer",
      fontSize: "1.2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
      transition: "left 0.3s ease-in-out",
      boxShadow: "-4px 0 10px rgba(0,0,0,0.05)",
    },
    inputStyle: {
      width: "100%",
      padding: "12px 15px",
      borderRadius: "10px",
      border: "1px solid #e2e8f0",
      background: colors.inputBg,
      color: "#0f172a",
      marginBottom: "20px",
      boxSizing: "border-box" as const,
      fontSize: "1rem",
      outline: "none",
      transition: "border 0.2s",
    },
    buttonStart: {
      width: "100%",
      padding: "15px",
      background: isDisabled ? "#cbd5e1" : colors.buttonBg,
      color: colors.buttonText,
      border: "none",
      borderRadius: "10px",
      // UX CHANGE: Use 'default' cursor instead of 'not-allowed' so it's less aggressive
      cursor: isDisabled ? "default" : "pointer",
      fontSize: "1.1rem",
      fontWeight: "bold",
      transition: "background 0.2s",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      marginTop: "10px",
      boxShadow: isDisabled ? "none" : "0 4px 10px rgba(245, 158, 11, 0.4)",
    },
    copyright: {
      position: "absolute" as const,
      bottom: "15px",
      left: "50%",
      transform: "translateX(-50%)",
      color: colors.copyright,
      fontWeight: "600",
      fontSize: "0.8rem",
      pointerEvents: "none" as const,
      whiteSpace: "nowrap" as const,
    },
    leaderboardContainer: {
      marginTop: "40px",
      paddingTop: "20px",
      borderTop: "1px solid #e2e8f0",
      color: colors.sidebarTextMain,
    },
  };

  return (
    <div style={styles.container}>
      {/* LEFT: Free Play Section */}
      <div style={styles.freePlaySection}>
        <div style={{ textAlign: "center", marginBottom: "10px", zIndex: 1 }}>
          <h1
            style={{
              color: colors.titleMain,
              margin: "0 0 5px 0",
              fontSize: "3.5rem",
              letterSpacing: "-1px",
              textShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            Virtual Tongue Drum
          </h1>
          <h2
            style={{
              color: colors.titleSub,
              marginTop: "0",
              fontWeight: "600",
              fontSize: "1.5rem",
            }}
          >
            Free Play Mode
          </h2>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "650px",
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TongueDrum />
        </div>

        <div style={styles.copyright}>© {copyright}</div>
      </div>

      {/* RIGHT: Game Mode Sidebar */}
      <div style={styles.sidebar}>
        <button onClick={toggleMenu} style={styles.toggleButton}>
          {isMenuVisible ? "▶" : "◀"}
        </button>

        <div style={styles.sidebarContent}>
          <h2
            style={{
              marginTop: 0,
              color: colors.sidebarTextMain,
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "15px",
              fontSize: "1.8rem",
            }}
          >
            Game Setup
          </h2>

          <div style={{ marginTop: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: colors.sidebarTextMain,
                fontWeight: "bold",
              }}
            >
              1. Player Name
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name..."
              style={styles.inputStyle}
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: colors.sidebarTextMain,
                fontWeight: "bold",
              }}
            >
              2. Select Song
            </label>
            <select
              onChange={(e) => setSelectedId(Number(e.target.value))}
              style={styles.inputStyle}
            >
              <option value="">-- Choose a Track --</option>
              {songs.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.notes.length} notes)
                </option>
              ))}
            </select>

            {/* BUTTON WITH TOOLTIP HINT */}
            <button
              onClick={() => {
                if (!isDisabled) onStart(username, selectedId!);
              }}
              disabled={isDisabled}
              // This provides the hover hint!
              title={
                isDisabled
                  ? "Please enter a name and pick a song to start!"
                  : "Ready to play!"
              }
              style={styles.buttonStart}
            >
              START GAME ▷
            </button>
          </div>

          <div style={styles.leaderboardContainer}>
            <Leaderboard songs={songs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
