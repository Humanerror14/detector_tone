import { TempoAnalysis } from '@/types';

type WindowWithWebkitAudioContext = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

export class AudioAnalyzer {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const audioWindow = window as WindowWithWebkitAudioContext;
      const AudioContextConstructor = audioWindow.AudioContext || audioWindow.webkitAudioContext;
      if (AudioContextConstructor) {
        this.audioContext = new AudioContextConstructor();
      }
    }
  }

  async analyzeAudioFile(file: File): Promise<TempoAnalysis> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);

      const bpm = await this.detectBPM(audioBuffer);
      const energyLevel = this.calculateEnergy(audioBuffer);
      const consistency = this.calculateConsistency(audioBuffer);

      return {
        bpm,
        tempoCategory: this.getTempoCategory(bpm),
        rhythmPattern: this.detectRhythmPattern(audioBuffer),
        energyLevel,
        consistency,
      };
    } catch (error) {
      console.error('Audio analysis error:', error);
      throw new Error('Failed to analyze audio file');
    }
  }

  async analyzeAudioUrl(url: string): Promise<TempoAnalysis> {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);

      const bpm = await this.detectBPM(audioBuffer);
      const energyLevel = this.calculateEnergy(audioBuffer);
      const consistency = this.calculateConsistency(audioBuffer);

      return {
        bpm,
        tempoCategory: this.getTempoCategory(bpm),
        rhythmPattern: this.detectRhythmPattern(audioBuffer),
        energyLevel,
        consistency,
      };
    } catch (error) {
      console.error('Audio URL analysis error:', error);
      throw new Error('Failed to analyze audio from URL');
    }
  }

  private async detectBPM(audioBuffer: AudioBuffer): Promise<number> {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;

    // Simple peak detection algorithm
    const peaks = this.findPeaks(channelData, sampleRate);

    if (peaks.length < 2) {
      return 120; // Default BPM if detection fails
    }

    // Calculate intervals between peaks
    const intervals: number[] = [];
    for (let i = 1; i < peaks.length; i++) {
      intervals.push(peaks[i] - peaks[i - 1]);
    }

    // Find median interval
    intervals.sort((a, b) => a - b);
    const medianInterval = intervals[Math.floor(intervals.length / 2)];

    // Convert to BPM
    const bpm = Math.round(60 / medianInterval);

    // Clamp to reasonable range
    return Math.max(40, Math.min(200, bpm));
  }

  private findPeaks(data: Float32Array, sampleRate: number): number[] {
    const peaks: number[] = [];
    const threshold = 0.5;
    const minDistance = Math.floor(sampleRate * 0.3); // Minimum 0.3s between peaks

    let lastPeak = -minDistance;

    for (let i = 1; i < data.length - 1; i++) {
      const current = Math.abs(data[i]);
      const prev = Math.abs(data[i - 1]);
      const next = Math.abs(data[i + 1]);

      if (current > threshold && current > prev && current > next) {
        if (i - lastPeak >= minDistance) {
          peaks.push(i / sampleRate);
          lastPeak = i;
        }
      }
    }

    return peaks;
  }

  private calculateEnergy(audioBuffer: AudioBuffer): number {
    const channelData = audioBuffer.getChannelData(0);
    let sum = 0;

    for (let i = 0; i < channelData.length; i++) {
      sum += channelData[i] * channelData[i];
    }

    const rms = Math.sqrt(sum / channelData.length);
    return Math.min(100, rms * 1000); // Scale to 0-100
  }

  private calculateConsistency(audioBuffer: AudioBuffer): number {
    // Simplified consistency calculation
    const channelData = audioBuffer.getChannelData(0);
    const chunkSize = Math.floor(channelData.length / 10);
    const energies: number[] = [];

    for (let i = 0; i < 10; i++) {
      let sum = 0;
      const start = i * chunkSize;
      const end = start + chunkSize;

      for (let j = start; j < end && j < channelData.length; j++) {
        sum += channelData[j] * channelData[j];
      }

      energies.push(Math.sqrt(sum / chunkSize));
    }

    // Calculate variance
    const mean = energies.reduce((a, b) => a + b) / energies.length;
    const variance = energies.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / energies.length;

    // Lower variance = higher consistency
    return Math.max(0, 100 - variance * 1000);
  }

  private detectRhythmPattern(audioBuffer: AudioBuffer): string {
    const duration = audioBuffer.duration;

    if (duration > 240) return 'Slow and steady';
    if (duration > 180) return 'Moderate groove';
    if (duration > 120) return 'Upbeat rhythm';
    if (duration > 60) return 'Fast-paced';
    return 'Very fast tempo';
  }

  private getTempoCategory(bpm: number): 'very-slow' | 'slow' | 'moderate' | 'fast' | 'very-fast' {
    if (bpm < 60) return 'very-slow';
    if (bpm < 90) return 'slow';
    if (bpm < 120) return 'moderate';
    if (bpm < 140) return 'fast';
    return 'very-fast';
  }

  cleanup() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

export const audioAnalyzer = new AudioAnalyzer();
