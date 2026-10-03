import { useGame } from "./hooks/useGame";
import { LEVELS, TARGET_TAG } from "./config";
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
        onRestart={game.restart}
      />
    );
  }

  const { page } = game;
  const isDud = !LEVELS.includes(page.tag);

  return (
    <div className="app">
      <Hud
        levels={LEVELS}
        levelIndex={game.levelIndex}
        target={TARGET_TAG}
        elapsedMs={game.elapsedMs}
        clicks={game.clicks}
        busy={game.busy}
        onRestart={game.restart}
      />

      <main className="page">
        <div className="page-head">
          <h1>#{page.tag}</h1>
          <p>
            {page.posts.length} {page.posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {page.posts.length === 0 ? (
          <p className="empty">No posts under #{page.tag}. Hit Restart to try again.</p>
        ) : (
          <section className={`grid ${isDud ? "grid-single" : ""}`}>
            {page.posts.map((post) => (
              <PostCard key={post.id} post={post} onOpen={game.openPostById} />
            ))}
          </section>
        )}
      </main>

      {game.openPost && (
        <PostModal
          post={game.openPost}
          currentTag={page.tag}
          busy={game.busy}
          error={game.error}
          onClose={game.closePost}
          onTagClick={game.selectTag}
        />
      )}
    </div>
  );
}
