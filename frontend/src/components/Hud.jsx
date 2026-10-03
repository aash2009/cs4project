import { formatTime } from "../lib/format";

export default function Hud({ levels, levelIndex, target, elapsedMs, clicks, busy, onRestart }) {
  return (
    <header className="hud">
      <div className="hud-bar">
        <span className="brand">#speedrun</span>

        <div className="hud-stats">
          <div className="stat">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(elapsedMs)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Clicks</span>
            <span className="stat-value">{clicks}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Target</span>
            <span className="stat-value">#{target}</span>
          </div>
          <button className="ghost-btn" onClick={onRestart} disabled={busy}>
            Restart
          </button>
        </div>
      </div>

      <ol className="trail">
        {levels.map((lvl, i) => {
          const state = i < levelIndex ? "done" : i === levelIndex ? "active" : "";
          return (
            <li key={lvl} className={state}>
              <span className="ring">
                <span className="dot">{i < levelIndex ? "✓" : i + 1}</span>
              </span>
              <span className="label">#{lvl}</span>
            </li>
          );
        })}
      </ol>
    </header>
  );
}
