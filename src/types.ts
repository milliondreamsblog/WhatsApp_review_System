export type TabType = 'reviews' | 'analytics';

export interface Review {
  id: string;
  contact_number: string;
  user_name: string;
  product_name: string;
  product_review: string;
  rating?: number;
  sentiment?: string;
  created_at: string;
}
