import { useState } from "react";
import TongueDrum from "./TongueDrum";

interface Note {
  key: string;
  note?: string;
}

interface Song {
  title: string;
  notes: Note[];
}

interface GameProps {
  song: Song;
  user: string;
  onEnd: (score: number, mistakes: number) => void;
}

const Game = ({ song, user, onEnd }: GameProps) => {
  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  // The note the user MUST hit right now
  const targetNote = song.notes[index];

  const handleHit = (note: string) => {
    if (!targetNote) return;

    // Game Logic: Did they hit the correct key?
    // We check against 'targetNote.key' because your database stores notes like "C4"
    // But wait! Your JSON might use "key" as "C4" or "note". Let's assume the JSON is { "key": "C4" }

    // ADJUSTMENT: We check if the played note matches the target note
    if (note === targetNote.key || note === targetNote.note) {
      // Correct!
      const nextIndex = index + 1;
      if (nextIndex >= song.notes.length) {
        // Song Finished!
        onEnd(Math.max(0, 100 - mistakes * 5), mistakes);
      } else {
        setIndex(nextIndex);
      }
    } else {
      // Wrong!
      setMistakes((m) => m + 1);
    }
  };

  return (
    <div>
      {/* HUD Header */}
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

      {/* The Drum */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{ marginBottom: "20px", color: "#94a3b8" }}>
          Hit the highlighted pad!
        </h3>

        {/* We pass the 'key' (like "C4") as the activeNote so it lights up */}
        <TongueDrum
          activeNote={targetNote?.key || targetNote?.note}
          onHit={handleHit}
        />
      </div>
    </div>
  );
};

export default Game;
