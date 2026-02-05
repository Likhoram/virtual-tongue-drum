import { useEffect, useCallback, useState } from "react";
import { playSound } from "../audio/synth";

// --- EXPORTED CONFIGURATION ---
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

// --- SVG PATHS ---
const TONGUE_PATH =
  "M 0,-70 C -30,-50 -40,-20 -30,0 C -20,20 -10,40 0,60 C 10,40 20,20 30,0 C 40,-20 30,-50 0,-70 Z";
const CENTER_PATH =
  "M 0,-35 C -15,-35 -25,-25 -25,-10 C -35,-10 -40,0 -35,10 C -35,25 -25,35 0,35 C 25,35 35,25 35,10 C 40,0 35,-10 25,-10 C 25,-25 15,-35 0,-35 Z";

interface DrumProps {
  onHit?: (note: string) => void;
  activeNote?: string | null;
  forcedView?: "keys" | "notes";
  hideToggleButton?: boolean;
}

const TongueDrum = ({
  onHit,
  activeNote,
  forcedView,
  hideToggleButton,
}: DrumProps) => {
  const [internalShowNotes, setInternalShowNotes] = useState(false);

  const showNotes = forcedView ? forcedView === "notes" : internalShowNotes;

  const handlePadHit = useCallback(
    (pad: Pad) => {
      playSound(pad.note);
      if (onHit) onHit(pad.note);

      // Visual Flash Effect on Click
      const element = document.getElementById(`pad-path-${pad.note}`);
      const label = document.getElementById(`pad-label-${pad.note}`);
      if (element && label) {
        // Flash White
        element.style.fill = "#ffffff";
        element.style.filter = "drop-shadow(0 0 20px white)";
        label.style.fill = "#000000";

        // Revert to normal after 150ms
        setTimeout(() => {
          // Note: The Game component might keep it white if it's still the active note.
          // This creates a nice "flash" even if it stays active.
          element.style.fill = ""; // Clear inline style so it falls back to props
          element.style.filter = "none";
          label.style.fill = "#ffffff";
        }, 150);
      }
    },
    [onHit],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      )
        return;

      const keyStr = e.key.toLowerCase();
      const pad = DRUM_PADS.find((p) => p.key === keyStr);
      if (pad) handlePadHit(pad);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePadHit]);

  const center = 300;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!hideToggleButton && (
        <button
          onClick={() => setInternalShowNotes(!internalShowNotes)}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.8rem",
            zIndex: 10,
          }}
        >
          {showNotes ? "Show Keys" : "Show Notes"}
        </button>
      )}

      <svg
        viewBox="0 0 600 600"
        style={{
          maxWidth: "90vh",
          maxHeight: "90vw",
          width: "100%",
          height: "auto",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))",
        }}
      >
        <circle
          cx={center}
          cy={center}
          r="280"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="8"
        />

        {DRUM_PADS.map((pad) => {
          const isCenter = pad.note === "G3";

          // --- THE FIX ---
          // Compare Song Note ("C4") with Pad Note ("C4")
          const isActive = activeNote === pad.note;

          let transform = "";
          let textRotation = 0;

          if (isCenter) {
            transform = `translate(${center}, ${center}) rotate(${pad.rotation}) scale(${pad.scale})`;
            textRotation = -pad.rotation;
          } else {
            transform = `translate(${center}, ${center}) rotate(${pad.rotation}) translate(0, -190) scale(${pad.scale})`;
            textRotation = -pad.rotation;
          }

          return (
            <g
              key={pad.id}
              onClick={() => handlePadHit(pad)}
              style={{ cursor: "pointer" }}
              transform={transform}
            >
              <path
                id={`pad-path-${pad.note}`}
                d={isCenter ? CENTER_PATH : TONGUE_PATH}
                // If active (from Game) OR flashed (from Click), it becomes white
                fill={isActive ? "#ffffff" : pad.color}
                stroke="#0f172a"
                strokeWidth={isCenter ? 1.5 : 3}
                style={{ transition: "fill 0.1s" }}
              />
              <text
                id={`pad-label-${pad.note}`}
                x="0"
                y={isCenter ? 5 : 10}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={isCenter ? "14px" : "24px"}
                fontWeight="bold"
                pointerEvents="none"
                transform={`rotate(${textRotation})`}
                style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}
              >
                {showNotes ? pad.note : pad.key.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TongueDrum;
