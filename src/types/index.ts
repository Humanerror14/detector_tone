export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  albumArt?: string;
  duration?: number;
  previewUrl?: string;
  platform?: 'youtube' | 'upload';
  url?: string;
}

export interface ToneAnalysis {
  primaryTone: ToneCategory;
  secondaryTones: ToneCategory[];
  confidence: number;
  analysisSource?: 'audio' | 'metadata';
  tempo: TempoAnalysis;
  lyrics: LyricsAnalysis;
  emotions: EmotionBreakdown;
  musicalCharacteristics: MusicalCharacteristics;
}

export type ToneCategory =
  | 'energetic-happy'
  | 'melancholic-slow'
  | 'aggressive-intense'
  | 'calm-peaceful'
  | 'romantic-emotional'
  | 'uplifting-motivational'
  | 'dark-mysterious'
  | 'nostalgic-reflective';

export interface TempoAnalysis {
  bpm: number;
  tempoCategory: 'very-slow' | 'slow' | 'moderate' | 'fast' | 'very-fast';
  rhythmPattern: string;
  energyLevel: number; // 0-100
  consistency: number; // 0-100
}

export interface LyricsAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number; // -1 to 1
  emotions: string[];
  keywords: string[];
  themes: string[];
  language: string;
  hasLyrics: boolean;
}

export interface EmotionBreakdown {
  happy: number;
  sad: number;
  angry: number;
  calm: number;
  energetic: number;
  romantic: number;
  melancholic: number;
  mysterious: number;
}

export interface MusicalCharacteristics {
  key?: string;
  mode?: 'major' | 'minor';
  timeSignature?: string;
  loudness?: number;
  acousticness?: number;
  instrumentalness?: number;
  danceability?: number;
}

export interface SimilarSong extends Song {
  similarity: number;
  matchingTones: ToneCategory[];
}

export interface AnalysisResult {
  song: Song;
  analysis: ToneAnalysis;
  similarSongs: SimilarSong[];
  analyzedAt: Date;
}

export interface InputMethod {
  type: 'search' | 'upload';
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}
