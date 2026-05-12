import { PromptFile } from './prompt';

export type MediaType = 'IMAGE' | 'VIDEO';
export type FileType = 'PDF' | 'ZIP' | 'IMAGE' | 'VIDEO';

export type AspectRatioType = '1:1' | '16:9' | '9:16' | '21:9';

export type Tag = {
  code: string;
  name: string;
};

export type PromptLabel = Tag;
export type PromptCategory = Tag;

export type CustomEffectSelectorType = 'STYLE' | 'MOVEMENT' | 'MOTION';

export type CustomEffectSelector = {
  uuid: string;
  name: string;
  position: number;
  selector_type: CustomEffectSelectorType;
  cover: PromptFile;
};

export type WebConfig = {
  prompt_labels: PromptLabel[];
  prompt_categories: PromptCategory[];
  video_selectors: CustomEffectSelector[];
};
