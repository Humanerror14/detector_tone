import { ToneCategory, TempoAnalysis, LyricsAnalysis } from '@/types';

export const classifyTone = (
  tempo: TempoAnalysis,
  lyrics: LyricsAnalysis
): { primaryTone: ToneCategory; secondaryTones: ToneCategory[]; confidence: number } => {
  const scores: Record<ToneCategory, number> = {
    'energetic-happy': 0,
    'melancholic-slow': 0,
    'aggressive-intense': 0,
    'calm-peaceful': 0,
    'romantic-emotional': 0,
    'uplifting-motivational': 0,
    'dark-mysterious': 0,
    'nostalgic-reflective': 0,
  };

  // Tempo-based scoring
  const bpm = tempo.bpm;
  const energy = tempo.energyLevel;

  // Very fast tempo (140+ BPM)
  if (bpm >= 140) {
    if (lyrics.sentiment === 'positive') {
      scores['energetic-happy'] += 40;
      scores['uplifting-motivational'] += 20;
    } else if (lyrics.sentiment === 'negative') {
      scores['aggressive-intense'] += 40;
      scores['dark-mysterious'] += 15;
    }
  }

  // Slow tempo (60-90 BPM)
  else if (bpm <= 90) {
    if (lyrics.sentiment === 'negative') {
      scores['melancholic-slow'] += 40;
      scores['nostalgic-reflective'] += 20;
    } else if (lyrics.sentiment === 'positive') {
      scores['calm-peaceful'] += 40;
      scores['romantic-emotional'] += 15;
    }
  }

  // Moderate tempo (90-140 BPM)
  else {
    if (lyrics.emotions.some(e => ['love', 'romantic', 'heart'].includes(e.toLowerCase()))) {
      scores['romantic-emotional'] += 35;
    }
    if (lyrics.themes.some(t => ['motivation', 'inspiration', 'hope'].includes(t.toLowerCase()))) {
      scores['uplifting-motivational'] += 35;
    }
    if (lyrics.sentiment === 'neutral' || lyrics.themes.some(t => ['memory', 'past'].includes(t.toLowerCase()))) {
      scores['nostalgic-reflective'] += 30;
    }
  }

  // Energy level adjustments
  if (energy > 70) {
    scores['energetic-happy'] += 15;
    scores['aggressive-intense'] += 10;
  } else if (energy < 30) {
    scores['calm-peaceful'] += 15;
    scores['melancholic-slow'] += 10;
  }

  // Sentiment-based scoring
  if (lyrics.sentimentScore > 0.5) {
    scores['energetic-happy'] += 20;
    scores['uplifting-motivational'] += 15;
  } else if (lyrics.sentimentScore < -0.5) {
    scores['melancholic-slow'] += 20;
    scores['dark-mysterious'] += 15;
  }

  // Emotion-based scoring
  lyrics.emotions.forEach(emotion => {
    const e = emotion.toLowerCase();
    if (['happy', 'joy', 'excited'].includes(e)) scores['energetic-happy'] += 10;
    if (['sad', 'depressed', 'lonely'].includes(e)) scores['melancholic-slow'] += 10;
    if (['angry', 'rage', 'furious'].includes(e)) scores['aggressive-intense'] += 10;
    if (['calm', 'peaceful', 'serene'].includes(e)) scores['calm-peaceful'] += 10;
    if (['love', 'romantic', 'passion'].includes(e)) scores['romantic-emotional'] += 10;
    if (['dark', 'mysterious', 'eerie'].includes(e)) scores['dark-mysterious'] += 10;
    if (['nostalgic', 'reflective', 'thoughtful'].includes(e)) scores['nostalgic-reflective'] += 10;
  });

  // Sort by score
  const sortedTones = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([tone]) => tone as ToneCategory);

  const primaryTone = sortedTones[0];
  const secondaryTones = sortedTones.slice(1, 3);
  const maxScore = scores[primaryTone];
  const confidence = Math.min(maxScore / 100, 1);

  return { primaryTone, secondaryTones, confidence };
};

export const getToneLabel = (tone: ToneCategory): string => {
  const labels: Record<ToneCategory, string> = {
    'energetic-happy': 'Energetic & Happy',
    'melancholic-slow': 'Melancholic & Slow',
    'aggressive-intense': 'Aggressive & Intense',
    'calm-peaceful': 'Calm & Peaceful',
    'romantic-emotional': 'Romantic & Emotional',
    'uplifting-motivational': 'Uplifting & Motivational',
    'dark-mysterious': 'Dark & Mysterious',
    'nostalgic-reflective': 'Nostalgic & Reflective',
  };
  return labels[tone];
};

export const getToneColor = (tone: ToneCategory): string => {
  const colors: Record<ToneCategory, string> = {
    'energetic-happy': '#F59E0B', // Gold
    'melancholic-slow': '#3B82F6', // Blue
    'aggressive-intense': '#EF4444', // Red
    'calm-peaceful': '#10B981', // Green
    'romantic-emotional': '#EC4899', // Pink
    'uplifting-motivational': '#8B5CF6', // Purple
    'dark-mysterious': '#6366F1', // Indigo
    'nostalgic-reflective': '#14B8A6', // Teal
  };
  return colors[tone];
};

export const getToneDescription = (tone: ToneCategory): string => {
  const descriptions: Record<ToneCategory, string> = {
    'energetic-happy': 'High energy with positive vibes, perfect for workouts and parties',
    'melancholic-slow': 'Slow tempo with emotional depth, ideal for reflection',
    'aggressive-intense': 'Powerful and intense, great for motivation and energy',
    'calm-peaceful': 'Soothing and tranquil, perfect for relaxation',
    'romantic-emotional': 'Heartfelt and passionate, ideal for intimate moments',
    'uplifting-motivational': 'Inspiring and empowering, great for productivity',
    'dark-mysterious': 'Enigmatic and atmospheric, perfect for deep focus',
    'nostalgic-reflective': 'Thoughtful and reminiscent, ideal for contemplation',
  };
  return descriptions[tone];
};
