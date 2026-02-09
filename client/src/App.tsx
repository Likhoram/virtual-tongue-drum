import { useState, useEffect, useCallback } from "react";
import Home from "./components/Home";
import Game from "./components/Game";
import Result from "./components/Result";
import type { Song } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

type AppState = "HOME" | "GAME" | "RESULT";

function App() {
  const [appState, setAppState] = useState<AppState>("HOME");
  const [songs, setSongs] = useState<Song[]>([]);

  // Game Session Data
  const [currentUser, setCurrentUser] = useState("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  // Results
  const [lastScore, setLastScore] = useState(0); // Percentage 0-100
  const [lastMistakes, setLastMistakes] = useState(0);
  const [newRank, setNewRank] = useState<number | null>(null);

  // Force Leaderboard refresh on Home
  const [leaderboardKey, setLeaderboardKey] = useState(0);

  // Fetch songs on load
  useEffect(() => {
    fetch(`${API_URL}/songs`)
      .then((res) => res.json())
      .then(setSongs)
      .catch(console.error);
  }, []);

  const handleStartGame = (username: string, songId: number) => {
    const song = songs.find((s) => s.id === songId);
    if (song) {
      setCurrentUser(username);
      setCurrentSong(song);
      setNewRank(null); // Reset rank
      setAppState("GAME");
    }
  };

  const handleGameEnd = useCallback(
    async (scorePercent: number, mistakes: number) => {
      if (!currentSong || !currentUser) return;

      setLastScore(scorePercent);
      setLastMistakes(mistakes);

      // Show result screen immediately (Rank will say "..." until fetch finishes)
      setAppState("RESULT");

      try {
        // 1. Send Score to Backend (Backend calculates GLOBAL Rank)
        const res = await fetch(`${API_URL}/scores`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: currentUser,
            song_id: currentSong.id,
            score: scorePercent, // Sending Percentage
            mistakes: mistakes,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setNewRank(data.rank); // <--- Set the rank from Backend
          setLeaderboardKey((prev) => prev + 1); // Refresh Home leaderboard
        } else {
          console.error("Error saving score:", data.error);
        }
      } catch (err) {
        console.error("Failed to submit score:", err);
      }
    },
    [currentSong, currentUser],
  );

  const goHome = () => {
    setAppState("HOME");
    setNewRank(null);
  };

  const replay = () => {
    setAppState("GAME");
    setNewRank(null);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {appState === "HOME" && (
        <Home
          key={leaderboardKey} // Forces leaderboard refresh
          songs={songs}
          onStart={handleStartGame}
        />
      )}

      {/* Game is visible during GAME and RESULT (so the modal can pop over it) */}
      {(appState === "GAME" || appState === "RESULT") && currentSong && (
        <Game song={currentSong} user={currentUser} onEnd={handleGameEnd} />
      )}

      {/* Result pop-up overlays the Game */}
      {appState === "RESULT" && currentSong && (
        <Result
          songName={currentSong.title}
          score={lastScore}
          mistakes={lastMistakes}
          rank={newRank}
          username={currentUser}
          onReplay={replay}
          onHome={goHome}
        />
      )}
    </div>
  );
}

export default App;
