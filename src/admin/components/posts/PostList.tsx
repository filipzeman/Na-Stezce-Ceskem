import PostCard from "./PostCard";

import type { Post } from "../../../types/post";

interface PostListProps {
  posts: Post[];

  onEdit: (post: Post) => void;

  onDelete: (id: string) => void;
}

export default function PostList({
  posts,
  onEdit,
  onDelete,
}: PostListProps) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}