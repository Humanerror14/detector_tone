from fastapi.testclient import TestClient

from backend.main import app


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


def test_analyze_youtube_success_shape() -> None:
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
