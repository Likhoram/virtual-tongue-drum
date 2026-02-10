import { useState, useEffect, useCallback } from "react";
import Home from "./components/Home";
import Game from "./components/Game";
import Result from "./components/Result";
import type { Song } from "./types";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

type AppState = "HOME" | "GAME" | "RESULT";

function App() {
  const [appState, setAppState] = useState<AppState>("HOME");
  const [songs, setSongs] = useState<Song[]>([]);

  const [currentUser, setCurrentUser] = useState("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const [lastScore, setLastScore] = useState(0);
  const [lastMistakes, setLastMistakes] = useState(0);
  const [newRank, setNewRank] = useState<number | null>(null);

  const [leaderboardKey, setLeaderboardKey] = useState(0);

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
      setNewRank(null);
      setAppState("GAME");
    }
  };

  const handleGameEnd = useCallback(
    async (scorePercent: number, mistakes: number) => {
      if (!currentSong || !currentUser) return;

      setLastScore(scorePercent);
      setLastMistakes(mistakes);

      setAppState("RESULT");

      try {
        const res = await fetch(`${API_URL}/scores`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: currentUser,
            song_id: currentSong.id,
            score: scorePercent,
            mistakes: mistakes,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setNewRank(data.rank);
          setLeaderboardKey((prev) => prev + 1);
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
    <div className="app">
      {appState === "HOME" && (
        <Home key={leaderboardKey} songs={songs} onStart={handleStartGame} />
      )}

      {(appState === "GAME" || appState === "RESULT") && currentSong && (
        <Game song={currentSong} user={currentUser} onEnd={handleGameEnd} />
      )}

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
