import { useEffect, useState } from "react";
import type { Song, Score } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

interface LeaderboardProps {
  songs: Song[];
}

const Leaderboard = ({ songs }: LeaderboardProps) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/scores`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a: Score, b: Score) => b.score - a.score)
          .slice(0, 10);
        setScores(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard:", err);
        setLoading(false);
      });
  }, []);

  const getSongName = (id: number) => {
    const song = songs.find((s) => s.id === id);
    return song ? song.title : "Unknown";
  };

  return (
    <div style={{ marginTop: "20px", paddingBottom: "20px" }}>
      <h3
        style={{
          color: "#334155", // Dark Slate (Matches Sidebar Title)
          borderBottom: "2px solid #e2e8f0", // Light Grey Border
          paddingBottom: "10px",
          marginBottom: "15px",
          fontSize: "1.2rem",
        }}
      >
        🏆 High Scores
      </h3>

      {loading ? (
        <p style={{ color: "#64748b" }}>Loading...</p>
      ) : scores.length === 0 ? (
        <p style={{ color: "#64748b", fontStyle: "italic" }}>
          No scores yet. Be the first!
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
          }}
        >
          <thead>
            <tr style={{ color: "#64748b", textAlign: "left" }}>
              <th style={{ padding: "8px 4px", fontWeight: "600" }}>#</th>
              <th style={{ padding: "8px 4px", fontWeight: "600" }}>User</th>
              <th style={{ padding: "8px 4px", fontWeight: "600" }}>Song</th>
              <th
                style={{
                  padding: "8px 4px",
                  textAlign: "right",
                  fontWeight: "600",
                }}
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td
                  style={{
                    padding: "8px 4px",
                    // Top 3 get Amber color, others get Slate
                    color: i < 3 ? "#d97706" : "#64748b",
                    fontWeight: i < 3 ? "bold" : "normal",
                  }}
                >
                  {i + 1}
                </td>
                <td
                  style={{
                    padding: "8px 4px",
                    color: "#334155",
                    fontWeight: "600",
                  }}
                >
                  {s.username}
                </td>
                <td style={{ padding: "8px 4px", color: "#64748b" }}>
                  {getSongName(s.song_id)}
                </td>
                <td
                  style={{
                    padding: "8px 4px",
                    textAlign: "right",
                    color: "#ffa319", // Darker Green for better contrast on white
                    fontWeight: "bold",
                  }}
                >
                  {s.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
