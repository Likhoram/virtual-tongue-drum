import { useState } from "react";
import FreePlayPanel from "./FreePlayPanel";
import GameSidebar from "./GameSidebar";
import type { Song } from "../types";
import "./Home.css";

interface HomeProps {
  songs: Song[];
  onStart: (username: string, songId: number) => void;
}

const Home = ({ songs, onStart }: HomeProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  return (
    <div className="home">
      <div className="home__panel">
        <FreePlayPanel />

        {!isMenuVisible && (
          <button
            onClick={() => setIsMenuVisible(true)}
            title="Open Menu"
            className="home__menu-button"
          >
            ☰
          </button>
        )}
      </div>

      <GameSidebar
        songs={songs}
        onStart={onStart}
        isOpen={isMenuVisible}
        onToggle={() => setIsMenuVisible(!isMenuVisible)}
      />
    </div>
  );
};

export default Home;
