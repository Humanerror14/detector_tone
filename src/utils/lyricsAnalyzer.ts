import nlp from 'compromise';
import { LyricsAnalysis } from '@/types';

export class LyricsAnalyzer {
  analyzeLyrics(lyrics: string): LyricsAnalysis {
    if (!lyrics || lyrics.trim().length === 0) {
      return {
        sentiment: 'neutral',
        sentimentScore: 0,
        emotions: [],
        keywords: [],
        themes: [],
        language: 'unknown',
        hasLyrics: false,
      };
    }

    const doc = nlp(lyrics);

    return {
      sentiment: this.detectSentiment(lyrics),
      sentimentScore: this.calculateSentimentScore(lyrics),
      emotions: this.detectEmotions(lyrics),
      keywords: this.extractKeywords(doc),
      themes: this.identifyThemes(lyrics),
      language: this.detectLanguage(lyrics),
      hasLyrics: true,
    };
  }

  private detectSentiment(lyrics: string): 'positive' | 'negative' | 'neutral' {
    const score = this.calculateSentimentScore(lyrics);
    if (score > 0.2) return 'positive';
    if (score < -0.2) return 'negative';
    return 'neutral';
  }

  private calculateSentimentScore(lyrics: string): number {
    const lowerLyrics = lyrics.toLowerCase();

    const positiveWords = [
      'love', 'happy', 'joy', 'beautiful', 'amazing', 'wonderful', 'great',
      'good', 'smile', 'laugh', 'hope', 'dream', 'light', 'bright', 'shine',
      'peace', 'heaven', 'angel', 'sweet', 'perfect', 'blessed', 'grateful',
      'celebrate', 'victory', 'win', 'success', 'freedom', 'alive', 'forever'
    ];

    const negativeWords = [
      'sad', 'pain', 'hurt', 'cry', 'tear', 'broken', 'alone', 'lonely',
      'dark', 'death', 'die', 'hate', 'angry', 'rage', 'fear', 'scared',
      'lost', 'empty', 'cold', 'nightmare', 'hell', 'devil', 'evil',
      'suffer', 'misery', 'sorrow', 'regret', 'mistake', 'wrong', 'end'
    ];

    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerLyrics.match(regex);
      if (matches) positiveCount += matches.length;
    });

    negativeWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerLyrics.match(regex);
      if (matches) negativeCount += matches.length;
    });

    const totalWords = lyrics.split(/\s+/).length;
    const score = (positiveCount - negativeCount) / Math.max(totalWords, 1);

    return Math.max(-1, Math.min(1, score * 10));
  }

  private detectEmotions(lyrics: string): string[] {
    const lowerLyrics = lyrics.toLowerCase();
    const emotions: string[] = [];

    const emotionPatterns = {
      happy: ['happy', 'joy', 'smile', 'laugh', 'celebrate', 'excited'],
      sad: ['sad', 'cry', 'tear', 'sorrow', 'misery', 'depressed'],
      angry: ['angry', 'rage', 'mad', 'furious', 'hate', 'fight'],
      calm: ['calm', 'peace', 'quiet', 'serene', 'tranquil', 'still'],
      energetic: ['energy', 'power', 'strong', 'alive', 'wild', 'fire'],
      romantic: ['love', 'heart', 'kiss', 'romance', 'passion', 'desire'],
      melancholic: ['lonely', 'alone', 'empty', 'lost', 'broken', 'cold'],
      mysterious: ['dark', 'shadow', 'secret', 'mystery', 'unknown', 'hidden'],
    };

    Object.entries(emotionPatterns).forEach(([emotion, patterns]) => {
      const hasEmotion = patterns.some(pattern =>
        new RegExp(`\\b${pattern}\\b`, 'i').test(lowerLyrics)
      );
      if (hasEmotion) emotions.push(emotion);
    });

    return emotions;
  }

  private extractKeywords(doc: { nouns(): { out(format: 'array'): string[] }; verbs(): { out(format: 'array'): string[] }; adjectives(): { out(format: 'array'): string[] } }): string[] {
    const nouns = doc.nouns().out('array');
    const verbs = doc.verbs().out('array');
    const adjectives = doc.adjectives().out('array');

    const allWords = [...nouns, ...verbs, ...adjectives];

    // Count frequency
    const frequency: Record<string, number> = {};
    allWords.forEach(word => {
      const lower = word.toLowerCase();
      frequency[lower] = (frequency[lower] || 0) + 1;
    });

    // Sort by frequency and take top 10
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  private identifyThemes(lyrics: string): string[] {
    const lowerLyrics = lyrics.toLowerCase();
    const themes: string[] = [];

    const themePatterns = {
      love: ['love', 'heart', 'romance', 'relationship', 'together', 'forever'],
      heartbreak: ['break', 'apart', 'goodbye', 'leave', 'lost', 'over'],
      motivation: ['fight', 'strong', 'rise', 'overcome', 'believe', 'achieve'],
      nostalgia: ['remember', 'memory', 'past', 'yesterday', 'used to', 'back then'],
      freedom: ['free', 'fly', 'escape', 'run', 'away', 'liberate'],
      party: ['party', 'dance', 'night', 'club', 'drink', 'celebrate'],
      spirituality: ['god', 'heaven', 'pray', 'soul', 'faith', 'believe'],
      nature: ['sky', 'sun', 'moon', 'star', 'ocean', 'mountain', 'rain'],
    };

    Object.entries(themePatterns).forEach(([theme, patterns]) => {
      const hasTheme = patterns.some(pattern =>
        new RegExp(`\\b${pattern}\\b`, 'i').test(lowerLyrics)
      );
      if (hasTheme) themes.push(theme);
    });

    return themes;
  }

  private detectLanguage(lyrics: string): string {
    // Simple language detection based on common words
    const englishWords = ['the', 'is', 'are', 'and', 'you', 'me', 'my', 'your'];
    const lowerLyrics = lyrics.toLowerCase();

    const englishCount = englishWords.filter(word =>
      new RegExp(`\\b${word}\\b`, 'i').test(lowerLyrics)
    ).length;

    if (englishCount >= 3) return 'en';
    return 'unknown';
  }
}

export const lyricsAnalyzer = new LyricsAnalyzer();
