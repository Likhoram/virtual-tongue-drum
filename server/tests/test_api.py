import json


def test_get_songs(client):
    response = client.get("/api/songs")

    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]["title"] == "Test Song"


def test_get_song_by_id(client):
    response = client.get("/api/songs/1")

    assert response.status_code == 200
    data = response.get_json()
    assert data["id"] == 1
    assert data["title"] == "Test Song"


def test_get_song_not_found(client):
    response = client.get("/api/songs/999")

    assert response.status_code == 404
    data = response.get_json()
    assert data["error"] == "Song not found"


def test_save_score_creates_user_and_rank(client):
    payload = {
        "username": "TestBot",
        "song_id": 1,
        "score": 100,
        "mistakes": 0,
    }

    response = client.post(
        "/api/scores",
        data=json.dumps(payload),
        content_type="application/json",
    )

    assert response.status_code == 201
    data = response.get_json()
    assert data["username"] == "TestBot"
    assert data["song_id"] == 1
    assert data["score"] == 100
    assert data["rank"] == 1


def test_save_score_missing_data(client):
    response = client.post(
        "/api/scores",
        data=json.dumps({"username": "OnlyName"}),
        content_type="application/json",
    )

    assert response.status_code == 400
    data = response.get_json()
    assert data["error"] == "Missing data"


def test_get_scores_returns_list(client):
    payloads = [
        {"username": "A", "song_id": 1, "score": 50, "mistakes": 1},
        {"username": "B", "song_id": 1, "score": 90, "mistakes": 0},
        {"username": "C", "song_id": 1, "score": 70, "mistakes": 2},
    ]

    for payload in payloads:
        client.post(
            "/api/scores",
            data=json.dumps(payload),
            content_type="application/json",
        )

    response = client.get("/api/scores")

    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 3
    assert data[0]["score"] >= data[1]["score"] >= data[2]["score"]
