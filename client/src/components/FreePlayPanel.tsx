import { useState } from "react";
import TongueDrum from "./TongueDrum";

const FreePlayPanel = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle at center, rgb(246, 191, 80) 0%, #ef8af2cf 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          textAlign: "center",
          marginBottom: "20px",
          zIndex: 1,
          cursor: "help",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            margin: "0",
            fontSize: "3rem",
            letterSpacing: "-1px",
            textShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          Virtual Tongue Drum
        </h1>

        <h2
          style={{
            color: "#ffdd47",
            margin: "0 0 10px 0",
            fontWeight: "600",
            fontSize: "1.4rem",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isHovering ? "scale(1.1)" : "scale(1)",
            textShadow: isHovering
              ? "0 0 15px rgba(255, 221, 71, 0.8)"
              : "none",
          }}
        >
          Free Play Mode
        </h2>

        <div
          style={{
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {isHovering ? (
            <p
              style={{
                color: "rgba(255,255,255,0.95)",
                margin: 0,
                fontSize: "1rem",
                fontWeight: "400",
                whiteSpace: "nowrap",
                animation: "fadeIn 0.3s ease-in-out",
              }}
            >
              Jump right in! Hit the letter keys shown on the drum (or click
              them) to play.
            </p>
          ) : (
            <div
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "2px",
                background: "rgba(255, 255, 255, 0.5)",
                borderRadius: "2px",
              }}
            />
          )}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          flex: "1 1 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
        }}
      >
        <TongueDrum />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255, 255, 255, 0.8)",
          fontWeight: "600",
          fontSize: "0.8rem",
          pointerEvents: "none",
        }}
      >
        Copyright © 2026 Wenxin Li
      </div>
    </div>
  );
};

export default FreePlayPanel;
