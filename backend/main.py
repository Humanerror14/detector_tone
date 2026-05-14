from __future__ import annotations

import math
import os
import re
import tempfile
from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

try:
    from langdetect import detect  # type: ignore[import]
except Exception:  # pragma: no cover
    detect = None

try:
    import librosa
    import numpy as np
except Exception:  # pragma: no cover
    librosa = None
    np = None

try:
    import essentia.standard as es  # type: ignore[import]
except Exception:  # pragma: no cover
    es = None

try:
    from transformers import pipeline
except Exception:  # pragma: no cover
    pipeline = None

try:
    import yt_dlp
except Exception:  # pragma: no cover
    yt_dlp = None

app = FastAPI(title="Tone Music AI Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

_sentiment_pipeline = None


class SongPayload(BaseModel):
    id: str
    title: str
    artist: str
    albumArt: str | None = None
    platform: str | None = None
    url: HttpUrl | None = None


class YouTubeAnalyzeRequest(BaseModel):
    song: SongPayload


def tempo_category(bpm: float) -> str:
    if bpm < 60:
        return "very-slow"
    if bpm < 90:
        return "slow"
    if bpm < 120:
        return "moderate"
    if bpm < 140:
        return "fast"
    return "very-fast"


def normalize_tone(mood: str) -> str:
    mapping = {
        "happy": "energetic-happy",
        "sad": "melancholic-slow",
        "angry": "aggressive-intense",
        "calm": "calm-peaceful",
        "romantic": "romantic-emotional",
        "uplifting": "uplifting-motivational",
        "dark": "dark-mysterious",
        "nostalgic": "nostalgic-reflective",
    }
    return mapping.get(mood, "calm-peaceful")


LANGUAGE_NAMES = {
    "id": "Indonesian",
    "en": "English",
    "ms": "Malay",
    "jw": "Javanese",
    "su": "Sundanese",
}

INDONESIAN_MARKERS = {
    "aku", "anda", "bagai", "bahagia", "bersama", "bila", "cinta", "dalam", "dan",
    "dengan", "di", "dia", "dirimu", "hati", "ini", "jalan", "jangan", "jiwa", "kamu",
    "kasih", "ke", "ku", "lagi", "menanti", "merindu", "rasa", "rindu", "saja", "sampai",
    "sayang", "semua", "tak", "telah", "tentang", "untuk", "yang",
}

ENGLISH_MARKERS = {
    "a", "about", "again", "all", "and", "baby", "be", "dream", "for", "forever", "heart",
    "i", "in", "is", "love", "me", "my", "night", "of", "on", "one", "song", "the", "to",
    "with", "you", "your",
}


def clean_analysis_text(text: str) -> str:
    normalized = re.sub(r"[_\-.]+", " ", text)
    normalized = re.sub(r"\s+", " ", normalized)
    return normalized.strip()


def language_label(code: str) -> str:
    return LANGUAGE_NAMES.get(code, code.upper() if code != "unknown" else "unknown")


def detect_language(text: str) -> str:
    normalized = clean_analysis_text(text)
    words = re.findall(r"[a-zA-ZÀ-ÿ]+", normalized.lower())
    if words:
        id_score = sum(word in INDONESIAN_MARKERS for word in words)
        en_score = sum(word in ENGLISH_MARKERS for word in words)
        if id_score > en_score and id_score > 0:
            return language_label("id")
        if en_score > id_score and en_score > 0:
            return language_label("en")

    if detect is None or len(normalized) < 3:
        return "unknown"
    try:
        code = detect(normalized[:512]).lower()
        return language_label(code) if code else "unknown"
    except Exception:
        return "unknown"


def analyze_sentiment(text: str) -> dict[str, Any]:
    global _sentiment_pipeline
    language = detect_language(text)
    has_text = bool(text.strip())

    if pipeline is not None and has_text:
        try:
            if _sentiment_pipeline is None:
                _sentiment_pipeline = pipeline("sentiment-analysis")
            result = _sentiment_pipeline(text[:512])[0]
            label = result["label"].lower()
            score = float(result["score"])
            sentiment = "positive" if "positive" in label else "negative" if "negative" in label else "neutral"
            sentiment_score = score if sentiment == "positive" else -score if sentiment == "negative" else 0
            return {
                "sentiment": sentiment,
                "sentimentScore": sentiment_score,
                "emotions": [sentiment] if sentiment != "neutral" else [],
                "keywords": [],
                "themes": [],
                "language": language,
                "hasLyrics": has_text,
            }
        except Exception:
            pass

    return {
        "sentiment": "neutral",
        "sentimentScore": 0,
        "emotions": [],
        "keywords": [],
        "themes": [],
        "language": language,
        "hasLyrics": has_text,
    }


def extract_audio_features(path: Path) -> dict[str, Any]:
    if librosa is None or np is None:
        return fallback_features(path.name)

    y, sr = librosa.load(path, mono=True, duration=180)
    tempo = float(librosa.beat.tempo(y=y, sr=sr)[0])
    rms = librosa.feature.rms(y=y)[0]
    energy = float(min(100, max(0, np.mean(rms) * 1000)))
    consistency = float(max(0, min(100, 100 - np.var(rms) * 10000)))
    spectral_centroid = float(np.mean(librosa.feature.spectral_centroid(y=y, sr=sr)))
    danceability = float(max(0, min(1, (tempo / 160) * (energy / 100))))
    detected_key = detect_key_with_essentia(path)
    genre = classify_genre_placeholder(spectral_centroid, tempo)
    mood = classify_mood_placeholder(tempo, energy, detected_key)

    return {
        "tempo": {
            "bpm": round(tempo),
            "tempoCategory": tempo_category(tempo),
            "rhythmPattern": "Fast-paced" if tempo >= 120 else "Moderate groove" if tempo >= 90 else "Slow and steady",
            "energyLevel": round(energy),
            "consistency": round(consistency),
        },
        "musicalCharacteristics": {
            "key": detected_key,
            "mode": "minor" if "minor" in detected_key.lower() else "major",
            "timeSignature": "4/4",
            "loudness": round(float(20 * math.log10(float(np.mean(rms)) + 1e-9)), 2),
            "acousticness": round(max(0, min(1, 1 - energy / 100)), 2),
            "instrumentalness": 0.1,
            "danceability": round(danceability, 2),
        },
        "genre": genre,
        "mood": mood,
        "analysisSource": "audio",
    }


def detect_key_with_essentia(path: Path) -> str:
    if es is None:
        return "C Major"
    try:
        audio = es.MonoLoader(filename=str(path), sampleRate=44100)()
        key, scale, _ = es.KeyExtractor()(audio)
        return f"{key} {scale.title()}"
    except Exception:
        return "C Major"


def classify_genre_placeholder(spectral_centroid: float, tempo: float) -> str:
    if tempo > 135 and spectral_centroid > 2500:
        return "electronic"
    if tempo < 90:
        return "ballad"
    return "pop"


def classify_mood_placeholder(bpm: float, energy: float, key: str) -> str:
    is_minor = "minor" in key.lower()
    if energy > 70 and bpm >= 120:
        return "angry" if is_minor else "happy"
    if bpm < 90:
        return "sad" if is_minor else "calm"
    if energy > 55:
        return "uplifting"
    return "nostalgic" if is_minor else "calm"


def fallback_features(seed_text: str, audio_based: bool = False) -> dict[str, Any]:
    seed = sum(ord(char) for char in seed_text)
    bpm = 70 + seed % 90
    energy = 35 + seed % 55
    mood = classify_mood_placeholder(bpm, energy, "C Major")
    return {
        "tempo": {
            "bpm": bpm,
            "tempoCategory": tempo_category(bpm),
            "rhythmPattern": "Fast-paced" if bpm >= 120 else "Moderate groove" if bpm >= 90 else "Slow and steady",
            "energyLevel": energy,
            "consistency": 75 if audio_based else 45,
        },
        "musicalCharacteristics": {
            "key": "C Major" if audio_based else None,
            "mode": "major" if audio_based else None,
            "timeSignature": "4/4" if audio_based else None,
            "loudness": -8 if audio_based else None,
            "acousticness": 0.4,
            "instrumentalness": 0.1,
            "danceability": round(min(1, bpm / 160 * energy / 100), 2),
        },
        "genre": "unknown",
        "mood": mood,
        "analysisSource": "audio" if audio_based else "metadata",
    }


def analysis_confidence(features: dict[str, Any], sentiment: dict[str, Any]) -> float:
    if features.get("analysisSource") == "audio":
        return round(min(0.92, max(0.68, 0.65 + features["tempo"]["consistency"] / 350)), 2)
    text_bonus = 0.08 if sentiment["language"] != "unknown" else 0
    sentiment_bonus = min(0.08, abs(float(sentiment["sentimentScore"])) * 0.08)
    return round(0.42 + text_bonus + sentiment_bonus, 2)


def build_response(song: dict[str, Any], features: dict[str, Any], sentiment: dict[str, Any]) -> dict[str, Any]:
    primary_tone = normalize_tone(features["mood"])
    emotions = {
        "happy": 20,
        "sad": 20,
        "angry": 20,
        "calm": 20,
        "energetic": features["tempo"]["energyLevel"],
        "romantic": 20,
        "melancholic": 20,
        "mysterious": 20,
    }
    mood_key = features["mood"] if features["mood"] in emotions else "calm"
    emotions[mood_key] = max(emotions.get(mood_key, 20), 75)

    return {
        "song": song,
        "analysis": {
            "primaryTone": primary_tone,
            "secondaryTones": ["calm-peaceful", "nostalgic-reflective"] if primary_tone != "calm-peaceful" else ["nostalgic-reflective", "romantic-emotional"],
            "confidence": analysis_confidence(features, sentiment),
            "analysisSource": features.get("analysisSource", "audio"),
            "tempo": features["tempo"],
            "lyrics": sentiment,
            "emotions": emotions,
            "musicalCharacteristics": features["musicalCharacteristics"],
        },
        "similarSongs": [],
    }


def download_youtube_audio(url: str, target_dir: Path) -> Path:
    if yt_dlp is None:
        raise HTTPException(status_code=500, detail="yt-dlp is required for YouTube audio extraction")

    output_template = str(target_dir / "youtube_audio.%(ext)s")
    options = {
        "format": "bestaudio[ext=m4a]/bestaudio[ext=webm]/bestaudio/best",
        "outtmpl": output_template,
        "quiet": True,
        "noplaylist": True,
        "postprocessors": [{"key": "FFmpegExtractAudio", "preferredcodec": "wav"}],
    }
    try:
        with yt_dlp.YoutubeDL(options) as downloader:
            downloader.download([url])
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"YouTube download failed: {exc}") from exc

    output_path = target_dir / "youtube_audio.wav"
    if not output_path.exists():
        candidates = list(target_dir.glob("youtube_audio.*"))
        if not candidates:
            raise HTTPException(status_code=500, detail="Failed to extract YouTube audio")
        return candidates[0]
    return output_path


