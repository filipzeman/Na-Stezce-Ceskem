import FAQItemCard from "./FAQItemCard";

import type { FaqItem } from "../../../types/faq";

interface FAQCategoryProps {
  category: string;

  items: FaqItem[];

  onEdit: (item: FaqItem) => void;

  onDelete: (id: string) => void;
}

export default function FAQCategory({
  category,
  items,
  onEdit,
  onDelete,
}: FAQCategoryProps) {
  return (
    <section className="faq-category">
      <h2 className="faq-category-title">
        {category}
      </h2>

      <div className="faq-category-items">
        {items.map((item) => (
          <FAQItemCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}