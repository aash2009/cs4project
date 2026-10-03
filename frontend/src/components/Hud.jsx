import { formatTime } from "../lib/format";

export default function Hud({ levels, levelIndex, target, elapsedMs, clicks, busy, onRestart }) {
  return (
    <header className="hud">
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

      <ol className="trail">
        {levels.map((lvl, i) => (
          <li
            key={lvl}
            className={i < levelIndex ? "done" : i === levelIndex ? "active" : ""}
          >
            #{lvl}
          </li>
        ))}
      </ol>
    </header>
  );
}
