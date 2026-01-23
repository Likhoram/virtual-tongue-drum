import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// --- THE INTERFACES (The Shapes) ---
interface Note {
  key: string;
  time: number;
}

interface Song {
  id: number;
  title: string;
  notes: Note[];
}
// -----------------------------------

const App = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState("");

  // Use the environment variable for Vercel, or localhost for your laptop
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const getAllSongs = () => {
    axios
      .get(`${API_URL}/api/songs`)
      .then((response) => {
        setSongs(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not reach the database.");
      });
  };

  useEffect(() => {
    getAllSongs();
  }, []);

  return (
    <div id="App">
      <header>
        <h1>🎵 Virtual Tongue Drum</h1>
        <h2>{songs.length} Songs Available</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song.id} className="song-item">
              <strong>{song.title}</strong>
              {/* Now TypeScript knows 'notes' is a list, so .length is safe! */}
              <span style={{ marginLeft: "10px" }}>
                ({song.notes.length} notes)
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
