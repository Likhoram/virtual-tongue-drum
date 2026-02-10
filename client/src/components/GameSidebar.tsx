import { useState } from "react";
import Leaderboard from "./Leaderboard";
import type { Song } from "../types";
import "./GameSidebar.css";

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
  const [isHovering, setIsHovering] = useState(false);
  const isDisabled = !username || !selectedId;

  return (
    <div className={`game-sidebar${isOpen ? " game-sidebar--open" : ""}`}>
      <div
        className={`game-sidebar__inner${
          isOpen ? " game-sidebar__inner--open" : ""
        }`}
      >
        <div className="game-sidebar__header">
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="game-sidebar__header-info"
          >
            <h2
              className={`game-sidebar__title${
                isHovering ? " game-sidebar__title--hover" : ""
              }`}
            >
              Game Mode
            </h2>

            <div className="game-sidebar__hint">
              {isHovering ? (
                <p className="game-sidebar__hint-text">
                  Ready for a challenge? Enter your name and pick a song to
                  start!
                </p>
              ) : (
                <div className="game-sidebar__hint-line" />
              )}
            </div>
          </div>

          <button onClick={onToggle} className="game-sidebar__close">
            ✕
          </button>
        </div>

        {/* INPUTS SECTION */}
        <div className="game-sidebar__section">
          <label className="game-sidebar__label">1. Player Name</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name..."
            className="game-sidebar__input"
          />

          <label className="game-sidebar__label">2. Select a Song</label>
          <select
            onChange={(e) => {
              const val = Number(e.target.value);
              setSelectedId(val === 0 ? null : val);
            }}
            className="game-sidebar__select"
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
            className={`game-sidebar__button${
              isDisabled ? " game-sidebar__button--disabled" : ""
            }`}
          >
            START GAME
          </button>
        </div>

        {/* --- LEADERBOARD --- */}
        <div className="game-sidebar__leaderboard">
          <Leaderboard songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default GameSidebar;
