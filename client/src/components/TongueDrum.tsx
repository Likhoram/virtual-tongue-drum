import { useEffect, useCallback, useState } from "react";
import { playSound } from "../audio/synth";
import { DRUM_PADS, type Pad } from "../data/drumData";
import "./TongueDrum.css";

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

      const element = document.getElementById(`pad-path-${pad.note}`);
      const label = document.getElementById(`pad-label-${pad.note}`);
      if (element && label) {
        element.style.fill = "#ffffff";
        element.style.filter = "drop-shadow(0 0 20px white)";
        label.style.fill = "#000000";

        setTimeout(() => {
          element.style.fill = "";
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
    <div className="tongue-drum">
      {!hideToggleButton && (
        <button
          onClick={() => setInternalShowNotes(!internalShowNotes)}
          className="tongue-drum__toggle"
        >
          {showNotes ? "Show Keys" : "Show Notes"}
        </button>
      )}

      <svg viewBox="0 0 600 600" className="tongue-drum__svg">
        <circle
          cx={center}
          cy={center}
          r="280"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="8"
          className="tongue-drum__base"
        />

        {DRUM_PADS.map((pad) => {
          const isCenter = pad.note === "G3";

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
              className="tongue-drum__pad"
              transform={transform}
            >
              <path
                id={`pad-path-${pad.note}`}
                d={isCenter ? CENTER_PATH : TONGUE_PATH}
                fill={isActive ? "#ffffff" : pad.color}
                stroke="#0f172a"
                strokeWidth={isCenter ? 1.5 : 3}
                className="tongue-drum__pad-path"
              />
              <text
                id={`pad-label-${pad.note}`}
                x="0"
                y={isCenter ? 5 : 10}
                textAnchor="middle"
                fontSize={isCenter ? "14px" : "24px"}
                transform={`rotate(${textRotation})`}
                className="tongue-drum__pad-label"
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
