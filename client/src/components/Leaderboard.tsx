import { useEffect, useState } from "react";
import type { Song, Score } from "../types";
import "./Leaderboard.css";

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
        const sorted = data.sort((a: Score, b: Score) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }

          return (
            new Date(b.played_at).getTime() - new Date(a.played_at).getTime()
          );
        });

        setScores(sorted.slice(0, 10));
        setLoading(false);
      });
  }, []);

  const getSongName = (id: number) => {
    const song = songs.find((s) => s.id === id);
    return song ? song.title : "Unknown";
  };

  return (
    <div className="leaderboard">
      <h3 className="leaderboard__title">🏆 High Scores</h3>

      {loading ? (
        <p className="leaderboard__text">Loading...</p>
      ) : scores.length === 0 ? (
        <p className="leaderboard__text leaderboard__text--italic">
          No scores yet. Be the first!
        </p>
      ) : (
        <table className="leaderboard__table">
          <thead>
            <tr className="leaderboard__head-row">
              <th className="leaderboard__head-cell">#</th>
              <th className="leaderboard__head-cell">User</th>
              <th className="leaderboard__head-cell">Song</th>
              <th className="leaderboard__head-cell leaderboard__head-cell--right">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={s.id} className="leaderboard__row">
                <td
                  className={`leaderboard__rank${
                    i < 3 ? " leaderboard__rank--top" : ""
                  }`}
                >
                  {i + 1}
                </td>
                <td className="leaderboard__user">{s.username}</td>
                <td className="leaderboard__song">{getSongName(s.song_id)}</td>
                <td className="leaderboard__score">{s.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
