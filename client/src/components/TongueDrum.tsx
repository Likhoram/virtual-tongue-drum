import { useEffect, useMemo, useCallback } from "react";
import { playSound } from "../audio/synth";

interface Pad {
  id: number;
  note: string;
  key: string;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotate?: number;
  color: string;
}

interface DrumProps {
  onHit?: (note: string) => void;
  activeNote?: string | null;
}

const TongueDrum = ({ onHit, activeNote }: DrumProps) => {
  const pads: Pad[] = useMemo(
    () => [
      {
        id: 1,
        note: "G3",
        key: " ",
        label: "Space",
        x: 150,
        y: 150,
        width: 80,
        height: 60,
        color: "#facc15",
      },
      {
        id: 2,
        note: "A3",
        key: "f",
        label: "F",
        x: 100,
        y: 190,
        rotate: -20,
        color: "#60a5fa",
      },
      {
        id: 4,
        note: "C4",
        key: "d",
        label: "D",
        x: 60,
        y: 170,
        rotate: -40,
        color: "#60a5fa",
      },
      {
        id: 6,
        note: "E4",
        key: "s",
        label: "S",
        x: 40,
        y: 130,
        rotate: -60,
        color: "#60a5fa",
      },
      {
        id: 8,
        note: "G4",
        key: "a",
        label: "A",
        x: 50,
        y: 85,
        rotate: -80,
        color: "#60a5fa",
      },
      {
        id: 10,
        note: "B4",
        key: "w",
        label: "W",
        x: 90,
        y: 50,
        rotate: -100,
        color: "#60a5fa",
      },
      {
        id: 3,
        note: "B3",
        key: "j",
        label: "J",
        x: 200,
        y: 190,
        rotate: 20,
        color: "#f472b6",
      },
      {
        id: 5,
        note: "D4",
        key: "k",
        label: "K",
        x: 240,
        y: 170,
        rotate: 40,
        color: "#f472b6",
      },
      {
        id: 7,
        note: "F4",
        key: "l",
        label: "L",
        x: 260,
        y: 130,
        rotate: 60,
        color: "#f472b6",
      },
      {
        id: 9,
        note: "A4",
        key: ";",
        label: ";",
        x: 250,
        y: 85,
        rotate: 80,
        color: "#f472b6",
      },
      {
        id: 11,
        note: "C5",
        key: "o",
        label: "O",
        x: 210,
        y: 50,
        rotate: 100,
        color: "#f472b6",
      },
    ],
    [],
  );

  const handlePadHit = useCallback(
    (pad: Pad) => {
      playSound(pad.note);
      if (onHit) onHit(pad.note);

      const element = document.getElementById(`pad-${pad.note}`);
      if (element) {
        element.style.fill = "#ffffff";
        element.style.filter = "drop-shadow(0 0 15px white)";
        setTimeout(() => {
          element.style.fill = pad.color;
          element.style.filter = "none";
        }, 150);
      }
    },
    [onHit],
  );

  // Global Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Find the pad
      const pad = pads.find(
        (p) =>
          p.key === e.key.toLowerCase() || (p.key === " " && e.key === " "),
      );

      if (pad) {
        // Now 'handlePadHit' is defined before we use it!
        handlePadHit(pad);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePadHit, pads]);

  return (
    <div
      className="tongue-drum-wrapper"
      style={{ width: "320px", margin: "0 auto" }}
    >
      <svg
        viewBox="0 0 300 300"
        style={{
          width: "100%",
          height: "auto",
          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
        }}
      >
        <circle
          cx="150"
          cy="150"
          r="148"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="4"
        />
        <circle cx="150" cy="150" r="30" fill="#0f172a" opacity="0.5" />

        {pads.map((pad) => {
          const isActive = activeNote === pad.note;
          return (
            <g
              key={pad.id}
              onClick={() => handlePadHit(pad)}
              style={{ cursor: "pointer" }}
            >
              <rect
                id={`pad-${pad.note}`}
                x={pad.x - (pad.width || 50) / 2}
                y={pad.y - (pad.height || 40) / 2}
                width={pad.width || 50}
                height={pad.height || 40}
                rx={20}
                ry={20}
                fill={isActive ? "#ffffff" : pad.color}
                stroke={isActive ? "#ffffff" : "rgba(255,255,255,0.2)"}
                strokeWidth="2"
                transform={`rotate(${pad.rotate || 0}, ${pad.x}, ${pad.y})`}
                style={{ transition: "fill 0.1s" }}
              />
              <text
                x={pad.x}
                y={pad.y + 5}
                textAnchor="middle"
                fill="#1e293b"
                fontSize="14px"
                fontWeight="bold"
                pointerEvents="none"
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
