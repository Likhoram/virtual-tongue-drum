import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./components/Home";
import Game from "./components/Game";
import ResultModal from "./components/ResultModal";
import type { Song } from "./types";

const App = () => {
  // State
  const [songs, setSongs] = useState<Song[]>([]);
  const [screen, setScreen] = useState<"home" | "game" | "result">("home");
  const [currentUser, setCurrentUser] = useState("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [lastResult, setLastResult] = useState({ score: 0, mistakes: 0 });

  // Fetch Songs Logic
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/songs`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("API Error:", err));
  }, [API_URL]);

  // Navigation Logic
  const startGame = (user: string, songId: number) => {
    const song = songs.find((s) => s.id === songId);
    if (song) {
      setCurrentUser(user);
      setCurrentSong(song);
      setScreen("game");
    }
  };

  const endGame = (score: number, mistakes: number) => {
    setLastResult({ score, mistakes });

    // Save to Database
    if (currentSong) {
      axios
        .post(`${API_URL}/api/scores`, {
          username: currentUser,
          song_id: currentSong.id,
          score: score,
          mistakes: mistakes,
        })
        .catch((err) => console.error("Could not save score:", err));
    }

    setScreen("result");
  };

  return (
    <div
      id="App"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
    >
      {/* Header */}
      <header
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "20px" }}
      >
        <h1
          style={{
            fontSize: "3rem",
            margin: 0,
            letterSpacing: "-2px",
            background: "linear-gradient(to right, #818cf8, #c084fc)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          🎵 Virtual Tongue Drum
        </h1>
      </header>

      {/* Screen Switching */}
      {screen === "home" && <Home songs={songs} onStart={startGame} />}

      {screen === "game" && currentSong && (
        <Game song={currentSong} user={currentUser} onEnd={endGame} />
      )}

      {screen === "result" && (
        <ResultModal
          score={lastResult.score}
          mistakes={lastResult.mistakes}
          onHome={() => setScreen("home")}
        />
      )}
    </div>
  );
};

export default App;
