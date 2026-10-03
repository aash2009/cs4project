import { ApiError, BASE_URL, request } from "./client";

const postCache = new Map();

export function imageUrl(imageId) {
  // The backend appends ".png" itself
  return `${BASE_URL}/image/${encodeURIComponent(imageId)}`;
}

// Normalizes a backend post into the shape the UI uses.
async function getPost(id, signal) {
  const key = String(id);
  if (postCache.has(key)) return postCache.get(key);

  const raw = await request(`/post/${encodeURIComponent(key)}`, { signal });
  // The backend returns 200 with { error } for unknown ids
  if (!raw || raw.error) {
    throw new ApiError(raw?.error ?? "Post not found", 404, raw);
  }

  const post = {
    id: String(raw.id), // string so id 0 is never falsy
    author: raw.author,
    imageUrl: imageUrl(raw.image_id),
    tags: raw.hashtags ?? [],
  };
  postCache.set(key, post);
  return post;
}

/**
 * Loads a hashtag page: GET /hashtag/:tag, then GET /post/:id for each id.
 * Returns { tag, posts }. Unknown hashtags come back as an empty posts array.
 */
export async function getHashtagPage(tag, signal) {
  const data = await request(`/hashtag/${encodeURIComponent(tag)}`, { signal });
  const ids = data?.postids ?? [];
  const posts = await Promise.all(ids.map((id) => getPost(id, signal)));
  return { tag: data?.hashtag ?? tag, posts };
}
