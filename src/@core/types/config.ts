type Tag = {
  code: string;
  name: string;
};

export type PromptLabel = Tag;
export type PromptCategory = Tag;

export type WebConfig = {
  prompt_labels: PromptLabel[];
  prompt_categories: PromptCategory[];
};

// ─── Kling AI Model Config ────────────────────────────────────────────────────
export type AspectRatio = '16:9' | '9:16' | '1:1';
export type KlingMode = 'std' | 'pro' | 'master';
export type CameraPreset =
  | 'down_back'
  | 'forward_up'
  | 'right_turn_forward'
  | 'left_turn_forward';
export type CameraMovementType =
  | 'horizontal'
  | 'vertical'
  | 'pan'
  | 'tilt'
  | 'roll'
  | 'zoom';

export interface AdvancedCameraControl {
  movement_type: CameraMovementType;
  /** -10 to 10 */
  movement_value: number;
}

export interface CameraControl {
  type: 'preset' | 'advanced';
  preset?: CameraPreset;
  advanced?: AdvancedCameraControl;
}

// ─── Model & API types ────────────────────────────────────────────────────────

export type KlingModelName =
  | 'kling-v1'
  | 'kling-v1.6'
  | 'kling-v1.6-elements'
  | 'kling-v2'
  | 'kling-v2.1'
  | 'kling-v2.5-turbo'
  | 'kling-v2.6'
  | 'kling-v3'
  | 'kling-v3-omni';

export type KlingApiType =
  | 'text-to-video'
  | 'image-to-video'
  | 'multi-image-to-video'
  | 'omni-video';

// ─── API Params ───────────────────────────────────────────────────────────────

export interface TextToVideoParams {
  /** Required. Max 2500 chars */
  prompt: string;
  /** Mode: std | pro | master */
  mode?: KlingMode;
  negative_prompt?: string;
  /** 0–1, default 0.5 */
  cfg_scale?: number;
  aspect_ratio?: AspectRatio;
  /** v1/v2: 5|10  /  v3: 3–10 (seconds) */
  duration?: number;
  /** v3 only */
  generate_audio?: boolean;
  /** v3 only */
  shot_type?: 'customize' | 'intelligent';
  /** v3 only: mutually exclusive with prompt */
  multi_prompt?: string[];
  /** v1/v2 only */
  camera_control?: CameraControl;
}

export interface ImageToVideoParams {
  /** Required. Start frame image URL or base64 */
  image_url: string;
  /** Mode: std | pro | master */
  mode?: KlingMode;
  /** End frame image URL */
  tail_image_url?: string;
  prompt?: string;
  negative_prompt?: string;
  /** 0–1, default 0.5 */
  cfg_scale?: number;
  duration?: number;
  /** v2.6 only */
  sound?: boolean;
  camera_control?: CameraControl;
}

export interface MultiImageToVideoParams {
  /** Required. Max 2500 chars */
  prompt: string;
  /** Required. 1–4 image URLs */
  image_urls: string[];
  /** Mode: std | pro */
  mode?: KlingMode;
  negative_prompt?: string;
  duration?: number;
  aspect_ratio?: AspectRatio;
  /** v3-omni only */
  enable_audio?: boolean;
}

export interface OmniVideoElement {
  reference_image_urls?: string[];
  frontal_image_url?: string;
}

export interface OmniVideoShot {
  /** Required. Describes this segment */
  prompt: string;
  /** 1–14 seconds (total across all shots ≤ 15s) */
  duration?: number;
}

export interface OmniVideoParams {
  /** Ignored when multi_shots is provided */
  prompt?: string;
  /** Max 6 shots. Mutually exclusive with prompt */
  multi_shots?: OmniVideoShot[];
  resolution?: '720p' | '1080p';
  /** 3–15 seconds, default 5 */
  duration?: number;
  aspect_ratio?: AspectRatio;
  enable_audio?: boolean;
  /** Start frame */
  image_url?: string;
  /** End frame */
  end_image_url?: string;
  /** Style reference images (referenced as @Image1, @Image2 …) */
  image_urls?: string[];
  /** Character/object consistency elements (referenced as @Element1 …) */
  elements?: OmniVideoElement[];
  negative_prompt?: string;
}

// ─── Model Config ─────────────────────────────────────────────────────────────

export interface KlingModeConfig {
  supportedApis: KlingApiType[];
}

export interface KlingModelConfig {
  model: KlingModelName;
  /** Available modes and their supported API types */
  modes: Partial<Record<KlingMode, KlingModeConfig>>;
  durations: number[];
  aspectRatios: AspectRatio[];
  maxPromptLength: number;
  // Capabilities (shared across all modes)
  supportsCameraControl: boolean;
  supportsAudio: boolean;
  supportsMultiShot: boolean;
  supportsEndFrame: boolean;
  // Image input (I2V / multi-I2V / omni)
  maxImageSizeMB?: number;
  supportedFormats?: string[];
  maxImages?: number;
  // Omni-video only
  resolutions?: ('720p' | '1080p')[];
  durationRange?: { min: number; max: number };
  shotDurationRange?: { min: number; max: number };
  maxShots?: number;
  maxStyleImages?: number;
  maxElements?: number;
  supportsStartFrame?: boolean;
}

