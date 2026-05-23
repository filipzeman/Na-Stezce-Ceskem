import Button from "../../ui/Button";

import type { FaqItem } from "../../../types/faq";

interface FAQItemCardProps {
  item: FaqItem;

  onEdit: (item: FaqItem) => void;

  onDelete: (id: string) => void;
}

export default function FAQItemCard({
  item,
  onEdit,
  onDelete,
}: FAQItemCardProps) {
  return (
    <article className="faq-item">
      <div className="faq-item-main">
        <h3>{item.question}</h3>

        {!item.is_published && (
          <span className="faq-draft">
            Nepublikováno
          </span>
        )}
      </div>

      <div className="faq-item-actions">
        <Button
          variant="secondary"
          onClick={() => onEdit(item)}
        >
          Upravit
        </Button>

        <Button
          variant="danger"
          onClick={() => onDelete(item.id)}
        >
          Smazat
        </Button>
      </div>
    </article>
  );
}