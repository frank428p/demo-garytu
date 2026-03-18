import { MediaType } from './index';

export type Prompt = {
  uuid: string;
  name: string;
  description: string;
  price: number;
  enabled: boolean;
  created_at: string;
  files: Array<{
    file_type: MediaType;
    position: number;
    url: string;
    created_at: string;
  }>;
};

export type PromptsListParams = {
  page?: number;
  page_size?: number;
  search?: string;
};
