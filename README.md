# Tone Music Analyzer

Discover the emotional tone of songs through YouTube search, audio feature extraction, and lyrics/caption sentiment analysis.

## Features

- Search songs through YouTube Data API v3
- Analyze uploaded audio files (MP3, WAV, M4A)
- Extract tempo, energy, rhythm, and musical characteristics
- Retrieve YouTube captions/transcripts when available
- Classify songs into 8 tone categories
- Visualize emotion breakdowns and analysis metrics

## Tone Categories

1. Energetic & Happy
2. Melancholic & Slow
3. Aggressive & Intense
4. Calm & Peaceful
5. Romantic & Emotional
6. Uplifting & Motivational
7. Dark & Mysterious
8. Nostalgic & Reflective

## Getting Started

### Recommended: Docker

Use Docker to run the project on another device without installing Python, Torch, Librosa, FFmpeg, or other backend libraries on the host.

Prerequisite: Docker Desktop.

```bash
cp .env.example .env
docker compose up --build
```

Set your YouTube API key in `.env`:

```env
VITE_YOUTUBE_API_KEY=your_youtube_data_api_key
```

Open the frontend at:

```text
http://localhost:5173
```

Backend runs at:

```text
http://localhost:8000
```

### Local development

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
python -m pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```

For local frontend-to-backend calls, set:

```env
VITE_ANALYSIS_API_URL=http://localhost:8000
```

## Verification

Frontend:

```bash
npm run lint
npm run typecheck
```

Backend:

```bash
pytest backend/tests -q
```

Manual backend checks:

```text
GET  http://localhost:8000/health
POST http://localhost:8000/debug/youtube-lyrics
POST http://localhost:8000/analyze/youtube
POST http://localhost:8000/analyze/upload
```

Docker check:

```bash
docker compose up --build
```

## Environment Variables

See `.env.example`.

Required for YouTube search:

```env
VITE_YOUTUBE_API_KEY=
```

Useful runtime settings:

```env
VITE_ANALYSIS_API_URL=http://localhost:8000
YOUTUBE_LYRICS_LANGS=id,en
ALLOWED_ORIGINS=http://localhost:5173
MAX_UPLOAD_BYTES=10485760
ENABLE_DEBUG_ENDPOINTS=false
RATE_LIMIT_WINDOW_SECONDS=60
RATE_LIMIT_MAX_REQUESTS=30
YTDLP_DENO_PATH=
```

For production, set `ALLOWED_ORIGINS` to your deployed frontend origin and keep `ENABLE_DEBUG_ENDPOINTS=false`.

## How It Works

1. Frontend searches YouTube using `VITE_YOUTUBE_API_KEY`.
2. Backend analyzes selected YouTube songs through `/analyze/youtube`.
3. Backend tries to retrieve captions/transcripts through `youtube-transcript-api`, then falls back to `yt-dlp`.
4. Uploaded audio is analyzed through `/analyze/upload` using Librosa-based feature extraction.
5. Tone is classified from audio features and lyrics/caption sentiment.

## Troubleshooting

### YouTube lyrics/caption returns `hasLyrics: false`

Use:

```text
POST http://localhost:8000/debug/youtube-lyrics
```

The debug response includes the failure reason. YouTube can temporarily block caption extraction with HTTP 429 rate limits. This is external to the app and may resolve by waiting, trying another video, or using another network.

### Python dependency conflicts

Prefer Docker. The backend image pins Python 3.12 and installs all backend libraries inside the container, so other devices do not need local Python package setup.

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Zustand
- Recharts

### Backend

- FastAPI
- Librosa / NumPy
- Transformers / Torch
- yt-dlp
- youtube-transcript-api
- langdetect

## Project Structure

```text
tone-music-analyzer/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── tests/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License.
