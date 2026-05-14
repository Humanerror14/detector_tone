import axios from 'axios';
import { Song, AnalysisResult, ToneCategory } from '@/types';
import { audioAnalyzer } from '@/utils/audioAnalyzer';
import { lyricsAnalyzer } from '@/utils/lyricsAnalyzer';
import { classifyTone } from '@/utils/toneClassifier';

const ANALYSIS_API_URL = import.meta.env.VITE_ANALYSIS_API_URL || 'http://localhost:8000';

type BackendAnalysisResponse = Omit<AnalysisResult, 'analyzedAt'>;

export class AnalysisService {
  async analyzeSong(song: Song, audioFile?: File): Promise<AnalysisResult> {
    try {
      if (song.platform === 'youtube') {
        return this.withAnalyzedAt(await this.analyzeYouTube(song), song);
      }

      if (audioFile) {
        try {
          return this.withAnalyzedAt(await this.analyzeUpload(audioFile), song);
        } catch (error) {
          return await this.analyzeUploadLocally(song, audioFile);
        }
      }

      throw new Error('Unsupported analysis source');
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error('Failed to analyze song');
    }
  }

  private async analyzeYouTube(song: Song): Promise<BackendAnalysisResponse> {
    const response = await axios.post(`${ANALYSIS_API_URL}/analyze/youtube`, { song });
    return response.data;
  }

  private async analyzeUpload(file: File): Promise<BackendAnalysisResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${ANALYSIS_API_URL}/analyze/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  private async analyzeUploadLocally(song: Song, audioFile: File): Promise<AnalysisResult> {
    const tempoAnalysis = await audioAnalyzer.analyzeAudioFile(audioFile);
    const lyricsAnalysis = lyricsAnalyzer.analyzeLyrics('');
    const { primaryTone, secondaryTones, confidence } = classifyTone(tempoAnalysis, lyricsAnalysis);

    return {
      song,
      analysis: {
        primaryTone,
        secondaryTones,
        confidence,
        tempo: tempoAnalysis,
        lyrics: lyricsAnalysis,
        emotions: this.buildEmotionBreakdown(primaryTone, tempoAnalysis.energyLevel),
        musicalCharacteristics: {
          key: 'C Major',
          mode: 'major',
          timeSignature: '4/4',
          loudness: -5,
          acousticness: 0.3,
          instrumentalness: 0.1,
          danceability: 0.7,
        },
      },
      similarSongs: [],
      analyzedAt: new Date(),
    };
  }

  private withAnalyzedAt(result: BackendAnalysisResponse, song?: Song): AnalysisResult {
    return {
      ...result,
      song: song?.previewUrl ? { ...result.song, previewUrl: song.previewUrl } : result.song,
      analyzedAt: new Date(),
    };
  }

  private buildEmotionBreakdown(primaryTone: ToneCategory, energyLevel: number) {
    const emotions = {
      happy: 20,
      sad: 20,
      angry: 20,
      calm: 20,
      energetic: energyLevel,
      romantic: 20,
      melancholic: 20,
      mysterious: 20,
    };

    if (primaryTone === 'energetic-happy') emotions.happy = 80;
    if (primaryTone === 'melancholic-slow') emotions.melancholic = 80;
    if (primaryTone === 'aggressive-intense') emotions.angry = 80;
    if (primaryTone === 'calm-peaceful') emotions.calm = 80;
    if (primaryTone === 'romantic-emotional') emotions.romantic = 80;
    if (primaryTone === 'dark-mysterious') emotions.mysterious = 80;

    return emotions;
  }
}

export const analysisService = new AnalysisService();
