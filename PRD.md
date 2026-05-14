# Product Requirements Document (PRD)
## Tone Music Analyzer

**Version:** 1.0  
**Date:** 2026-05-10  
**Status:** Ready for Development

---

## 1. Executive Summary

Tone Music Analyzer adalah aplikasi web yang menganalisis tone/mood sebuah lagu berdasarkan tempo dan lirik. Aplikasi ini memungkinkan user untuk menginput lagu melalui berbagai cara (link streaming, judul lagu, atau upload file MP3) dan mendapatkan analisis tone yang akurat dengan UI/UX yang interaktif dan bernuansa musikal.

---

## 2. Product Vision

Menciptakan platform analisis musik yang intuitif dan menyenangkan, membantu user memahami mood dan karakteristik emosional dari lagu favorit mereka melalui teknologi analisis tempo dan lirik.

---

## 3. Target Users

- **Music Enthusiasts**: Pendengar musik yang ingin memahami mood lagu lebih dalam
- **Content Creators**: Pembuat konten yang membutuhkan musik dengan tone tertentu
- **Playlist Curators**: Orang yang membuat playlist berdasarkan mood
- **Musicians & Producers**: Musisi yang ingin menganalisis karakteristik lagu

---

## 4. Core Features

### 4.1 Input Methods (Multi-Platform)

#### A. Link Streaming Platform
- **Supported Platforms:**
  - Spotify
  - Apple Music / iTunes
  - YouTube Music
  - SoundCloud
  - Deezer
- **Functionality:**
  - User paste link lagu
  - Auto-detect platform
  - Extract metadata (judul, artist, album art)
  - Fetch audio preview/full track untuk analisis

#### B. Search by Title
- **Functionality:**
  - Search bar dengan autocomplete
  - Menampilkan rekomendasi lagu yang paling tepat
  - Preview card dengan album art, artist, duration
  - Multi-source search (Spotify API, iTunes API, YouTube API)
  - User memilih lagu yang tepat dari hasil pencarian

#### C. File Upload (MP3)
- **Functionality:**
  - Drag & drop area
  - File browser upload
  - Support format: MP3, WAV, M4A
  - Max file size: 10MB
  - Progress indicator saat upload
  - Local audio analysis

### 4.2 Tone Analysis Engine

#### A. Tempo Analysis
- **Metrics:**
  - BPM (Beats Per Minute)
  - Rhythm pattern
  - Tempo consistency
  - Energy level

#### B. Lyrics Analysis
- **Metrics:**
  - Sentiment analysis (positive, negative, neutral)
  - Emotion detection (happy, sad, angry, calm, energetic, melancholic)
  - Keyword extraction
  - Theme identification
  - Language detection

#### C. Combined Tone Classification
- **Tone Categories:**
  - **Energetic & Happy**: Fast tempo + positive lyrics
  - **Melancholic & Slow**: Slow tempo + sad lyrics
  - **Aggressive & Intense**: Fast tempo + angry/intense lyrics
  - **Calm & Peaceful**: Slow tempo + peaceful lyrics
  - **Romantic & Emotional**: Medium tempo + love/emotional lyrics
  - **Uplifting & Motivational**: Medium-fast tempo + inspirational lyrics
  - **Dark & Mysterious**: Slow-medium tempo + dark/mysterious lyrics
  - **Nostalgic & Reflective**: Medium tempo + reflective lyrics

### 4.3 Results Display

#### A. Tone Visualization
- **Visual Elements:**
  - Circular mood chart (radar chart)
  - Color-coded tone indicator
  - Animated waveform visualization
  - BPM meter with animated needle
  - Emotion percentage breakdown

#### B. Detailed Analysis
- **Information Displayed:**
  - Primary tone (dengan confidence score)
  - Secondary tones
  - Tempo details (BPM, tempo category)
  - Lyric sentiment breakdown
  - Key emotions detected
  - Dominant themes
  - Musical characteristics

#### C. Similar Songs Recommendation
- **Functionality:**
  - Recommend 5-10 lagu dengan tone serupa
  - Display dengan album art grid
  - Quick play preview
  - Add to comparison feature

---

## 5. UI/UX Design Requirements

