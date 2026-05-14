import { create } from 'zustand';
import { AnalysisResult, Song } from '@/types';

interface AppState {
  currentSong: Song | null;
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
  analysisHistory: AnalysisResult[];
  error: string | null;

  // Actions
  setCurrentSong: (song: Song | null) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  addToHistory: (result: AnalysisResult) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentSong: null,
  analysisResult: null,
  isAnalyzing: false,
  analysisHistory: [],
  error: null,

  setCurrentSong: (song) => set({ currentSong: song }),

  setAnalysisResult: (result) => set({ analysisResult: result }),

  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),

  addToHistory: (result) => set((state) => ({
    analysisHistory: [result, ...state.analysisHistory].slice(0, 10), // Keep last 10
  })),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),
}));
