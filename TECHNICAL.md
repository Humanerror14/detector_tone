# Tone Music Analyzer - Technical Documentation

## Architecture Overview

### Frontend Architecture
```
┌─────────────────────────────────────────┐
│           React Application             │
├─────────────────────────────────────────┤
│  Pages Layer                            │
│  - HomePage                             │
│  - AnalyzePage                          │
│  - ResultsPage                          │
├─────────────────────────────────────────┤
│  Components Layer                       │
│  - UI Components (Card, Button, etc)    │
│  - Layout Components (Navbar, Footer)   │
│  - Visualization Components (Charts)    │
├─────────────────────────────────────────┤
│  Services Layer                         │
│  - MusicService (API integration)       │
│  - AnalysisService (tone analysis)      │
├─────────────────────────────────────────┤
│  Utils Layer                            │
│  - AudioAnalyzer (tempo detection)      │
│  - LyricsAnalyzer (sentiment analysis)  │
│  - ToneClassifier (tone categorization) │
├─────────────────────────────────────────┤
│  State Management (Zustand)             │
│  - Global app state                     │
│  - Analysis results                     │
│  - Error handling                       │
└─────────────────────────────────────────┘
```

## Core Algorithms

### 1. BPM Detection Algorithm

```typescript
// Simplified peak detection
1. Extract audio channel data
2. Find peaks above threshold
3. Calculate intervals between peaks
4. Compute median interval
5. Convert to BPM: 60 / median_interval
6. Clamp to reasonable range (40-200 BPM)
```

### 2. Sentiment Analysis Algorithm

```typescript
// Lyrics sentiment scoring
1. Tokenize lyrics into words
2. Match against positive/negative word lists
3. Calculate score: (positive - negative) / total_words
4. Normalize to -1 to 1 range
5. Classify: >0.2 = positive, <-0.2 = negative, else neutral
```

### 3. Tone Classification Algorithm

```typescript
// Multi-factor tone classification
1. Analyze tempo (BPM, energy level)
2. Analyze lyrics (sentiment, emotions, themes)
3. Score each tone category (0-100)
4. Apply weighted scoring:
   - Tempo-based scoring (40%)
   - Sentiment-based scoring (30%)
   - Emotion-based scoring (20%)
   - Theme-based scoring (10%)
5. Select primary tone (highest score)
6. Select secondary tones (2nd and 3rd highest)
7. Calculate confidence: max_score / 100
```

## Data Flow

### Song Analysis Flow
```
User Input (Link/Search/Upload)
    ↓
Fetch Song Metadata
    ↓
Get Audio Data
    ↓
┌─────────────────┬─────────────────┐
│  Tempo Analysis │ Lyrics Analysis │
│  - BPM          │ - Sentiment     │
│  - Energy       │ - Emotions      │
│  - Rhythm       │ - Themes        │
└─────────────────┴─────────────────┘
    ↓
Tone Classification
    ↓
Generate Visualizations
    ↓
Display Results
```

## API Integration

### Spotify API
```typescript
// Authentication
POST https://accounts.spotify.com/api/token
Body: grant_type=client_credentials
Headers: Authorization: Basic base64(client_id:client_secret)

// Search
GET https://api.spotify.com/v1/search
Params: q, type, limit
Headers: Authorization: Bearer {token}

// Audio Features
GET https://api.spotify.com/v1/audio-features/{id}
Headers: Authorization: Bearer {token}
```

### Response Caching
- API responses cached for 15 minutes
- Reduces API calls and improves performance
- Implemented using in-memory cache

## State Management

### Zustand Store Structure
```typescript
interface AppState {
  currentSong: Song | null;
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
  analysisHistory: AnalysisResult[];
  error: string | null;
}
```

## Performance Optimizations

### 1. Code Splitting
- React.lazy() for route-based splitting
- Dynamic imports for heavy components

### 2. Image Optimization
- Lazy loading for album art
- Responsive image sizes
- WebP format support

### 3. Animation Performance
- GPU-accelerated transforms
- RequestAnimationFrame for smooth animations
- Debounced scroll events

### 4. Audio Processing
- Web Workers for heavy computations
- Streaming audio analysis
- Progressive loading

## Security Considerations

### 1. API Key Protection
- Environment variables for sensitive data
- Never commit .env files
- Server-side API calls for production

### 2. Input Validation
- File type validation
- File size limits (10MB)
- URL validation and sanitization

### 3. XSS Prevention
- React's built-in XSS protection
- Sanitized user inputs
- Content Security Policy headers

## Testing Strategy

### Unit Tests
- Utils functions (tone classifier, analyzers)
- Service layer methods
- Component logic

### Integration Tests
- API integration flows
- Analysis pipeline
- State management

### E2E Tests
- User flows (search, upload, analyze)
- Cross-browser compatibility
- Mobile responsiveness

## Deployment

### Build Process
```bash
npm run build
# Output: dist/
# - Minified JS/CSS
# - Optimized assets
# - Source maps
```

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or Cloudflare Pages
- **Backend API**: Railway, Render, or AWS Lambda
- **CDN**: Cloudflare for static assets

### Environment Variables (Production)
```env
VITE_SPOTIFY_CLIENT_ID=prod_client_id
VITE_SPOTIFY_CLIENT_SECRET=prod_client_secret
VITE_API_BASE_URL=https://api.yourdomain.com
```

## Monitoring & Analytics

### Error Tracking
- Sentry integration for error monitoring
- Custom error boundaries
- User feedback collection

### Performance Monitoring
- Web Vitals tracking
- API response time monitoring
- User interaction analytics

## Future Enhancements

### Phase 2 Features
1. User authentication and profiles
2. Playlist tone analysis
3. Mood-based playlist generator
4. Social sharing features
5. Mobile app (React Native)
6. Real-time collaboration
7. Advanced ML models for better accuracy
8. More streaming platform integrations

### Technical Improvements
1. Server-side rendering (SSR)
2. Progressive Web App (PWA)
3. Offline support
4. WebSocket for real-time updates
5. GraphQL API
6. Microservices architecture

## API Rate Limits

| Platform | Limit | Reset Period |
|----------|-------|--------------|
| Spotify | 30 req/s | Rolling |
| YouTube | 10,000 units | Daily |
| Genius | 1,000 req | Daily |
| Apple Music | 20 req/s | Rolling |

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Web Audio API | ✅ | ✅ | ✅ | ✅ |
| File Upload | ✅ | ✅ | ✅ | ✅ |
| Animations | ✅ | ✅ | ✅ | ✅ |
| Charts | ✅ | ✅ | ✅ | ✅ |

## Contributing Guidelines

1. Fork the repository
2. Create feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit pull request
6. Code review process
7. Merge to main

## License

MIT License - Free for personal and commercial use.

---

For questions or support, please open an issue on GitHub.