### 5.1 Design Theme: "Musicable"

#### A. Color Palette
- **Primary Colors:**
  - Deep Purple: `#6B46C1` (music, creativity)
  - Electric Blue: `#3B82F6` (energy, technology)
  - Vibrant Pink: `#EC4899` (emotion, passion)
- **Secondary Colors:**
  - Dark Background: `#0F0F1E` (depth)
  - Card Background: `#1A1A2E` (contrast)
  - Accent Gold: `#F59E0B` (highlights)
- **Gradient Backgrounds:**
  - Purple to Blue gradient
  - Dark to light transitions
  - Animated gradient shifts

#### B. Typography
- **Headings:** Poppins (Bold, modern, musical)
- **Body:** Inter (Clean, readable)
- **Accent:** Montserrat (Dynamic, energetic)

#### C. Icon Package (Music-themed)
- **Required Icons:**
  - Music note icons (various styles)
  - Waveform icons
  - Headphone icons
  - Microphone icons
  - Play/pause/skip controls
  - Upload/download icons
  - Search icons
  - Link/chain icons
  - Heart/favorite icons
  - Share icons
- **Icon Library:** React Icons (with custom music SVGs)
- **Style:** Outlined with subtle fills, animated on hover

### 5.2 Interactive Elements

#### A. Subtle Animations
- **Micro-interactions:**
  - Button hover effects (scale, glow)
  - Card hover lift (3D transform)
  - Input focus animations (border glow)
  - Loading spinners (musical notes rotating)
  - Progress bars (waveform style)
  - Fade-in transitions for content
  - Smooth scroll animations

#### B. Background Effects
- **Visual Elements:**
  - Animated gradient background
  - Floating music notes particles (subtle)
  - Waveform visualization (background layer)
  - Blur effects on cards (glassmorphism)
  - Parallax scrolling effects
  - Dynamic color shifts based on tone analysis

#### C. Responsive Interactions
- **User Feedback:**
  - Haptic-style visual feedback on clicks
  - Toast notifications (success, error)
  - Skeleton loaders during analysis
  - Animated progress indicators
  - Smooth state transitions

### 5.3 Layout Structure

#### A. Landing Page
- **Sections:**
  1. Hero section dengan animated background
  2. Input method selector (3 cards: Link, Search, Upload)
  3. Feature highlights
  4. Recent analyses (if any)

#### B. Analysis Page
- **Layout:**
  1. Song info header (album art, title, artist)
  2. Main tone visualization (center focus)
  3. Detailed metrics (grid layout)
  4. Lyrics analysis section
  5. Similar songs recommendations

#### C. Navigation
- **Components:**
  - Top navbar (logo, search, user menu)
  - Floating action button (quick analyze)
  - Breadcrumb navigation
  - Footer with links

---

## 6. Technical Architecture

### 6.1 Frontend Stack
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS + Framer Motion (animations)
- **State Management:** Zustand or Redux Toolkit
- **Routing:** React Router v6
- **UI Components:** Headless UI + Custom components
- **Charts:** Recharts or Chart.js
- **Audio Visualization:** Wavesurfer.js or Web Audio API

### 6.2 Backend Stack
- **Runtime:** Node.js with Express or Next.js API Routes
- **Language:** TypeScript
- **Audio Processing:** 
  - `music-metadata` (metadata extraction)
  - `web-audio-api` (tempo detection)
  - `essentia.js` (audio analysis)
- **Lyrics Analysis:**
  - Natural Language Processing library (compromise.js or natural)
  - Sentiment analysis API (Azure Text Analytics or custom model)
- **External APIs:**
  - Spotify Web API
  - Apple Music API
  - YouTube Data API
  - Genius API (lyrics)

### 6.3 Database
- **Primary DB:** PostgreSQL (song metadata, analysis cache)
- **Cache Layer:** Redis (API responses, analysis results)
- **File Storage:** AWS S3 or Cloudinary (uploaded MP3s)

### 6.4 Deployment
- **Frontend:** Vercel or Netlify
- **Backend:** Railway, Render, or AWS
- **CDN:** Cloudflare
- **Monitoring:** Sentry (error tracking)

