from fastapi.testclient import TestClient

import backend.main as main

app = main.app


def test_analyze_youtube_requires_valid_url() -> None:
    client = TestClient(app)
    resp = client.post(
        "/analyze/youtube",
        json={
            "song": {
                "id": "not-a-video-id",
                "title": "x",
                "artist": "y",
                "platform": "youtube",
                "url": "https://example.com",
            }
        },
    )
    assert resp.status_code == 400


def test_analyze_youtube_success_shape(monkeypatch) -> None:
    monkeypatch.setattr(main, "fetch_youtube_lyrics", lambda _video_id, _langs: "We're no strangers to love")
    client = TestClient(app)
    resp = client.post(
        "/analyze/youtube",
        json={
            "song": {
                "id": "dQw4w9WgXcQ",
                "title": "Never Gonna Give You Up",
                "artist": "Rick Astley",
                "platform": "youtube",
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            }
        },
    )
    assert resp.status_code == 200
    payload = resp.json()
    assert "analysis" in payload
    assert "lyrics" in payload["analysis"]
    assert payload["analysis"]["lyrics"]["hasLyrics"] is True


def test_debug_youtube_lyrics_disabled_by_default() -> None:
    client = TestClient(app)
    resp = client.post(
        "/debug/youtube-lyrics",
        json={
            "song": {
                "id": "dQw4w9WgXcQ",
                "title": "Never Gonna Give You Up",
                "artist": "Rick Astley",
                "platform": "youtube",
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            }
        },
    )
    assert resp.status_code == 404
