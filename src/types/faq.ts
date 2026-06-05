export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  order_index?: number | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
