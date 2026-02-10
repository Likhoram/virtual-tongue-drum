import "./Result.css";

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

  return (
    <div className="result__overlay">
      <div className="result__modal">
        <button className="result__close" onClick={onHome}>
          X
        </button>

        <h2 className="result__title">{greeting}</h2>
        <p className="result__subtitle">{songName} Complete</p>

        <div className="result__stats">
          <div className="result__score">{score}%</div>

          <div className="result__stat-row">
            <div>
              <div className="result__stat-value result__stat-value--mistakes">
                {mistakes}
              </div>
              <div>MISTAKES</div>
            </div>

            <div className="result__divider"></div>

            <div>
              <div className="result__stat-value result__stat-value--rank">
                {rank ? `#${rank}` : "..."}
              </div>
              <div>GLOBAL RANK</div>
            </div>
          </div>
        </div>

        <div className="result__button-group">
          <button className="result__button" onClick={onReplay}>
            Replay
          </button>
          <button className="result__button" onClick={onHome}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