// ─── Configs (keyed by model name) ───────────────────────────────────────────

export const KLING_CONFIGS: Record<KlingModelName, KlingModelConfig> = {
  'kling-v1': {
    model: 'kling-v1',
    modes: {
      std: { supportedApis: ['text-to-video', 'image-to-video'] },
      pro: { supportedApis: ['text-to-video', 'image-to-video'] },
    },
    durations: [5, 10],
    aspectRatios: ['16:9', '9:16', '1:1'],
    maxPromptLength: 2500,
    supportsCameraControl: true,
    supportsAudio: false,
    supportsMultiShot: false,
    supportsEndFrame: true,
    maxImageSizeMB: 10,
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  'kling-v1.6': {
    model: 'kling-v1.6',
    modes: {
      std: { supportedApis: ['text-to-video', 'image-to-video'] },
      pro: { supportedApis: ['text-to-video', 'image-to-video'] },
    },
    durations: [5, 10],
    aspectRatios: ['16:9', '9:16', '1:1'],
    maxPromptLength: 2500,
    supportsCameraControl: true,
    supportsAudio: false,
    supportsMultiShot: false,
    supportsEndFrame: true,
    maxImageSizeMB: 10,
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  'kling-v1.6-elements': {
    model: 'kling-v1.6-elements',
    modes: {
      std: { supportedApis: ['multi-image-to-video'] },
    },
    durations: [5, 10],
    aspectRatios: ['16:9', '9:16', '1:1'],
    maxPromptLength: 2500,
    supportsCameraControl: false,
    supportsAudio: false,
    supportsMultiShot: false,
    supportsEndFrame: false,
    maxImageSizeMB: 10,
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    maxImages: 4,
  },
  'kling-v2': {
    model: 'kling-v2',
    modes: {
      master: { supportedApis: ['text-to-video', 'image-to-video'] },
    },
    durations: [5, 10],
    aspectRatios: ['16:9', '9:16', '1:1'],
    maxPromptLength: 2500,
    supportsCameraControl: true,
    supportsAudio: false,
    supportsMultiShot: false,
    supportsEndFrame: true,
    maxImageSizeMB: 10,
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  'kling-v2.1': {
    model: 'kling-v2.1',
    modes: {
      master: { supportedApis: ['text-to-video', 'image-to-video'] },
      pro: { supportedApis: ['image-to-video'] },
    },
    durations: [5, 10],
    aspectRatios: ['16:9', '9:16', '1:1'],
    maxPromptLength: 2500,
    supportsCameraControl: true,
    supportsAudio: false,
    supportsMultiShot: false,
    supportsEndFrame: true,
    maxImageSizeMB: 10,
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  'kling-v2.5-turbo': {
    model: 'kling-v2.5-turbo',
    modes: {
      std: { supportedApis: ['image-to-video'] },
      pro: { supportedApis: ['text-to-video', 'image-to-video'] },
    },
    durations: [5, 10],
    aspectRatios: ['16:9', '9:16', '1:1'],
    maxPromptLength: 2500,
    supportsCameraControl: false,
    supportsAudio: false,
    supportsMultiShot: false,
    supportsEndFrame: true,
    maxImageSizeMB: 10,
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  'kling-v2.6': {
    model: 'kling-v2.6',
    modes: {
      std: { supportedApis: ['image-to-video'] },
    },
    durations: [5, 10],
    aspectRatios: ['16:9', '9:16', '1:1'],
    maxPromptLength: 2500,
    supportsCameraControl: true,
    supportsAudio: true,
    supportsMultiShot: false,
    supportsEndFrame: true,
    maxImageSizeMB: 10,
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
  },
  'kling-v3': {
    model: 'kling-v3',
    modes: {
      std: { supportedApis: ['text-to-video'] },
      pro: { supportedApis: ['text-to-video'] },
    },
    durations: [3, 4, 5, 6, 7, 8, 9, 10],
    aspectRatios: ['16:9', '9:16', '1:1'],
    maxPromptLength: 2500,
    supportsCameraControl: false,
    supportsAudio: true,
    supportsMultiShot: true,
    supportsEndFrame: false,
  },
  'kling-v3-omni': {
    model: 'kling-v3-omni',
    modes: {
      std: { supportedApis: ['multi-image-to-video', 'omni-video'] },
      pro: { supportedApis: ['multi-image-to-video', 'omni-video'] },
    },
    durations: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    aspectRatios: ['16:9', '9:16', '1:1'],
    maxPromptLength: 2500,
    supportsCameraControl: false,
    supportsAudio: true,
    supportsMultiShot: true,
    supportsEndFrame: true,
    maxImageSizeMB: 10,
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    maxImages: 4,
    resolutions: ['720p', '1080p'],
    durationRange: { min: 3, max: 15 },
    shotDurationRange: { min: 1, max: 14 },
    maxShots: 6,
    maxStyleImages: 4,
    maxElements: 3,
    supportsStartFrame: true,
  },
};
