import { formatTime } from "../lib/format";

export default function WinScreen({ elapsedMs, clicks, path, onRestart }) {
  return (
    <main className="center-screen">
      <h1 className="logo">You made it! 🎉</h1>
      <div className="win-stats">
        <div className="stat">
          <span className="stat-label">Time</span>
          <span className="stat-value">{formatTime(elapsedMs)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Clicks</span>
          <span className="stat-value">{clicks}</span>
        </div>
      </div>
      <p className="path">{path.map((t) => `#${t}`).join(" → ")}</p>
      <button className="primary-btn" onClick={onRestart}>
        Play again
      </button>
    </main>
  );
}
