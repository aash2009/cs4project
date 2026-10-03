import PostImage from "./PostImage";

export default function PostCard({ post, onOpen }) {
  return (
    <button
      className="post-card"
      onClick={() => onOpen(post.id)}
      aria-label={`Open post ${post.id}`}
    >
      <PostImage src={post.imageUrl} alt={`Post ${post.id}`} />
    </button>
  );
}
