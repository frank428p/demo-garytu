import { MediaType } from './index';

export type PromptFile = {
  uuid: string;
  category: string;
  file_type: MediaType;
  position: number;
  url: string;
  thumbnail_url: string;
  created_at: string;
};

export type PromptUserState = {
  is_favorite: boolean;
  purchased: boolean;
};

export type Prompt = {
  uuid: string;
  media_type: MediaType;
  name: string;
  description: string;
  price: number;
  enabled: boolean;
  created_at: string;
  files: Array<PromptFile>;
  bonus_credit: number;
  user_state: PromptUserState;
  cover: PromptFile;
  pdf: PromptFile;
};

export type PromptsPaginationParams = {
  page?: number;
  page_size?: number;
};

export type PromptsListParams = PromptsPaginationParams & {
  search?: string;
  media_type?: MediaType;
  category?: string;
};

export type FeaturedPromptsParams = PromptsPaginationParams & {
  search?: string;
  media_type?: string;
  category?: string;
  all?: boolean;
};