---

## 7. User Flow

### Flow 1: Link Input
1. User lands on homepage
2. Clicks "Analyze from Link" card
3. Pastes streaming platform link
4. System detects platform and validates
5. Fetches song metadata and audio
6. Runs analysis (tempo + lyrics)
7. Displays results with visualizations
8. Shows similar songs recommendations

### Flow 2: Search by Title
1. User clicks "Search Song" card
2. Types song title in search bar
3. Sees autocomplete suggestions
4. Selects correct song from results
5. System fetches audio and lyrics
6. Runs analysis
7. Displays results

### Flow 3: File Upload
1. User clicks "Upload MP3" card
2. Drags file or browses
3. File uploads with progress indicator
4. System extracts audio features
5. Attempts to fetch lyrics (if metadata available)
6. Runs analysis
7. Displays results

---

## 8. API Integrations

### 8.1 Spotify API
- **Endpoints:**
  - Track search
  - Track details
  - Audio features
  - Audio analysis
- **Authentication:** OAuth 2.0

### 8.2 Apple Music API
- **Endpoints:**
  - Catalog search
  - Song details
  - Preview URLs
- **Authentication:** Developer token

### 8.3 YouTube Data API
- **Endpoints:**
  - Video search
  - Video details
- **Note:** Audio extraction via youtube-dl or similar

### 8.4 Genius API
- **Purpose:** Lyrics fetching
- **Endpoints:**
  - Search songs
  - Get lyrics

---

## 9. Performance Requirements

- **Page Load Time:** < 2 seconds
- **Analysis Time:** < 5 seconds for streaming links
- **File Upload:** Support up to 10MB with progress
- **API Response Time:** < 1 second
- **Smooth Animations:** 60 FPS
- **Mobile Responsive:** All screen sizes

---

## 10. Security & Privacy

- **Data Protection:**
  - No storage of user-uploaded audio files after analysis
  - Encrypted API keys
  - HTTPS only
- **Rate Limiting:**
  - Max 10 analyses per hour per IP (free tier)
  - API rate limit handling
- **Content Policy:**
  - No explicit content analysis without warning
  - Age-appropriate content filtering

---

## 11. Future Enhancements (Phase 2)

- User accounts and history
- Playlist tone analysis
- Mood-based playlist generator
- Social sharing features
- Mobile app (React Native)
- Real-time collaboration
- AI-powered music recommendations
- Integration with more streaming platforms
- Export analysis reports (PDF)
- API for developers

---

## 12. Success Metrics

- **User Engagement:**
  - Daily active users
  - Average analyses per user
  - Session duration
- **Technical:**
  - Analysis accuracy rate
  - API uptime (99.9%)
  - Average response time
- **Business:**
  - User retention rate
  - Feature adoption rate
  - User satisfaction score

---

## 13. Development Timeline

### Phase 1: MVP (6-8 weeks)
- **Week 1-2:** Setup + UI/UX design implementation
- **Week 3-4:** Input methods + API integrations
- **Week 5-6:** Analysis engine development
- **Week 7-8:** Testing + deployment

### Phase 2: Enhancements (4-6 weeks)
- Additional features from future enhancements list

---

## 14. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| API rate limits | High | Implement caching, multiple API keys |
| Lyrics unavailable | Medium | Fallback to tempo-only analysis |
| Audio quality issues | Medium | Preprocessing and normalization |
| Slow analysis time | High | Optimize algorithms, use workers |
| Copyright concerns | High | Use official APIs, no audio storage |

---

## Appendix A: Tone Classification Matrix

| Tempo Range | Lyric Sentiment | Resulting Tone |
|-------------|-----------------|----------------|
| 140+ BPM | Positive | Energetic & Happy |
| 140+ BPM | Negative | Aggressive & Intense |
| 60-90 BPM | Negative | Melancholic & Slow |
| 60-90 BPM | Positive | Calm & Peaceful |
| 90-120 BPM | Romantic | Romantic & Emotional |
| 120-140 BPM | Inspirational | Uplifting & Motivational |

---

**Document Owner:** Product Team  
**Last Updated:** 2026-05-10  
**Status:** ✅ Approved for Development