@app.get("/health")
def health() -> dict[str, bool]:
    return {
        "ok": True,
        "librosa": librosa is not None,
        "essentia": es is not None,
        "transformers": pipeline is not None,
        "ytDlp": yt_dlp is not None,
        "langdetect": detect is not None,
    }


@app.post("/analyze/youtube")
def analyze_youtube(payload: YouTubeAnalyzeRequest) -> dict[str, Any]:
    song = payload.song.model_dump(mode="json")
    if not song.get("url"):
        raise HTTPException(status_code=400, detail="YouTube URL is required")

    analysis_text = clean_analysis_text(f'{song.get("title", "")} {song.get("artist", "")}')
    features = fallback_features(analysis_text or song.get("id", "youtube"), audio_based=False)
    sentiment = analyze_sentiment(analysis_text)
    return build_response(song, features, sentiment)


@app.post("/analyze/upload")
async def analyze_upload(file: UploadFile = File(...)) -> dict[str, Any]:
    suffix = Path(file.filename or "upload.mp3").suffix or ".mp3"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        temp_file.write(await file.read())
        temp_path = Path(temp_file.name)

    try:
        features = extract_audio_features(temp_path)
    finally:
        temp_path.unlink(missing_ok=True)

    title = clean_analysis_text(Path(file.filename or "Uploaded Song").stem) or "Uploaded Song"
    song = {"id": f"upload-{title}", "title": title, "artist": "Unknown Artist", "platform": "upload"}
    sentiment = analyze_sentiment(title)
    return build_response(song, features, sentiment)
