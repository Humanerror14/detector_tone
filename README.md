# Tone Music Analyzer

![Tone Music Analyzer](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)

Discover the emotional tone of your favorite songs through advanced audio and lyrics analysis.

## ✨ Features

- 🎵 **Multi-Platform Support**: Analyze songs from Spotify, Apple Music, YouTube, SoundCloud, and more
- 🔍 **Smart Search**: Find any song by title or artist
- 📤 **File Upload**: Upload MP3, WAV, or M4A files for analysis
- 🎨 **Tone Classification**: 8 distinct mood categories with confidence scores
- 📊 **Visual Analytics**: Interactive charts and emotion breakdowns
- 🎯 **Tempo Analysis**: BPM detection, energy levels, and rhythm patterns
- 📝 **Lyrics Sentiment**: AI-powered emotion and theme detection
- 🎼 **Similar Songs**: Discover tracks with matching emotional tones
- 🌈 **Beautiful UI**: Musicable design with smooth animations

## 🎭 Tone Categories

1. **Energetic & Happy** - High energy with positive vibes
2. **Melancholic & Slow** - Slow tempo with emotional depth
3. **Aggressive & Intense** - Powerful and intense
4. **Calm & Peaceful** - Soothing and tranquil
5. **Romantic & Emotional** - Heartfelt and passionate
6. **Uplifting & Motivational** - Inspiring and empowering
7. **Dark & Mysterious** - Enigmatic and atmospheric
8. **Nostalgic & Reflective** - Thoughtful and reminiscent

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- API keys for streaming platforms (optional but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tone-music-analyzer.git
cd tone-music-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
# ... other API keys
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Zustand** - State management
- **Recharts** - Data visualization

### Analysis Engine
- **Web Audio API** - Audio processing
- **Compromise.js** - Natural language processing
- **Music Metadata** - Audio file parsing

### APIs
- Spotify Web API
- Apple Music API
- YouTube Data API
- Genius API (lyrics)

## 📁 Project Structure

```
tone-music-analyzer/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # State management
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── PRD.md              # Product Requirements Document
└── package.json        # Dependencies
```

## 🎯 Usage

### Analyze from Link
1. Click "Paste Link" on the homepage
2. Paste a song URL from Spotify, Apple Music, YouTube, etc.
3. Click "Analyze Song"
4. View detailed tone analysis and visualizations

### Search Song
1. Click "Search Song" on the homepage
2. Enter song title or artist name
3. Select the correct song from results
4. View analysis results

### Upload File
1. Click "Upload File" on the homepage
2. Drag & drop or browse for an audio file (MP3, WAV, M4A)
3. Wait for upload and analysis
4. View results

## 🔧 Configuration

### API Keys

To enable full functionality, obtain API keys from:

- **Spotify**: [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- **Apple Music**: [Apple Developer](https://developer.apple.com/music/)
- **YouTube**: [Google Cloud Console](https://console.cloud.google.com/)
- **Genius**: [Genius API](https://genius.com/api-clients)

### Environment Variables

See `.env.example` for all available configuration options.

## 📊 How It Works

1. **Audio Analysis**
   - Extract audio features (BPM, energy, rhythm)
   - Detect tempo and consistency
   - Calculate energy levels

2. **Lyrics Analysis**
   - Fetch lyrics from Genius API
   - Perform sentiment analysis
   - Detect emotions and themes
   - Extract keywords

3. **Tone Classification**
   - Combine tempo and lyrics data
   - Apply classification algorithm
   - Calculate confidence scores
   - Identify primary and secondary tones

4. **Visualization**
   - Generate emotion radar charts
   - Display tempo bar charts
   - Show detailed metrics
   - Recommend similar songs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spotify Web API for audio features
- Genius API for lyrics data
- Web Audio API for audio processing
- All open-source libraries used in this project

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by Tone Music Team © 2026
