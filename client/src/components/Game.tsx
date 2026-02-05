import { useState, useEffect } from "react";
import TongueDrum, { DRUM_PADS } from "./TongueDrum";
import type { Song } from "../types";

interface GameProps {
  song: Song;
  user: string;
  onEnd: (score: number, mistakes: number) => void;
}

const Game = ({ song, user, onEnd }: GameProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"keys" | "notes">("keys");
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    if (song.notes.length > 0 && isPlaying) {
      setActiveNote(song.notes[0].key);
    }
  }, [song, isPlaying]);

  // --- SCORE CALCULATOR (Accuracy Only) ---
  const calculateFinalScore = (notesHit: number) => {
    const totalNotes = song.notes.length;

    // Accuracy Score: (Notes Hit - Mistakes) / Total Notes
    // Example: 20 notes, 1 mistake. (19/20) = 95%.
    const rawScore = ((notesHit - mistakes) / totalNotes) * 100;

    // Clamp to 0 (No negative scores)
    return Math.max(0, Math.round(rawScore));
  };

  const handleHit = (keyClicked: string) => {
    if (!isPlaying) return;
    if (currentIndex >= song.notes.length) return;

    const targetNote = song.notes[currentIndex];

    if (keyClicked === targetNote.key) {
      // CORRECT
      setActiveNote(null);
      const nextIndex = currentIndex + 1;

      if (nextIndex >= song.notes.length) {
        // --- GAME FINISHED ---
        // Pass full length because we finished the song
        const finalScore = calculateFinalScore(song.notes.length);

        setTimeout(() => {
          onEnd(finalScore, mistakes);
        }, 500);
      } else {
        // Next Note
        setTimeout(() => {
          setCurrentIndex(nextIndex);
          setActiveNote(song.notes[nextIndex].key);
        }, 150);
      }
    } else {
      // MISTAKE
      setMistakes((m) => m + 1);
    }
  };

  const handleQuit = () => {
    // Quit Early: Calculate score based on progress so far
    const finalScore = calculateFinalScore(currentIndex);
    onEnd(finalScore, mistakes);
  };

  const getLabel = (key: string) => {
    if (viewMode === "keys") return key.toUpperCase();
    const pad = DRUM_PADS.find((p) => p.key === key);
    return pad ? pad.note : key;
  };

  const upcomingNotes = song.notes.slice(currentIndex, currentIndex + 5);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at center, rgb(246, 191, 80) 0%, #ef8af2cf 100%)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* HUD (Heads Up Display) */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        <button
          onClick={() => setViewMode(viewMode === "keys" ? "notes" : "keys")}
          style={{
            background: "rgba(255,255,255,0.3)",
            border: "2px solid white",
            color: "white",
            padding: "10px 20px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {viewMode === "keys" ? "Mode: KEYS" : "Mode: NOTES"}
        </button>

        {/* LIVE STATS: Notes Hit & Mistakes (No Percentage) */}
        <div
          style={{
            padding: "10px 25px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            display: "flex",
            gap: "25px",
            fontWeight: "800",
            color: "#334155",
            fontSize: "1.1rem",
          }}
        >
          <span>
            🎵 {currentIndex} / {song.notes.length}
          </span>
          <span style={{ color: mistakes > 0 ? "#ef4444" : "#cbd5e1" }}>
            ❌ {mistakes}
          </span>
        </div>

        <button
          onClick={handleQuit}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(220, 38, 38, 0.3)",
          }}
        >
          Quit
        </button>
      </div>

      {/* START OVERLAY */}
      {!isPlaying && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(5px)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              color: "white",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              marginBottom: "10px",
            }}
          >
            Ready?
          </h1>
          <button
            onClick={() => setIsPlaying(true)}
            style={{
              padding: "20px 60px",
              fontSize: "2rem",
              borderRadius: "50px",
              border: "none",
              background: "#f59e0b",
              color: "white",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(245, 158, 11, 0.4)",
              transition: "transform 0.2s",
            }}
          >
            PLAY
          </button>
        </div>
      )}

      {/* BUBBLES */}
      <div
        style={{
          position: "absolute",
          top: "100px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          zIndex: 10,
          opacity: isPlaying ? 1 : 0.3,
        }}
      >
        {upcomingNotes.map((note, idx) => (
          <div
            key={`${currentIndex}-${idx}`}
            style={{
              width: idx === 0 ? "65px" : "45px",
              height: idx === 0 ? "65px" : "45px",
              borderRadius: "50%",
              background: idx === 0 ? "#facc15" : "rgba(255,255,255,0.6)",
              border: "4px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: idx === 0 ? "1.4rem" : "0.9rem",
              color: "#334155",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              transform: idx === 0 ? "scale(1.1)" : "scale(1)",
              transition: "all 0.2s",
            }}
          >
            {getLabel(note.key)}
          </div>
        ))}
      </div>

      {/* DRUM */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          marginTop: "80px",
          zIndex: 5,
        }}
      >
        <TongueDrum
          onHit={handleHit}
          activeNote={isPlaying ? activeNote : null}
          forcedView={viewMode}
          hideToggleButton={true}
        />
      </div>
    </div>
  );
};

export default Game;
