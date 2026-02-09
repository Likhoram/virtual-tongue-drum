import { useState } from "react";
import FreePlayPanel from "./FreePlayPanel";
import GameSidebar from "./GameSidebar";
import type { Song } from "../types";

interface HomeProps {
  songs: Song[];
  onStart: (username: string, songId: number) => void;
}

const Home = ({ songs, onStart }: HomeProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ flex: 1, position: "relative", height: "100%" }}>
        <FreePlayPanel />

        {!isMenuVisible && (
          <button
            onClick={() => setIsMenuVisible(true)}
            title="Open Menu"
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              zIndex: 100,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "2.5rem",
              color: "#fbfdff",
              padding: "0",
              lineHeight: "1",
            }}
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
