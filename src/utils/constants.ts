export const TONE_CATEGORIES = {
  'energetic-happy': {
    label: 'Energetic & Happy',
    color: '#F59E0B',
    description: 'High energy with positive vibes, perfect for workouts and parties',
    emoji: '⚡',
  },
  'melancholic-slow': {
    label: 'Melancholic & Slow',
    color: '#3B82F6',
    description: 'Slow tempo with emotional depth, ideal for reflection',
    emoji: '🌧️',
  },
  'aggressive-intense': {
    label: 'Aggressive & Intense',
    color: '#EF4444',
    description: 'Powerful and intense, great for motivation and energy',
    emoji: '🔥',
  },
  'calm-peaceful': {
    label: 'Calm & Peaceful',
    color: '#10B981',
    description: 'Soothing and tranquil, perfect for relaxation',
    emoji: '🌿',
  },
  'romantic-emotional': {
    label: 'Romantic & Emotional',
    color: '#EC4899',
    description: 'Heartfelt and passionate, ideal for intimate moments',
    emoji: '💕',
  },
  'uplifting-motivational': {
    label: 'Uplifting & Motivational',
    color: '#8B5CF6',
    description: 'Inspiring and empowering, great for productivity',
    emoji: '🚀',
  },
  'dark-mysterious': {
    label: 'Dark & Mysterious',
    color: '#6366F1',
    description: 'Enigmatic and atmospheric, perfect for deep focus',
    emoji: '🌙',
  },
  'nostalgic-reflective': {
    label: 'Nostalgic & Reflective',
    color: '#14B8A6',
    description: 'Thoughtful and reminiscent, ideal for contemplation',
    emoji: '✨',
  },
} as const;

export const SUPPORTED_PLATFORMS = [
  {
    name: 'YouTube Music',
    domain: 'youtube.com',
    color: '#FF0000',
    icon: 'FaYoutube',
  },
] as const;

export const AUDIO_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FORMATS: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a'],
  SAMPLE_RATE: 44100,
  BPM_RANGE: { min: 40, max: 200 },
} as const;

export const ANIMATION_CONFIG = {
  PAGE_TRANSITION: { duration: 0.3 },
  CARD_HOVER: { scale: 1.05, duration: 0.2 },
  FADE_IN: { duration: 0.5 },
  STAGGER_CHILDREN: { staggerChildren: 0.1 },
} as const;

export const API_CONFIG = {
  CACHE_DURATION: 15 * 60 * 1000, // 15 minutes
  REQUEST_TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
} as const;
