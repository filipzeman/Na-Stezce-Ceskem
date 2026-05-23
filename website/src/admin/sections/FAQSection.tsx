import { useEffect, useMemo, useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";

import FAQList from "../components/faq/FAQList";
import FAQEditorModal from "../components/faq/FAQEditorModal";

import {
  getFaqItems,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../services/faqService";

import type { FaqItem } from "../../types/faq";

function groupByCategory(items: FaqItem[]) {
  return items.reduce<Record<string, FaqItem[]>>(
    (acc, item) => {
      const key = item.category || "Ostatní";

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);

      return acc;
    },
    {}
  );
}

export default function FAQSection() {
  const [items, setItems] = useState<FaqItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState<FaqItem | null>(null);

  async function loadItems() {
    try {
      setLoading(true);

      const data = await getFaqItems();

      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  const groupedItems = useMemo(
    () => groupByCategory(items),
    [items]
  );

  function handleCreate() {
    setEditingItem(null);

    setModalOpen(true);
  }

  function handleEdit(item: FaqItem) {
    setEditingItem(item);

    setModalOpen(true);
  }

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Opravdu smazat FAQ?"
    );

    if (!confirmed) return;

    try {
      await deleteFaq(id);

      await loadItems();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave(
    values: Partial<FaqItem>
  ) {
    try {
      if (editingItem) {
        await updateFaq(editingItem.id, values);
      } else {
        await createFaq(values);
      }

      setModalOpen(false);

      await loadItems();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Card>
        <div className="section-toolbar">
          <Button onClick={handleCreate}>
            Přidat FAQ
          </Button>
        </div>

        {loading ? (
          <p>Načítám…</p>
        ) : (
          <FAQList
            groupedItems={groupedItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <FAQEditorModal
        open={modalOpen}
        item={editingItem}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}