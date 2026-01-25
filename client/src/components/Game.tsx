import { useState } from "react";
import TongueDrum from "./TongueDrum";
import type { Song } from "../types"; // <--- IMPORT THE SHARED TYPE

interface GameProps {
  song: Song;
  user: string;
  onEnd: (score: number, mistakes: number) => void;
}

const Game = ({ song, user, onEnd }: GameProps) => {
  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const targetNote = song.notes[index];

  const handleHit = (note: string) => {
    if (!targetNote) return;

    // Use TypeScript's "Type Assertion" (as any) to handle flexible JSON
    // This stops the red line if your DB sends "key" but TS expects "note"

    const targetKey = targetNote.key || targetNote.note || targetNote;

    if (note === targetKey) {
      const nextIndex = index + 1;
      if (nextIndex >= song.notes.length) {
        onEnd(Math.max(0, 100 - mistakes * 5), mistakes);
      } else {
        setIndex(nextIndex);
      }
    } else {
      setMistakes((m) => m + 1);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "40px",
          background: "rgba(0,0,0,0.3)",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
        <span>
          User: <b>{user}</b>
        </span>
        <span>
          Song: <b>{song.title}</b>
        </span>
        <span>
          Progress:{" "}
          <b style={{ color: "#facc15" }}>
            {index + 1} / {song.notes.length}
          </b>
        </span>
        <span style={{ color: "#f87171" }}>Mistakes: {mistakes}</span>
      </div>

      <div style={{ textAlign: "center" }}>
        <h3 style={{ marginBottom: "20px", color: "#94a3b8" }}>
          Hit the highlighted pad!
        </h3>

        <TongueDrum
          activeNote={targetNote?.key || targetNote?.note || undefined}
          onHit={handleHit}
        />
      </div>
    </div>
  );
};

export default Game;
