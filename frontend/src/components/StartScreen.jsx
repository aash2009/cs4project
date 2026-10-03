export default function StartScreen({ onStart, busy, error }) {
  return (
    <main className="center-screen">
      <h1 className="logo">#speedrun</h1>
      <p className="lead">
        Start on <b>#funny</b>. Find the one hidden hashtag that gets you to
        the next level. Reach <b>#dilmelting</b> as fast as you can.
      </p>
      <button className="primary-btn" onClick={onStart} disabled={busy}>
        {busy ? "Loading…" : "Start run"}
      </button>
      {error && <p className="error">{error}</p>}
    </main>
  );
}
