import FAQCategory from "./FAQCategory";

import type { FaqItem } from "../../../types/faq";

interface FAQListProps {
  groupedItems: Record<string, FaqItem[]>;

  onEdit: (item: FaqItem) => void;

  onDelete: (id: string) => void;
}

export default function FAQList({
  groupedItems,
  onEdit,
  onDelete,
}: FAQListProps) {
  return (
    <div className="faq-list">
      {Object.entries(groupedItems).map(
        ([category, items]) => (
          <FAQCategory
            key={category}
            category={category}
            items={items}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
}