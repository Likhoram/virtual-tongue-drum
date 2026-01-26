interface ResultProps {
  songName: string;
  score: number;
  mistakes: number;
  rank: number | null;
  onReplay: () => void;
  onPickSong: () => void;
  onHome: () => void;
}

const Result = ({
  songName,
  score,
  mistakes,
  rank,
  onReplay,
  onPickSong,
  onHome,
}: ResultProps) => {
  // STYLES
  const styles = {
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.7)", // Semi-transparent black
      backdropFilter: "blur(5px)", // Blurs the game behind it
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100, // Must be on top
    },
    modal: {
      background: "#1e293b",
      border: "2px solid #facc15",
      borderRadius: "20px",
      padding: "40px",
      textAlign: "center" as const,
      maxWidth: "500px",
      width: "90%",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
      position: "relative" as const,
    },
    closeButton: {
      position: "absolute" as const,
      top: "20px",
      right: "25px",
      background: "none",
      border: "2px solid #fff",
      color: "#fff",
      fontSize: "1.2rem",
      fontWeight: "bold",
      cursor: "pointer",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "2rem",
      color: "#facc15",
      marginBottom: "30px",
    },
    statsbox: {
      background: "#0f172a",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "30px",
      border: "1px solid #334155",
    },
    statText: {
      fontSize: "1.1rem",
      margin: "10px 0",
      color: "#e2e8f0",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      flexWrap: "wrap" as const,
    },
    button: {
      padding: "12px 20px",
      borderRadius: "8px",
      border: "1px solid #facc15",
      background: "transparent",
      color: "#facc15",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "bold" as const,
      transition: "all 0.2s",
      minWidth: "120px",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* "X" button acts as another way to go home */}
        <button style={styles.closeButton} onClick={onHome}>
          X
        </button>

        <h2 style={styles.title}>Song complete!</h2>

        <div style={styles.statsbox}>
          <p style={styles.statText}>
            Song: <b>{songName}</b>
          </p>
          <p
            style={{ ...styles.statText, fontSize: "1.5rem", color: "#4ade80" }}
          >
            Score: {score}
          </p>
          <p style={{ ...styles.statText, color: "#f87171" }}>
            Mistakes: {mistakes}
          </p>
          <p
            style={{
              ...styles.statText,
              fontSize: "1.3rem",
              marginTop: "20px",
            }}
          >
            Rank: {rank ? `#${rank}` : "Calculating..."}
          </p>
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.button,
              background: "#facc15",
              color: "#0f172a",
            }}
            onClick={onReplay}
          >
            Replay
          </button>
          <button style={styles.button} onClick={onPickSong}>
            Pick another song
          </button>
          <button style={styles.button} onClick={onHome}>
            Home screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
