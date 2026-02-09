export interface Pad {
  id: number;
  note: string;
  key: string;
  rotation: number;
  scale: number;
  color: string;
}

export const DRUM_PADS: Pad[] = [
  { id: 1, note: "B3", key: "y", rotation: 15, scale: 1.2, color: "#60a5fa" },
  { id: 2, note: "B4", key: "k", rotation: 51, scale: 0.85, color: "#f472b6" },
  { id: 3, note: "G4", key: "j", rotation: 87, scale: 0.9, color: "#f472b6" },
  { id: 4, note: "E4", key: "n", rotation: 123, scale: 1.0, color: "#f472b6" },
  { id: 5, note: "C4", key: "b", rotation: 159, scale: 1.1, color: "#f472b6" },
  { id: 6, note: "A3", key: "v", rotation: 195, scale: 1.2, color: "#60a5fa" },
  { id: 7, note: "D4", key: "c", rotation: 231, scale: 1.05, color: "#f472b6" },
  { id: 8, note: "F4", key: "f", rotation: 267, scale: 0.95, color: "#f472b6" },
  { id: 9, note: "A4", key: "d", rotation: 303, scale: 0.9, color: "#f472b6" },
  { id: 10, note: "C5", key: "r", rotation: 339, scale: 0.8, color: "#f472b6" },
  { id: 11, note: "G3", key: "g", rotation: 180, scale: 1.6, color: "#facc15" },
];