import { useState, useEffect, useRef } from "react";
import TongueDrum from "./TongueDrum";
import type { Song } from "../types";

interface GameProps {
  song: Song;
  user: string;
  onEnd: (score: number, mistakes: number) => void;
}

// CONFIGURATION
const SPEED = 200; // Pixels per second (Falling speed)
const HIT_Y = 450; // The vertical pixel line where the note hits the drum
const SPAWN_Y = -50; // Start falling from above the screen
const HIT_WINDOW = 0.4; // Seconds allowed to hit the note (leniency)

// Map Notes to Horizontal Positions (0% = Left, 100% = Right)
// These are estimated to match your Circular Drum layout
const NOTE_POSITIONS: Record<string, { left: string }> = {
  // Center Notes (Top & Bottom)
  C4: { left: "50%" },
  G3: { left: "50%" },

  // Left Side Notes
  A3: { left: "38%" },
  E4: { left: "20%" },
  G4: { left: "12%" },
  B4: { left: "28%" },

  // Right Side Notes
  D4: { left: "62%" },
  F4: { left: "72%" },
  A4: { left: "80%" },
  B3: { left: "88%" },
  C5: { left: "75%" },
};

const Game = ({ song, user, onEnd }: GameProps) => {
  // GAME STATE
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [processedNotes, setProcessedNotes] = useState<Set<number>>(new Set());

  // ANIMATION REFS
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  // 1. GAME LOOP
  useEffect(() => {
    if (!isPlaying) return;

    const animate = (time: number) => {
      // Calculate time passed in seconds
      const now = (time - startTimeRef.current) / 1000;
      setCurrentTime(now);

      // End game if song is over (buffer of 3 seconds)
      const lastNoteTime = song.notes[song.notes.length - 1].time;
      if (now > lastNoteTime + 3) {
        onEnd(score, mistakes);
        return;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame((time) => {
      startTimeRef.current = time;
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(requestRef.current!);
  }, [isPlaying, song, onEnd, score, mistakes]);

  // 2. HIT LOGIC
  const handleHit = (noteClicked: string) => {
    // Find a note that matches the key AND is within the time window
    const hitCandidateIndex = song.notes.findIndex((n, idx) => {
      if (processedNotes.has(idx)) return false; // Already hit
      if (n.key !== noteClicked) return false; // Wrong key

      const timeDiff = Math.abs(n.time - currentTime);
      return timeDiff <= HIT_WINDOW;
    });

    if (hitCandidateIndex !== -1) {
      // HIT!
      setScore((s) => s + 10 + combo);
      setCombo((c) => c + 1);
      setProcessedNotes((prev) => new Set(prev).add(hitCandidateIndex));
    } else {
      // MISS (Only penalize if game is playing)
      if (isPlaying) {
        setCombo(0);
        setMistakes((m) => m + 1);
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
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
          padding: "10px 20px",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "12px",
          color: "white",
          zIndex: 20,
        }}
      >
        <span>
          User: <b>{user}</b>
        </span>
        <span>
          Score: <b style={{ color: "#4ade80" }}>{score}</b>
        </span>
        <span>
          Combo: <b style={{ color: "#facc15" }}>x{combo}</b>
        </span>
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
            background: "rgba(0,0,0,0.7)",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{ color: "#facc15", fontSize: "3rem", marginBottom: "20px" }}
          >
            Ready?
          </h1>
          <button
            onClick={() => setIsPlaying(true)}
            style={{
              padding: "20px 60px",
              fontSize: "1.5rem",
              background: "#facc15",
              color: "#0f172a",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 0 20px #facc15",
            }}
          >
            START
          </button>
        </div>
      )}

      {/* FALLING NOTES LAYER */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {/* The Hit Line (Visual Guide) */}
        <div
          style={{
            position: "absolute",
            top: `${HIT_Y}px`,
            left: "10%",
            right: "10%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />

        {song.notes.map((note, idx) => {
          // Calculate Y position based on time difference
          const timeUntilHit = note.time - currentTime;
          const yPos = HIT_Y - timeUntilHit * SPEED;

          // Render only if visible
          if (yPos < SPAWN_Y || yPos > HIT_Y + 100) return null;
          if (processedNotes.has(idx)) return null;

          const xPos = NOTE_POSITIONS[note.key]?.left || "50%";

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: xPos,
                top: `${yPos}px`,
                width: "40px",
                height: "40px",
                background: "#facc15",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 15px #facc15",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "black",
                fontSize: "0.9rem",
              }}
            >
              {note.key}
            </div>
          );
        })}
      </div>

      {/* DRUM LAYER (Center Screen) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <TongueDrum onHit={handleHit} />
      </div>
    </div>
  );
};

export default Game;
