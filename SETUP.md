# Tone Music Analyzer - Setup Guide

## Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Setup Environment Variables** (Optional)
```bash
cp .env.example .env
# Edit .env and add your API keys
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Open Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## API Keys Setup (Optional but Recommended)

### Spotify API
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy Client ID and Client Secret
4. Add to `.env`:
```env
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
```

### Apple Music API
1. Go to [Apple Developer](https://developer.apple.com/music/)
2. Create a MusicKit identifier
3. Generate a developer token
4. Add to `.env`:
```env
VITE_APPLE_MUSIC_TOKEN=your_token
```

### YouTube API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add to `.env`:
```env
VITE_YOUTUBE_API_KEY=your_api_key
```

### Genius API (for lyrics)
1. Go to [Genius API](https://genius.com/api-clients)
2. Create a new API client
3. Copy the access token
4. Add to `.env`:
```env
VITE_GENIUS_API_KEY=your_api_key
```

## Features Overview

### 1. Analyze from Link
- Paste any song URL from supported platforms
- Automatic platform detection
- Instant analysis

### 2. Search Song
- Search by title or artist
- Real-time suggestions
- Multi-platform results

### 3. Upload File
- Drag & drop support
- Supports MP3, WAV, M4A
- Max file size: 10MB

## Analysis Components

### Tempo Analysis
- **BPM Detection**: Automatic beats per minute calculation
- **Energy Level**: 0-100 scale of song intensity
- **Rhythm Pattern**: Detected rhythm characteristics
- **Consistency**: Tempo stability throughout the song

### Lyrics Analysis
- **Sentiment Detection**: Positive, negative, or neutral
- **Emotion Recognition**: Happy, sad, angry, calm, etc.
- **Theme Identification**: Love, heartbreak, motivation, etc.
- **Keyword Extraction**: Most significant words

### Tone Classification
8 distinct categories:
1. Energetic & Happy
2. Melancholic & Slow
3. Aggressive & Intense
4. Calm & Peaceful
5. Romantic & Emotional
6. Uplifting & Motivational
7. Dark & Mysterious
8. Nostalgic & Reflective

## UI/UX Features

### Animations
- Smooth page transitions
- Hover effects on cards
- Floating music note particles
- Animated gradient backgrounds
- Loading spinners with music theme

### Color Scheme
- **Primary Purple**: `#6B46C1`
- **Electric Blue**: `#3B82F6`
- **Vibrant Pink**: `#EC4899`
- **Dark Background**: `#0F0F1E`
- **Card Background**: `#1A1A2E`

### Typography
- **Headings**: Poppins (Bold, modern)
- **Body**: Inter (Clean, readable)
- **Accent**: Montserrat (Dynamic)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, Vite will automatically use the next available port.

### API Rate Limits
- Spotify: 30 requests per second
- YouTube: 10,000 units per day
- Genius: 1000 requests per day

### CORS Issues
If you encounter CORS errors, make sure you're using the correct API endpoints and have proper authentication.

### Audio Analysis Fails
- Ensure the audio file is in a supported format
- Check file size (max 10MB)
- Verify the audio file is not corrupted

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Opera: ✅ Full support

## Performance Tips

1. **Enable API Caching**: Results are cached for 15 minutes
2. **Use Preview URLs**: Faster than full track analysis
3. **Optimize Images**: Album art is automatically optimized
4. **Lazy Loading**: Components load on demand

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) file.

---

Need help? Open an issue on GitHub!
