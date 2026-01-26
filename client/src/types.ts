// 1. A single musical note
export interface Note {
  key: string;   // e.g. "C4", "G3"
  time: number;  // When it should be hit (seconds)
}

// 2. A Song object
export interface Song {
  id: number;
  title: string;
  notes: Note[];
}

// 3. A Score object (for Leaderboard & Results)
export interface Score {
  id: number;
  username: string; // The backend sends this flattened
  score: number;
  mistakes: number;
  song_id: number;
  played_at: string;
}