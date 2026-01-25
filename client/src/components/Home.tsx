import { useState } from "react";
import TongueDrum from "./TongueDrum";
import type { Song } from "../types"; // <--- IMPORT THE SHARED TYPE

interface HomeProps {
  songs: Song[];
  onStart: (username: string, songId: number) => void;
}

const Home = ({ songs, onStart }: HomeProps) => {
  const [username, setUsername] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      {/* Left Column: Free Play */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "#94a3b8", marginBottom: "20px" }}>
          Free Play Mode
        </h2>
        <TongueDrum />
      </div>

      {/* Right Column: Controls */}
      <div
        style={{
          background: "rgba(30, 41, 59, 0.6)",
          padding: "30px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          minWidth: "300px",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#facc15" }}>Start Challenge</h2>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "0.9rem",
            }}
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#0f172a",
              color: "#fff",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "0.9rem",
            }}
          >
            Select Song
          </label>
          <select
            onChange={(e) => setSelectedId(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#0f172a",
              color: "#fff",
            }}
          >
            <option value="">-- Choose a Song --</option>
            {songs.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.notes.length} notes)
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            if (username && selectedId) onStart(username, selectedId);
          }}
          disabled={!username || !selectedId}
          style={{
            width: "100%",
            padding: "15px",
            background: !username || !selectedId ? "#475569" : "#818cf8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: !username || !selectedId ? "not-allowed" : "pointer",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          Start Game ▶
        </button>
      </div>
    </div>
  );
};

export default Home;
