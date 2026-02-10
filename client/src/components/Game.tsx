import { useState } from "react";
import TongueDrum from "./TongueDrum";
import { DRUM_PADS } from "../data/drumData";
import type { Song } from "../types";
import "./Game.css";

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
          setIsPlaying(false);
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
    setIsPlaying(false);
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
    <div className="game">
      {/* HUD */}
      <div className="game__hud">
        <div className="game__hud-section">
          <button
            onClick={() => setViewMode(viewMode === "keys" ? "notes" : "keys")}
            className="game__toggle"
          >
            {viewMode === "keys" ? "Show Notes" : "Show Keys"}
          </button>
        </div>

        <div className="game__stats">
          <div className="game__stat">
            <span className="game__stat-icon">🎵</span>
            <span>
              {currentIndex} / {song.notes.length}
            </span>
          </div>

          <div
            className={`game__stat${mistakes > 0 ? " game__stat--danger" : ""}`}
          >
            <span className="game__stat-icon game__stat-icon--danger">❌</span>
            <span>{mistakes}</span>
          </div>
        </div>

        <div className="game__hud-section">
          <button onClick={handleQuit} className="game__quit">
            QUIT
          </button>
        </div>
      </div>

      {/* START OVERLAY */}
      {!isPlaying && (
        <div className="game__overlay">
          <h1 className="game__overlay-title">Ready, {user}?</h1>
          <p className="game__overlay-subtitle">
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
            className="game__play"
          >
            PLAY
          </button>
        </div>
      )}

      {/* BUBBLES */}
      <div className={`game__bubbles${isPlaying ? "" : " game__bubbles--dim"}`}>
        {upcomingNotes.map((note, idx) => (
          <div
            key={`${currentIndex}-${idx}`}
            className={`game__bubble${idx === 0 ? " game__bubble--active" : ""}`}
          >
            {getLabel(note.key)}
          </div>
        ))}
      </div>

      {/* DRUM */}
      <div className="game__drum">
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
