import { Trash2, Pencil } from "lucide-react";

import Button from "../../ui/Button";

import type { FaqItem } from "../../../types/faq";

interface FAQItemCardProps {
  item: FaqItem;
  onEdit: (item: FaqItem) => void;
  onDelete: (id: string) => void;
}

export default function FAQItemCard({ item, onEdit, onDelete }: FAQItemCardProps) {
  return (
    <article className="faq-item">
      <div className="faq-item-main">
        <h3>{item.question}</h3>

        {!item.is_published && <span className="faq-draft">Nepublikováno</span>}
      </div>

      <div className="faq-item-actions">
        <Button variant="secondary" onClick={() => onEdit(item)}>
          <Pencil size={18} />
          <span className="sr-only">Upravit</span>
        </Button>

        <Button variant="danger" onClick={() => onDelete(item.id)}>
          <Trash2 size={18} />
          <span className="sr-only">Smazat</span>
        </Button>
      </div>
    </article>
  );
}
