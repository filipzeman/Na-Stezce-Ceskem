import Button from "../../ui/Button";

import type { Post } from "../../../types/post";

interface PostCardProps {
  post: Post;

  onEdit: (post: Post) => void;

  onDelete: (id: string) => void;
}

export default function PostCard({
  post,
  onEdit,
  onDelete,
}: PostCardProps) {
  return (
    <article className="post-item">
      <div className="post-item-main">
        <h3>{post.title}</h3>

        {post.excerpt && (
          <p>{post.excerpt}</p>
        )}

        {!post.is_published && (
          <span className="faq-draft">
            Nepublikováno
          </span>
        )}
      </div>

      <div className="post-item-actions">
        <Button
          variant="secondary"
          onClick={() => onEdit(post)}
        >
          Upravit
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            onDelete(post.id)
          }
        >
          Smazat
        </Button>
      </div>
    </article>
  );
}