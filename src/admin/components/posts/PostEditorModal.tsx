import { useEffect, useState } from "react";

import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import type { Post } from "../../../types/post";

interface PostEditorModalProps {
  open: boolean;

  post: Post | null;

  onClose: () => void;

  onSave: (
    values: Partial<Post>
  ) => Promise<void>;
}

export default function PostEditorModal({
  open,
  post,
  onClose,
  onSave,
}: PostEditorModalProps) {
  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [excerpt, setExcerpt] =
    useState("");

  const [content, setContent] =
    useState("");

  const [coverImage, setCoverImage] =
    useState("");

  const [isPublished, setIsPublished] =
    useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt || "");
      setContent(post.content || "");
      setCoverImage(
        post.cover_image || ""
      );
      setIsPublished(
        post.is_published
      );
    } else {
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
      setIsPublished(false);
    }
  }, [post, open]);

  async function handleSubmit() {
    await onSave({
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage,
      is_published: isPublished,
    });
  }

  return (
    <Modal
      open={open}
      title={
        post
          ? "Upravit článek"
          : "Nový článek"
      }
      onClose={onClose}
    >
      <div className="post-form">
        <Input
          label="Název"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <Input
          label="Slug"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value)
          }
        />

        <Input
          label="Cover image"
          value={coverImage}
          onChange={(e) =>
            setCoverImage(
              e.target.value
            )
          }
        />

        <div className="input-group">
          <label className="input-label">
            Perex
          </label>

          <textarea
            className="textarea"
            value={excerpt}
            onChange={(e) =>
              setExcerpt(
                e.target.value
              )
            }
          />
        </div>

        <div className="input-group">
          <label className="input-label">
            Obsah (Markdown) | Pordporuje nadpisy, odkazy, seznamy ...
          </label>

          <textarea
            className="textarea textarea-content"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
          />
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) =>
              setIsPublished(
                e.target.checked
              )
            }
          />

          Publikováno
        </label>

        <div className="faq-form-actions">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Zrušit
          </Button>

          <Button onClick={handleSubmit}>
            Uložit
          </Button>
        </div>
      </div>
    </Modal>
  );
}