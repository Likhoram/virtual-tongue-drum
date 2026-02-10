import { useState } from "react";
import TongueDrum from "./TongueDrum";
import "./FreePlayPanel.css";

const FreePlayPanel = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="free-play">
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="free-play__header"
      >
        <h1 className="free-play__title">Virtual Tongue Drum</h1>

        <h2
          className={`free-play__subtitle${
            isHovering ? " free-play__subtitle--hover" : ""
          }`}
        >
          Free Play Mode
        </h2>

        <div className="free-play__hint">
          {isHovering ? (
            <p className="free-play__hint-text">
              Jump right in! Hit the letter keys shown on the drum (or click
              them) to play.
            </p>
          ) : (
            <div className="free-play__hint-line" />
          )}
        </div>
      </div>

      <div className="free-play__drum">
        <TongueDrum />
      </div>

      <div className="free-play__footer">Copyright © 2026 Wenxin Li</div>
    </div>
  );
};

export default FreePlayPanel;
