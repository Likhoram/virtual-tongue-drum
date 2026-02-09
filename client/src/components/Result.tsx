interface ResultProps {
  songName: string;
  score: number;
  mistakes: number;
  rank: number | null;
  username: string;
  onReplay: () => void;
  onHome: () => void;
}

const Result = ({
  songName,
  score,
  mistakes,
  rank,
  username,
  onReplay,
  onHome,
}: ResultProps) => {
  let greeting = `Nice Try, ${username}!`;
  if (score >= 95) {
    greeting = `Legendary, ${username}!`;
  } else if (score >= 80) {
    greeting = `Awesome, ${username}!`;
  } else if (score >= 60) {
    greeting = `Good Job, ${username}!`;
  }

  // STYLES
  const styles = {
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    },
    modal: {
      background: "rgba(255, 255, 255, 0.95)",
      border: "4px solid white",
      borderRadius: "30px",
      padding: "40px",
      textAlign: "center" as const,
      maxWidth: "450px",
      width: "90%",
      boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
      position: "relative" as const,
    },
    closeButton: {
      position: "absolute" as const,
      top: "20px",
      right: "20px",
      background: "#e2e8f0",
      border: "none",
      color: "#64748b",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "2rem",
      color: "#334155",
      margin: "0 0 5px 0",
      fontWeight: "800",
    },
    subtitle: {
      color: "#64748b",
      marginBottom: "20px",
      fontSize: "1.1rem",
    },
    statsbox: {
      background: "#f8fafc",
      padding: "20px",
      borderRadius: "20px",
      marginBottom: "30px",
      border: "2px solid #e2e8f0",
    },
    scoreText: {
      fontSize: "3.5rem",
      fontWeight: "900",
      color: "#facc15",
      margin: "10px 0",
      textShadow: "0 2px 0 rgba(0,0,0,0.1)",
    },
    statRow: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginTop: "15px",
      color: "#475569",
      fontWeight: "bold",
      fontSize: "0.9rem",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
    },
    buttonPrimary: {
      padding: "15px 30px",
      borderRadius: "12px",
      border: "none",
      background: "#facc15",
      color: "#0f172a",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "bold" as const,
      flex: 1,
      boxShadow: "0 4px 10px rgba(250, 204, 21, 0.4)",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onHome}>
          X
        </button>

        {/* ✅ Use the variable here */}
        <h2 style={styles.title}>{greeting}</h2>
        <p style={styles.subtitle}>{songName} Complete</p>

        <div style={styles.statsbox}>
          <div style={styles.scoreText}>{score}%</div>

          <div style={styles.statRow}>
            {/* Mistakes */}
            <div>
              <div style={{ color: "#ef4444", fontSize: "1.4rem" }}>
                {mistakes}
              </div>
              <div>MISTAKES</div>
            </div>

            {/* Divider */}
            <div style={{ borderLeft: "2px solid #e2e8f0" }}></div>

            {/* Global Rank */}
            <div>
              <div style={{ color: "#7c3aed", fontSize: "1.4rem" }}>
                {rank ? `#${rank}` : "..."}
              </div>
              <div>GLOBAL RANK</div>
            </div>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.buttonPrimary} onClick={onReplay}>
            Replay
          </button>
          <button style={styles.buttonPrimary} onClick={onHome}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
