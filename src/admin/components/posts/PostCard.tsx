import { Trash2, Pencil } from "lucide-react";

import Button from "../../ui/Button";

import type { Post } from "../../../types/post";

interface PostCardProps {
  post: Post;

  onEdit: (post: Post) => void;

  onDelete: (id: string) => void;
}

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  return (
    <article className="post-item">
      <div className="post-item-main">
        <h3>{post.title}</h3>

        {post.excerpt && <p>{post.excerpt}</p>}

        {!post.is_published && <span className="faq-draft">Nepublikováno</span>}
      </div>

      <div className="post-item-actions">
        <Button variant="secondary" onClick={() => onEdit(post)}>
          <Pencil size={18} />
          <span className="sr-only">Upravit</span>
        </Button>

        <Button variant="danger" onClick={() => onDelete(post.id)}>
          <Trash2 size={18} />
          <span className="sr-only">Smazat</span>
        </Button>
      </div>
    </article>
  );
}
