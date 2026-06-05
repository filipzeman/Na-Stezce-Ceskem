import { useEffect, useState } from "react";

import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

import type { FaqItem } from "../../../types/faq";

interface FAQEditorModalProps {
  open: boolean;

  item: FaqItem | null;

  onClose: () => void;

  onSave: (
    values: Partial<FaqItem>
  ) => Promise<void>;
}

export default function FAQEditorModal({
  open,
  item,
  onClose,
  onSave,
}: FAQEditorModalProps) {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [isPublished, setIsPublished] =
    useState(true);

  useEffect(() => {
    if (item) {
      setQuestion(item.question);
      setAnswer(item.answer);
      setCategory(item.category || "");
      setIsPublished(item.is_published);
    } else {
      setQuestion("");
      setAnswer("");
      setCategory("");
      setIsPublished(true);
    }
  }, [item, open]);

  async function handleSubmit() {
    await onSave({
      question,
      answer,
      category,
      is_published: isPublished,
    });
  }

  return (
    <Modal
      open={open}
      title={
        item ? "Upravit FAQ" : "Nové FAQ"
      }
      onClose={onClose}
    >
      <div className="faq-form">
        <Input
          label="Otázka"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
        />

        <div className="input-group">
          <label className="input-label">
            Odpověď
          </label>

          <textarea
            className="textarea"
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
          />
        </div>

        <Input
          label="Kategorie"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) =>
              setIsPublished(e.target.checked)
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