import { useEffect } from "react";
import PostImage from "./PostImage";

export default function PostModal({ post, currentTag, busy, onClose, onTagClick }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Post"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose} aria-label="Close post">
          ✕
        </button>

        <div className="modal-image">
          <PostImage src={post.imageUrl} alt={`Post ${post.id}`} />
        </div>

        <div className="modal-side">
          <div className="tag-list">
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
          </div>
        </div>
      </div>
    </div>
  );
}
