import { useState } from "react";
import TongueDrum from "./TongueDrum";
import { DRUM_PADS } from "../data/drumData";
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

  const calculateFinalScore = (notesHit: number) => {
    const totalNotes = song.notes.length;
    const rawScore = ((notesHit - mistakes) / totalNotes) * 100;
    return Math.max(0, Math.round(rawScore));
  };

  const handleHit = (keyClicked: string) => {
    if (!isPlaying) return;
    if (currentIndex >= song.notes.length) return;

    const targetNote = song.notes[currentIndex];

    if (keyClicked === targetNote.key) {
      setActiveNote(null);
      const nextIndex = currentIndex + 1;

      if (nextIndex >= song.notes.length) {
        const finalScore = calculateFinalScore(song.notes.length);
        setTimeout(() => {
          onEnd(finalScore, mistakes);
        }, 500);
      } else {
        setTimeout(() => {
          setCurrentIndex(nextIndex);
          setActiveNote(song.notes[nextIndex].key);
        }, 150);
      }
    } else {
      setMistakes((m) => m + 1);
    }
  };

  const handleQuit = () => {
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
      }}
    >
      {/* HUD */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        {/* LEFT: Mode Toggle */}
        <div style={{ pointerEvents: "auto" }}>
          <button
            onClick={() => setViewMode(viewMode === "keys" ? "notes" : "keys")}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              color: "white",
              padding: "10px 16px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "0.9rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {viewMode === "keys" ? "Show Notes" : "Show Keys"}
          </button>
        </div>

        {/* CENTER: The Single Stats Box */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            padding: "10px 25px",
            borderRadius: "30px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            pointerEvents: "auto",
            minWidth: "200px",
            justifyContent: "center",
          }}
        >
          {/* Notes Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#334155",
              fontWeight: "800",
              fontSize: "1.2rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>🎵</span>
            <span>
              {currentIndex} / {song.notes.length}
            </span>
          </div>

          {/* Mistakes Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: mistakes > 0 ? "#ef4444" : "#334155",
              fontWeight: "800",
              fontSize: "1.2rem",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>❌</span>
            <span>{mistakes}</span>
          </div>
        </div>

        {/* RIGHT: Quit Button */}
        <div style={{ pointerEvents: "auto" }}>
          <button
            onClick={handleQuit}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(220, 38, 38, 0.3)",
            }}
          >
            QUIT
          </button>
        </div>
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
            Ready, {user}?
          </h1>
          <p
            style={{
              color: "#ffffff",
              fontSize: "1.5rem",
              fontStyle: "italic",
              margin: "0 0 30px 0",
              maxWidth: "600px",
            }}
          >
            Hit the highlighted keys on the drum to play the song!
          </p>

          <button
            onClick={() => {
              setIsPlaying(true);
              setCurrentIndex(0);
              setMistakes(0);
              if (song.notes.length > 0) {
                setActiveNote(song.notes[0].key);
              }
            }}
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
          maxWidth: "700px",
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
