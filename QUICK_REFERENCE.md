# Quick Reference Guide

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint

# Git
git add .
git commit -m "message"
git push origin main
```

## 📂 File Locations

### Pages
- `src/pages/HomePage.tsx` - Landing page with 3 input methods
- `src/pages/AnalyzePage.tsx` - Analysis input page
- `src/pages/ResultsPage.tsx` - Results visualization page

### Components
- `src/components/Navbar.tsx` - Top navigation
- `src/components/Footer.tsx` - Footer with links
- `src/components/Card.tsx` - Reusable card component
- `src/components/Button.tsx` - Button component
- `src/components/AnimatedBackground.tsx` - Animated gradient bg
- `src/components/FloatingParticles.tsx` - Music note particles
- `src/components/LoadingSpinner.tsx` - Loading indicator
- `src/components/Toast.tsx` - Toast notifications

### Services
- `src/services/musicService.ts` - API integrations (Spotify, etc)
- `src/services/analysisService.ts` - Main analysis orchestration

### Utils
- `src/utils/audioAnalyzer.ts` - BPM & tempo detection
- `src/utils/lyricsAnalyzer.ts` - Sentiment & emotion analysis
- `src/utils/toneClassifier.ts` - Tone categorization logic
- `src/utils/constants.ts` - App constants
- `src/utils/helpers.ts` - Helper functions

### State
- `src/store/useStore.ts` - Zustand global state

### Types
- `src/types/index.ts` - TypeScript type definitions

## 🎨 Color Variables

```css
/* Tailwind classes */
bg-primary-purple     /* #6B46C1 */
bg-primary-blue       /* #3B82F6 */
bg-primary-pink       /* #EC4899 */
bg-dark-bg           /* #0F0F1E */
bg-dark-card         /* #1A1A2E */
bg-accent-gold       /* #F59E0B */
```

## 🎭 Tone Categories

| Category | Color | BPM Range | Sentiment |
|----------|-------|-----------|-----------|
| Energetic & Happy | Gold | 140+ | Positive |
| Melancholic & Slow | Blue | <90 | Negative |
| Aggressive & Intense | Red | 140+ | Negative |
| Calm & Peaceful | Green | <90 | Positive |
| Romantic & Emotional | Pink | 90-120 | Romantic |
| Uplifting & Motivational | Purple | 120-140 | Positive |
| Dark & Mysterious | Indigo | 60-120 | Dark |
| Nostalgic & Reflective | Teal | 90-120 | Neutral |

## 🔧 Configuration

### Environment Variables (.env)
```env
VITE_SPOTIFY_CLIENT_ID=your_id
VITE_SPOTIFY_CLIENT_SECRET=your_secret
VITE_APPLE_MUSIC_TOKEN=your_token
VITE_YOUTUBE_API_KEY=your_key
VITE_GENIUS_API_KEY=your_key
```

### Audio Config
- Max file size: 10MB
- Supported formats: MP3, WAV, M4A
- BPM range: 40-200

## 📊 Analysis Flow

```
1. Input → 2. Fetch Metadata → 3. Get Audio
                                      ↓
4. Tempo Analysis ←→ 5. Lyrics Analysis
                                      ↓
6. Tone Classification → 7. Visualizations → 8. Results
```

## 🎯 Key Functions

### Audio Analysis
```typescript
audioAnalyzer.analyzeAudioFile(file: File)
audioAnalyzer.analyzeAudioUrl(url: string)
```

### Lyrics Analysis
```typescript
lyricsAnalyzer.analyzeLyrics(lyrics: string)
```

### Tone Classification
```typescript
classifyTone(tempo: TempoAnalysis, lyrics: LyricsAnalysis)
```

## 🐛 Troubleshooting

### Port in use
- Vite will auto-select next available port

### API errors
- Check API keys in .env
- Verify rate limits not exceeded

### Build errors
- Run `npm install` again
- Clear node_modules and reinstall

### Audio analysis fails
- Check file format (MP3, WAV, M4A only)
- Verify file size (<10MB)
- Ensure file is not corrupted

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

## 🎬 Animation Durations

- Page transitions: 300ms
- Card hover: 200ms
- Fade in: 500ms
- Gradient animation: 15s
- Particle float: 20s+

## 📦 Main Dependencies

```json
{
  "react": "^18.2.0",
  "typescript": "^5.2.2",
  "vite": "^5.1.0",
  "tailwindcss": "^3.4.1",
  "framer-motion": "^11.0.0",
  "zustand": "^4.5.0",
  "recharts": "^2.12.0",
  "axios": "^1.6.0",
  "compromise": "^14.11.0"
}
```

## 🔗 Useful Links

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Recharts](https://recharts.org)
- [Spotify API](https://developer.spotify.com/documentation/web-api)

## 💡 Tips

1. Use `React.memo()` for expensive components
2. Implement code splitting with `React.lazy()`
3. Optimize images before adding
4. Test on multiple browsers
5. Check mobile responsiveness
6. Add error boundaries
7. Monitor bundle size
8. Use Web Workers for heavy tasks

---

**Last Updated:** 2026-05-10
