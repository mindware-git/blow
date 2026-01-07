import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine, select
from sqlmodel.pool import StaticPool

from ..main import app
from ..models import Profile, Post
from ..routers import get_session


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        # 테스트용 프로필 2개 추가
        profile_1 = Profile(name="TestUser1", bio="Test Bio 1")
        profile_2 = Profile(name="TestUser2", bio="Test Bio 2")
        session.add(profile_1)
        session.add(profile_2)
        session.commit()
        yield session


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


@pytest.fixture(name="profiles")
def profiles_fixture(session: Session):
    profiles = session.exec(select(Profile)).all()
    return profiles


def test_create_post(client: TestClient, profiles: list):
    # 첫 번째 프로필 ID로 게시물 생성
    post_data = {
        "text": "Test post content",
        "media_urls": "https://example.com/image.jpg",
        "profile_id": str(profiles[0].id),
    }

    response = client.post("/posts/", json=post_data)
    data = response.json()

    assert response.status_code == 200
    assert data["text"] == post_data["text"]
    assert data["media_urls"] == post_data["media_urls"]
    assert data["profile_id"] == post_data["profile_id"]


def test_create_post_invalid(client: TestClient):
    # 유효하지 않은 프로필 ID로 게시물 생성 시도
    post_data = {
        "text": "Test post content",
        "media_urls": "https://example.com/image.jpg",
        "profile_id": "invalid-uuid",
    }

    response = client.post("/posts/", json=post_data)
    assert response.status_code == 422


def test_read_posts(client: TestClient, profiles: list):
    # 게시물 생성
    post_1 = Post(
        text="First post",
        media_urls="https://example.com/image1.jpg",
        profile_id=profiles[0].id,
    )
    post_2 = Post(
        text="Second post",
        media_urls="https://example.com/image2.jpg",
        profile_id=profiles[1].id,
    )

    # 수동으로 게시물 추가 (테스트용)
    response_1 = client.post(
        "/posts/",
        json={
            "text": post_1.text,
            "media_urls": post_1.media_urls,
            "profile_id": str(post_1.profile_id),
        },
    )

    response_2 = client.post(
        "/posts/",
        json={
            "text": post_2.text,
            "media_urls": post_2.media_urls,
            "profile_id": str(post_2.profile_id),
        },
    )

    # 게시물 조회
    response = client.get("/posts/")
    data = response.json()

    assert response.status_code == 200
    assert len(data) == 2
    assert data[0]["text"] == post_1.text
    assert data[0]["media_urls"] == post_1.media_urls
    assert data[1]["text"] == post_2.text
    assert data[1]["media_urls"] == post_2.media_urls


def test_read_post(client: TestClient, profiles: list):
    # 게시물 생성
    post_data = {
        "text": "Test post",
        "media_urls": "https://example.com/image.jpg",
        "profile_id": str(profiles[0].id),
    }

    create_response = client.post("/posts/", json=post_data)
    created_post = create_response.json()

    # 생성된 게시물 조회
    response = client.get(f"/posts/{created_post['id']}")
    data = response.json()

    assert response.status_code == 200
    assert data["text"] == post_data["text"]
    assert data["media_urls"] == post_data["media_urls"]
    assert data["profile_id"] == post_data["profile_id"]


def test_read_profile_posts(client: TestClient, profiles: list):
    # 첫 번째 프로필의 게시물 생성
    post_1 = Post(
        text="First post by TestUser1",
        media_urls="https://example.com/image1.jpg",
        profile_id=profiles[0].id,
    )
    post_2 = Post(
        text="Second post by TestUser1",
        media_urls="https://example.com/image2.jpg",
        profile_id=profiles[0].id,
    )

    # 수동으로 게시물 추가 (테스트용)
    client.post(
        "/posts/",
        json={
            "text": post_1.text,
            "media_urls": post_1.media_urls,
            "profile_id": str(post_1.profile_id),
        },
    )

    client.post(
        "/posts/",
        json={
            "text": post_2.text,
            "media_urls": post_2.media_urls,
            "profile_id": str(post_2.profile_id),
        },
    )

    # 프로필별 게시물 조회
    response = client.get(f"/profiles/{profiles[0].id}/posts/")
    data = response.json()

    assert response.status_code == 200
    assert len(data) == 2
    assert data[0]["text"] == post_1.text
    assert data[1]["text"] == post_2.text
