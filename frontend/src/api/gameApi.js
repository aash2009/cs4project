import { request } from "./client";
import * as mock from "./mockBackend";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

/**
 * BACKEND CONTRACT (used when VITE_USE_MOCK=false)
 *
 * POST /runs
 *   -> { runId, levels: string[], target: string, page: Page }
 *
 * GET  /hashtags/:tag
 *   -> Page
 *
 * POST /runs/:runId/navigate
 *   body: { fromTag, postId, clickedTag }
 *   -> { type: "advance" | "dud" | "main" | "same" | "win", page: Page }
 *
 * POST /runs/:runId/finish
 *   body: { clicks, elapsedMs, path }
 *   -> { ok: true }
 *
 * Page = {
 *   tag: string,                  // without "#"
 *   level: string,                // the level hashtag this page belongs to
 *   kind: "level" | "dud",
 *   posts: [{ id: string, imageUrl: string, tags: string[] }]  // 3 tags each
 * }
 */

export function startRun(signal) {
  if (USE_MOCK) return mock.startRun();
  return request("/runs", { method: "POST", signal });
}

export function getHashtag(tag, signal) {
  if (USE_MOCK) return mock.getHashtag(tag);
  return request(`/hashtags/${encodeURIComponent(tag)}`, { signal });
}

export function navigate(runId, { fromTag, postId, clickedTag }, signal) {
  if (USE_MOCK) return mock.navigate({ fromTag, postId, clickedTag });
  return request(`/runs/${encodeURIComponent(runId)}/navigate`, {
    method: "POST",
    body: { fromTag, postId, clickedTag },
    signal,
  });
}

export function finishRun(runId, payload, signal) {
  if (USE_MOCK) return mock.finishRun();
  return request(`/runs/${encodeURIComponent(runId)}/finish`, {
    method: "POST",
    body: payload,
    signal,
  });
}
