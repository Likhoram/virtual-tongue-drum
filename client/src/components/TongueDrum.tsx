import { useEffect, useMemo, useCallback, useState } from "react";
import { playSound } from "../audio/synth";

// --- SVG PATHS ---
const TONGUE_PATH =
  "M 0,-70 C -30,-50 -40,-20 -30,0 C -20,20 -10,40 0,60 C 10,40 20,20 30,0 C 40,-20 30,-50 0,-70 Z";
const CENTER_PATH =
  "M 0,-35 C -15,-35 -25,-25 -25,-10 C -35,-10 -40,0 -35,10 C -35,25 -25,35 0,35 C 25,35 35,25 35,10 C 40,0 35,-10 25,-10 C 25,-25 15,-35 0,-35 Z";

interface Pad {
  id: number;
  note: string;
  key: string;
  rotation: number; // Position in degrees
  scale: number; // Size of the tongue (1.0 = standard)
  color: string;
}

interface DrumProps {
  onHit?: (note: string) => void;
  activeNote?: string | null;
}

const TongueDrum = ({ onHit, activeNote }: DrumProps) => {
  const [showNotes, setShowNotes] = useState(false);

  const pads: Pad[] = useMemo(
    () => [
      // --- THE OUTER RING (Shifted ~15 degrees Clockwise) ---

      // 1. Top (Low Note - Big)
      {
        id: 1,
        note: "B3",
        key: "y",
        rotation: 15,
        scale: 1.2,
        color: "#60a5fa",
      },

      // 2. Going Right (Getting Higher/Smaller)
      {
        id: 2,
        note: "B4",
        key: "k", // Changed from 'u'
        rotation: 51,
        scale: 0.85,
        color: "#f472b6",
      },
      {
        id: 3,
        note: "G4",
        key: "j", // Changed from 'k'
        rotation: 87,
        scale: 0.9,
        color: "#f472b6",
      },
      {
        id: 4,
        note: "E4",
        key: "n", // Changed from 'j'
        rotation: 123,
        scale: 1.0,
        color: "#f472b6",
      },
      {
        id: 5,
        note: "C4",
        key: "b", // Changed from 'n'
        rotation: 159,
        scale: 1.1,
        color: "#f472b6",
      },

      // 6. Bottom (Low Note - Big)
      {
        id: 6,
        note: "A3",
        key: "v",
        rotation: 195,
        scale: 1.2,
        color: "#60a5fa",
      },

      // 7. Going Left (Medium to High)
      {
        id: 7,
        note: "D4",
        key: "c",
        rotation: 231,
        scale: 1.05,
        color: "#f472b6",
      },
      {
        id: 8,
        note: "F4",
        key: "f",
        rotation: 267,
        scale: 0.95,
        color: "#f472b6",
      },
      {
        id: 9,
        note: "A4",
        key: "d",
        rotation: 303,
        scale: 0.9,
        color: "#f472b6",
      },

      // 10. High Note (Smallest)
      {
        id: 10,
        note: "C5",
        key: "r",
        rotation: 339,
        scale: 0.8,
        color: "#a47adfeb",
      },

      // --- CENTER (Upside Down) ---
      {
        id: 11,
        note: "G3",
        key: "g",
        rotation: 180,
        scale: 1.6,
        color: "#facc15",
      },
    ],
    [],
  );

  const handlePadHit = useCallback(
    (pad: Pad) => {
      playSound(pad.note);
      if (onHit) onHit(pad.note);

      // Visual Flash
      const element = document.getElementById(`pad-path-${pad.note}`);
      const label = document.getElementById(`pad-label-${pad.note}`);
      if (element && label) {
        element.style.fill = "#ffffff";
        element.style.filter = "drop-shadow(0 0 20px white)";
        label.style.fill = "#000000";
        setTimeout(() => {
          element.style.fill = pad.color;
          element.style.filter = "none";
          label.style.fill = "#ffffff";
        }, 150);
      }
    },
    [onHit],
  );

  // Keyboard Event Listener
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
      const pad = pads.find((p) => p.key === keyStr);
      if (pad) handlePadHit(pad);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePadHit, pads]);

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
      <button
        onClick={() => setShowNotes(!showNotes)}
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
          fill="#1b0c7685"
          stroke="#5231d580"
          strokeWidth="8"
        />

        {pads.map((pad) => {
          const isCenter = pad.note === "G3";
          const isActive = activeNote === pad.note;

          // Transform Logic
          let transform = "";
          let textRotation = 0;

          if (isCenter) {
            // Center is scaled by 1.6 in the config, and rotated 180
            transform = `translate(${center}, ${center}) rotate(${pad.rotation}) scale(${pad.scale})`;
            textRotation = -pad.rotation;
          } else {
            // Outer tongues: Rotate -> Move out -> Scale based on pitch
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
                // Adjust font size based on the tongue scale so text fits nicely
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
