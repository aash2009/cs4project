import { useState } from "react";

export default function PostImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="img-placeholder" role="img" aria-label={alt}>
        <span>image goes here</span>
        <small>{src}</small>
      </div>
    );
  }
  return (
    <img
      className="post-img"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
