import { useEffect, useMemo, useCallback } from "react";
import { playSound } from "../audio/synth";

// --- SVG PATH DEFINITIONS ---
// A generic leaf shape path defined around a 0,0 center point.
// We will rotate and translate this for each tongue.
const TONGUE_PATH =
  "M 0,-70 C -30,-50 -40,-20 -30,0 C -20,20 -10,40 0,60 C 10,40 20,20 30,0 C 40,-20 30,-50 0,-70 Z";

// The decorative center piece from your image
const CENTER_PATH =
  "M 0,-35 C -10,-35 -20,-25 -20,-15 C -25,-15 -35,-10 -35,0 C -35,10 -25,15 -20,15 C -20,25 -10,35 0,35 C 10,35 20,25 20,15 C 25,15 35,10 35,0 C 35,-10 25,-15 20,-15 C 20,-25 10,-35 0,-35 Z";

interface Pad {
  id: number;
  note: string;
  key: string;
  label: string;
  rotation: number; // Position around the circle (degrees)
  color: string;
}

interface DrumProps {
  onHit?: (note: string) => void;
  activeNote?: string | null;
}

const TongueDrum = ({ onHit, activeNote }: DrumProps) => {
  // We arrange 11 notes around a circle.
  // We skip the bottom-most position (180 degrees) for visual balance, similar to the image.
  const pads: Pad[] = useMemo(
    () => [
      // Top Center
      {
        id: 4,
        note: "C4",
        key: "d",
        label: "D",
        rotation: 0,
        color: "#60a5fa",
      },
      // Right Side going down
      {
        id: 5,
        note: "D4",
        key: "k",
        label: "K",
        rotation: 30,
        color: "#f472b6",
      },
      {
        id: 7,
        note: "F4",
        key: "l",
        label: "L",
        rotation: 60,
        color: "#f472b6",
      },
      {
        id: 9,
        note: "A4",
        key: ";",
        label: ";",
        rotation: 90,
        color: "#f472b6",
      },
      {
        id: 11,
        note: "C5",
        key: "o",
        label: "O",
        rotation: 120,
        color: "#f472b6",
      },
      {
        id: 3,
        note: "B3",
        key: "j",
        label: "J",
        rotation: 150,
        color: "#f472b6",
      },

      // Bottom (Spacebar - largest, central)
      // We give it a special color and position it at the bottom.
      {
        id: 1,
        note: "G3",
        key: " ",
        label: "Space",
        rotation: 180,
        color: "#facc15",
      },

      // Left Side going up
      {
        id: 2,
        note: "A3",
        key: "f",
        label: "F",
        rotation: 210,
        color: "#60a5fa",
      },
      {
        id: 10,
        note: "B4",
        key: "w",
        label: "W",
        rotation: 240,
        color: "#60a5fa",
      },
      {
        id: 8,
        note: "G4",
        key: "a",
        label: "A",
        rotation: 270,
        color: "#60a5fa",
      },
      {
        id: 6,
        note: "E4",
        key: "s",
        label: "S",
        rotation: 300,
        color: "#60a5fa",
      },
    ],
    [],
  );

  const handlePadHit = useCallback(
    (pad: Pad) => {
      playSound(pad.note);
      if (onHit) onHit(pad.note);

      // Visual feedback (flash white)
      const element = document.getElementById(`pad-path-${pad.note}`);
      const label = document.getElementById(`pad-label-${pad.note}`);
      if (element && label) {
        element.style.fill = "#ffffff";
        element.style.filter = "drop-shadow(0 0 20px white)";
        label.style.fill = "#000000"; // Ensure label is readable on white
        setTimeout(() => {
          element.style.fill = pad.color;
          element.style.filter = "none";
          label.style.fill = "#ffffff"; // Return label to white
        }, 150);
      }
    },
    [onHit],
  );

  // Global Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // --- FIX: STOP SOUND IF TYPING IN AN INPUT ---
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        return;
      }

      const keyStr = e.key.toLowerCase();
      const pad = pads.find(
        (p) => p.key === keyStr || (p.key === " " && keyStr === " "),
      );

      if (pad) {
        handlePadHit(pad);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePadHit, pads]);

  const center = 300; // Center of the new 600x600 viewBox

  return (
    <div
      className="tongue-drum-wrapper"
      // Make wrapper flexible so it fills container
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 600 600" // Increased viewBox for better detail
        // Make SVG responsive and preserve aspect ratio
        style={{
          maxWidth: "90vh", // Ensure it doesn't overflow height on wide screens
          maxHeight: "90vw", // Ensure it doesn't overflow width on tall screens
          width: "100%",
          height: "auto",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))",
        }}
      >
        {/* Main Drum Body */}
        <circle
          cx={center}
          cy={center}
          r="280"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="8"
        />

        {/* Decorative Center Piece (from image) */}
        <g transform={`translate(${center}, ${center})`}>
          <path d={CENTER_PATH} fill="none" stroke="#475569" strokeWidth="4" />
        </g>

        {/* The Tongues */}
        {pads.map((pad) => {
          const isActive = activeNote === pad.note;
          const isSpacebar = pad.key === " ";

          // Calculate position: Move to center, Rotate to angle, Move outwards by radius
          // Spacebar is slightly larger and pushed further out
          const radius = isSpacebar ? 190 : 180;
          const scale = isSpacebar ? 1.3 : 1;
          const transform = `translate(${center}, ${center}) rotate(${pad.rotation}) translate(0, -${radius}) scale(${scale})`;

          // Counter-rotate text so it's always upright
          const textTransform = `rotate(${-pad.rotation})`;

          return (
            <g
              key={pad.id}
              onClick={() => handlePadHit(pad)}
              style={{ cursor: "pointer" }}
              transform={transform}
            >
              {/* The Leaf Shape */}
              <path
                id={`pad-path-${pad.note}`}
                d={TONGUE_PATH}
                fill={isActive ? "#ffffff" : pad.color}
                stroke={isActive ? "#ffffff" : "#0f172a"} // Dark outline like the image cuts
                strokeWidth="3"
                style={{ transition: "fill 0.1s, filter 0.1s" }}
              />

              {/* The Key Label */}
              <text
                id={`pad-label-${pad.note}`}
                x="0"
                y="10" // Adjust vertical centering within the leaf
                textAnchor="middle"
                fill="#ffffff"
                fontSize="24px"
                fontWeight="bold"
                pointerEvents="none"
                transform={textTransform} // Keep text upright
                style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}
              >
                {pad.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TongueDrum;
