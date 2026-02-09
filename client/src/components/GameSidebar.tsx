import { useState } from "react";
import Leaderboard from "./Leaderboard";
import type { Song } from "../types";

interface GameSidebarProps {
  songs: Song[];
  onStart: (username: string, songId: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const GameSidebar = ({
  songs,
  onStart,
  isOpen,
  onToggle,
}: GameSidebarProps) => {
  const [username, setUsername] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ✅ RESTORED: This state tracks hovering for the header instructions
  const [isHovering, setIsHovering] = useState(false);

  const isDisabled = !username || !selectedId;

  // ✅ RESTORED: Your original color palette
  const colors = {
    bg: "rgba(255, 255, 255, 0.95)",
    textMain: "#334155",
    textSub: "#64748b",
    inputBg: "#f8fafc",
    buttonBg: "#f59e0b",
  };

  return (
    <div
      style={{
        width: isOpen ? "400px" : "0px",
        minWidth: isOpen ? "400px" : "0px",
        background: colors.bg,
        borderLeft: "1px solid rgba(0,0,0,0.1)",
        height: "100%",
        overflow: "hidden", // Hide content when closed
        display: "flex",
        flexDirection: "column",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        zIndex: 20,
        boxShadow: isOpen ? "-10px 0 30px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div
        style={{
          width: "400px", // Fixed width to prevent squishing
          padding: "30px",
          height: "100%",
          boxSizing: "border-box",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s ease",
          overflowY: "auto",
        }}
      >
        {/* --- HEADER SECTION (RESTORED) --- */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* The "Game Setup" Area with Hover Effect */}
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              marginBottom: "20px",
              cursor: "help",
              minHeight: "80px", // Reserve space so it doesn't jump
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <h2
              style={{
                margin: "0 0 10px 0",
                color: colors.textMain,
                fontSize: "1.8rem",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovering ? "scale(1.02)" : "scale(1)",
                textShadow: isHovering
                  ? "0 4px 10px rgba(51, 65, 85, 0.2)"
                  : "none",
              }}
            >
              Game Setup
            </h2>

            <div
              style={{ height: "40px", display: "flex", alignItems: "center" }}
            >
              {/* ✅ THE LOGIC YOU WANTED: Text vs Line */}
              {isHovering ? (
                <p
                  style={{
                    color: colors.textSub,
                    fontSize: "0.95rem",
                    lineHeight: "1.4",
                    margin: 0,
                    fontWeight: "400",
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  Ready for a challenge? Enter your name and pick a song to
                  start!
                </p>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "2px",
                    background: "#e2e8f0",
                  }}
                />
              )}
            </div>
          </div>

          {/* Close Button (X) */}
          <button
            onClick={onToggle}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.5rem",
              color: "#94a3b8",
              padding: "5px",
            }}
          >
            ✕
          </button>
        </div>

        {/* --- INPUTS SECTION --- */}
        <div style={{ marginTop: "10px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: colors.textMain,
            }}
          >
            1. Player Name
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name..."
            style={{
              width: "100%",
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: colors.inputBg,
              color: "#0f172a",
              marginBottom: "15px",
              fontSize: "1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: colors.textMain,
            }}
          >
            2. Select Song
          </label>
          <select
            onChange={(e) => {
              const val = Number(e.target.value);
              setSelectedId(val === 0 ? null : val);
            }}
            style={{
              width: "100%",
              padding: "10px 15px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: colors.inputBg,
              color: "#0f172a",
              marginBottom: "15px",
              fontSize: "1rem",
              outline: "none",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
          >
            <option value="0">-- Choose a Track --</option>
            {songs.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.notes.length} notes)
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              if (!isDisabled) onStart(username, selectedId!);
            }}
            disabled={isDisabled}
            title={
              isDisabled
                ? "Please enter a name and pick a song to start"
                : "Start Game!"
            }
            style={{
              width: "100%",
              padding: "15px",
              background: isDisabled ? "#cbd5e1" : colors.buttonBg,
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: isDisabled ? "default" : "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginTop: "5px",
              boxShadow: isDisabled
                ? "none"
                : "0 4px 10px rgba(245, 158, 11, 0.4)",
              transition: "background 0.2s",
              boxSizing: "border-box",
            }}
          >
            START GAME ▷
          </button>
        </div>

        {/* --- LEADERBOARD --- */}
        <div
          style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <Leaderboard songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default GameSidebar;
