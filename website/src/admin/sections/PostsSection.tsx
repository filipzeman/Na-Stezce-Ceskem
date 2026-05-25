import { useEffect, useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";

import PostList from "../components/posts/PostList";
import PostEditorModal from "../components/posts/PostEditorModal";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/postService";

import type { Post } from "../../types/post";

export default function PostsSection() {
  const [posts, setPosts] = useState<Post[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingPost, setEditingPost] =
    useState<Post | null>(null);

  async function loadPosts() {
    try {
      setLoading(true);

      const data = await getPosts();

      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function handleCreate() {
    setEditingPost(null);

    setModalOpen(true);
  }

  function handleEdit(post: Post) {
    setEditingPost(post);

    setModalOpen(true);
  }

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Opravdu smazat článek?"
    );

    if (!confirmed) return;

    try {
      await deletePost(id);

      await loadPosts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave(
    values: Partial<Post>
  ) {
    try {
      if (editingPost) {
        await updatePost(
          editingPost.id,
          values
        );
      } else {
        await createPost(values);
      }

      setModalOpen(false);

      await loadPosts();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Card>
        <div className="section-toolbar">
          <Button onClick={handleCreate}>
            Nový článek
          </Button>
        </div>

        {loading ? (
          <p>Načítám…</p>
        ) : (
          <PostList
            posts={posts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <PostEditorModal
        open={modalOpen}
        post={editingPost}
        onClose={() =>
          setModalOpen(false)
        }
        onSave={handleSave}
      />
    </>
  );
}