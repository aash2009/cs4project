import { useCallback, useEffect, useRef, useState } from "react";
import { getHashtagPage } from "../api/gameApi";
import { LEVELS, START_TAG, TARGET_TAG } from "../config";

export function useGame() {
  const [status, setStatus] = useState("idle"); // idle | playing | won
  const [page, setPage] = useState(null);
  const [levelIndex, setLevelIndex] = useState(0);
  const [openPostId, setOpenPostId] = useState(null);
  const [clicks, setClicks] = useState(0);
  const [path, setPath] = useState([]);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const startedAt = useRef(0);

  // Timer
  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => {
      setElapsedMs(performance.now() - startedAt.current);
    }, 100);
    return () => clearInterval(id);
  }, [status]);

  // Start (or restart) a run
  const start = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const first = await getHashtagPage(START_TAG);
      setPage(first);
      setLevelIndex(0);
      setPath([first.tag]);
      setClicks(0);
      setOpenPostId(null);
      setElapsedMs(0);
      startedAt.current = performance.now();
      setStatus("playing");
    } catch (err) {
      setError(err.message || "Could not start the run.");
    } finally {
      setBusy(false);
    }
  }, []);

  const openPostById = useCallback((id) => setOpenPostId(id), []);
  const closePost = useCallback(() => setOpenPostId(null), []);

  // Click a hashtag inside an open post
  const selectTag = useCallback(
    async (tag) => {
      if (busy || status !== "playing" || !page || openPostId === null) return;
      if (tag === page.tag) return;

      setBusy(true);
      setError(null);
      try {
        const next = await getHashtagPage(tag);

        // Level pages move the progress trail; dud pages leave it alone
        const idx = LEVELS.indexOf(next.tag);
        if (idx !== -1) setLevelIndex(idx);

        setClicks((c) => c + 1);
        setPath((p) => [...p, next.tag]);
        setPage(next);
        setOpenPostId(null);

        // Win check
        if (next.tag === TARGET_TAG) {
          setElapsedMs(performance.now() - startedAt.current);
          setStatus("won");
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setBusy(false);
      }
    },
    [busy, status, page, openPostId]
  );

  const openPost = page?.posts.find((p) => p.id === openPostId) ?? null;

  return {
    status,
    page,
    levelIndex,
    openPost,
    clicks,
    path,
    elapsedMs,
    busy,
    error,
    start,
    restart: start,
    selectTag,
    openPostById,
    closePost,
  };
}
