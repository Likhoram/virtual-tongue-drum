import { useState, useEffect, useCallback } from "react";
import Home from "./components/Home";
import Game from "./components/Game";
import Result from "./components/Result";
import type { Song, Score as ScoreType } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// The different states your app can be in
type AppState = "HOME" | "GAME" | "RESULT";

// const COPYRIGHT_TEXT = "copyright Wenxin Li";

function App() {
  // Add 'copyright' to the state so we can pass it to Home
  const [copyrightText] = useState("copyright Wenxin Li");
  const [appState, setAppState] = useState<AppState>("HOME");
  const [songs, setSongs] = useState<Song[]>([]);

  // Game Session Data
  const [currentUser, setCurrentUser] = useState("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [lastScore, setLastScore] = useState<{
    score: number;
    mistakes: number;
  } | null>(null);
  const [newRank, setNewRank] = useState<number | null>(null);

  // Fetch songs on load
  useEffect(() => {
    fetch(`${API_URL}/songs`)
      .then((res) => res.json())
      .then(setSongs)
      .catch(console.error);
  }, []);

  // --- Navigation Handlers ---

  const handleStartGame = (username: string, songId: number) => {
    const song = songs.find((s) => s.id === songId);
    if (song) {
      setCurrentUser(username);
      setCurrentSong(song);
      setAppState("GAME");
    }
  };

  const handleGameEnd = useCallback(
    async (score: number, mistakes: number) => {
      if (!currentSong || !currentUser) return;

      setLastScore({ score, mistakes });

      // 1. Post the score to the backend
      try {
        await fetch(`${API_URL}/scores`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: currentUser,
            song_id: currentSong.id,
            score: score,
            mistakes: mistakes,
          }),
        });

        // 2. Fetch leaderboard to determine rank
        const res = await fetch(`${API_URL}/scores`);
        const allScores: ScoreType[] = await res.json();

        // Filter for current song and sort descending
        const songScores = allScores
          .filter((s) => s.song_id === currentSong.id)
          .sort((a, b) => b.score - a.score);

        // Find the index of our new score (it will be the first one that matches)
        const rankIndex = songScores.findIndex(
          (s) =>
            s.username === currentUser &&
            s.score === score &&
            s.mistakes === mistakes,
        );

        setNewRank(rankIndex + 1);
      } catch (err) {
        console.error("Failed to submit score:", err);
        setNewRank(null); // Wouldn't show a rank on error
      }

      setAppState("RESULT");
    },
    [currentSong, currentUser],
  );

  const goHome = () => {
    setAppState("HOME");
    setLastScore(null);
    setNewRank(null);
  };

  const replay = () => {
    setAppState("GAME");
    setLastScore(null);
    setNewRank(null);
  };

  // --- Render Logic ---

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#0f172a",
        color: "white",
      }}
    >
      {appState === "HOME" && (
        <Home
          songs={songs}
          onStart={handleStartGame}
          copyright={copyrightText}
        />
      )}

      {/* Game is visible during GAME and RESULT states */}
      {(appState === "GAME" || appState === "RESULT") && currentSong && (
        <Game song={currentSong} user={currentUser} onEnd={handleGameEnd} />
      )}

      {/* Result pop-up overlays the Game */}
      {appState === "RESULT" && lastScore && currentSong && (
        <Result
          songName={currentSong.title}
          score={lastScore.score}
          mistakes={lastScore.mistakes}
          rank={newRank}
          onReplay={replay}
          onPickSong={goHome}
          onHome={goHome}
        />
      )}
    </div>
  );
}

export default App;
