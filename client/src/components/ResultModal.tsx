interface ResultProps {
  score: number;
  mistakes: number;
  onHome: () => void;
}

const ResultModal = ({ score, mistakes, onHome }: ResultProps) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "50px",
          borderRadius: "20px",
          textAlign: "center",
          border: "1px solid #475569",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ margin: 0, color: "#94a3b8" }}>Song Complete!</h2>

        <h1
          style={{
            fontSize: "5rem",
            margin: "20px 0",
            background: "linear-gradient(to right, #facc15, #fbbf24)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {score}%
        </h1>

        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          You made {mistakes} mistakes.
        </p>

        <button
          onClick={onHome}
          style={{
            padding: "15px 40px",
            background: "#fff",
            color: "#0f172a",
            border: "none",
            borderRadius: "30px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1.1rem",
            transition: "transform 0.1s",
          }}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
