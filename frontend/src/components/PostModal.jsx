import { useEffect } from "react";
import PostImage from "./PostImage";

export default function PostModal({ post, currentTag, busy, error, onClose, onTagClick }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const author = post.author || "user";

  return (
    <div className="backdrop" onClick={onClose}>
      <button className="close-btn" onClick={onClose} aria-label="Close post">
        ✕
      </button>

      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Post"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-image">
          <PostImage src={post.imageUrl} alt={`Post by ${author}`} />
        </div>

        <div className="modal-side">
          <div className="post-head">
            <span className="avatar">{author[0].toUpperCase()}</span>
            <span className="post-author">{author}</span>
          </div>

          <div className="caption-area">
            <p className="caption">
              <span className="cap-author">{author}</span>
              {post.tags.map((tag) => (
                <button
                  key={tag}
                  className={`tag ${tag === currentTag ? "tag-current" : ""}`}
                  disabled={busy}
                  onClick={() => onTagClick(tag)}
                >
                  #{tag}
                </button>
              ))}
            </p>
            {busy && <p className="muted">Loading…</p>}
            {error && <p className="error">{error}</p>}
          </div>

          {/* decorative icons, they don't do anything */}
          <div className="post-actions" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            <svg className="spacer" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
