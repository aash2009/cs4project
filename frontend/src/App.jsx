import { useGame } from "./hooks/useGame";
import Hud from "./components/Hud";
import PostCard from "./components/PostCard";
import PostModal from "./components/PostModal";
import StartScreen from "./components/StartScreen";
import WinScreen from "./components/WinScreen";

export default function App() {
  const game = useGame();

  if (game.status === "idle") {
    return <StartScreen onStart={game.start} busy={game.busy} error={game.error} />;
  }

  if (game.status === "won") {
    return (
      <WinScreen
        elapsedMs={game.elapsedMs}
        clicks={game.clicks}
        path={game.path}
        onRestart={game.reset}
      />
    );
  }

  const { page } = game;
  const isDud = page.kind === "dud";

  return (
    <div className="app">
      <Hud
        levels={game.levels}
        levelIndex={game.levelIndex}
        target={game.target}
        elapsedMs={game.elapsedMs}
        clicks={game.clicks}
      />

      <main className="page">
        <div className="page-head">
          <h1>#{page.tag}</h1>
          <p>
            {page.posts.length} {page.posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        <section className={`grid ${isDud ? "grid-single" : ""}`}>
          {page.posts.map((post) => (
            <PostCard key={post.id} post={post} onOpen={game.openPostById} />
          ))}
        </section>

        {game.error && <p className="error">{game.error}</p>}
      </main>

      {game.openPost && (
        <PostModal
          post={game.openPost}
          currentTag={page.tag}
          busy={game.busy}
          onClose={game.closePost}
          onTagClick={game.selectTag}
        />
      )}
    </div>
  );
}
