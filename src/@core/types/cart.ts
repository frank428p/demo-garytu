import type { Prompt } from './prompt';

export type CartItem = {
  id: string;
  item_type: string;
  quantity: number;
  created_at: string;
  item: Prompt;
};
