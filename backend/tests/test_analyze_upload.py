from io import BytesIO

from fastapi.testclient import TestClient

import backend.main as main


def test_analyze_upload_success_shape(monkeypatch) -> None:
    monkeypatch.setattr(
        main,
        "extract_audio_features",
        lambda _path: {
            "tempo": {
                "bpm": 100,
                "tempoCategory": "moderate",
                "rhythmPattern": "Moderate groove",
                "energyLevel": 60,
                "consistency": 70,
            },
            "musicalCharacteristics": {
                "key": "C Major",
                "mode": "major",
                "timeSignature": "4/4",
                "loudness": -8,
                "acousticness": 0.4,
                "instrumentalness": 0.1,
                "danceability": 0.6,
            },
            "genre": "pop",
            "mood": "happy",
            "analysisSource": "audio",
        },
    )

    client = TestClient(main.app)
    file_content = BytesIO(b"dummy")
    resp = client.post(
        "/analyze/upload",
        files={"file": ("sample.mp3", file_content, "audio/mpeg")},
    )
    assert resp.status_code == 200
    payload = resp.json()
    assert "analysis" in payload
    assert "tempo" in payload["analysis"]
