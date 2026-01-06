from sqlmodel import Field, Session, SQLModel, create_engine, Relationship
import uuid
from datetime import datetime, timezone

# updated, created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# 연결 테이블 정의
class ProfileChatLink(SQLModel, table=True):
    profile_id: uuid.UUID = Field(foreign_key="profile.id", primary_key=True)
    chat_id: uuid.UUID = Field(foreign_key="chat.id", primary_key=True)


class ProfileBase(SQLModel):
    name: str = Field(unique=True)
    bio: str | None = None
    avatar: str | None = None
    posts_count: int = 0
    followers_count: int = 0
    following_count: int = 0


class Profile(ProfileBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    chats: list["Chat"] = Relationship(
        back_populates="profiles", link_model=ProfileChatLink
    )

    messages: list["Message"] = Relationship(back_populates="profile")
    posts: list["Post"] = Relationship(back_populates="profile")
    comments: list["Comment"] = Relationship(back_populates="profile")


class ProfileCreate(ProfileBase):
    pass


class ProfilePublic(ProfileBase):
    id: uuid.UUID


class ProfileUpdate(SQLModel):
    name: str | None = None


# data model
class ChatBase(SQLModel):
    name: str = Field(index=True)


# table model
class Chat(ChatBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    profiles: list["Profile"] = Relationship(
        back_populates="chats", link_model=ProfileChatLink
    )
    messages: list["Message"] = Relationship(back_populates="chat")


class Message(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    text: str

    chat_id: uuid.UUID = Field(foreign_key="chat.id")
    chat: "Chat" = Relationship(back_populates="messages")

    profile_id: uuid.UUID = Field(foreign_key="profile.id")
    profile: "Profile" = Relationship(back_populates="messages")


class Post(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    text: str | None = None
    media_urls: str

    profile_id: uuid.UUID = Field(foreign_key="profile.id")
    profile: "Profile" = Relationship(back_populates="posts")

    comments: list["Comment"] = Relationship(back_populates="post")


class Comment(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    parent_id: uuid.UUID | None = Field(default=None, foreign_key="comment.id")
    text: str

    post_id: uuid.UUID = Field(foreign_key="post.id")
    post: "Post" = Relationship(back_populates="comments")

    profile_id: uuid.UUID = Field(foreign_key="profile.id")
    profile: "Profile" = Relationship(back_populates="comments")


# class PostPublicWithComments(PostPublic):
#     comments: list[CommentPublic] = []


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def create_profiles():
    profiles_data = [
        {
            "name": "TestUser",
            "avatar": "https://i.postimg.cc/sXScNL2w/aria.png",
            "bio": "This is testuser!.",
            "posts_count": 34,
            "followers_count": 1200,
            "following_count": 180,
        },
        {
            "name": "aria",
            "avatar": "https://i.postimg.cc/sXScNL2w/aria.png",
            "bio": "Product designer who loves minimalism and coffee.",
            "posts_count": 34,
            "followers_count": 1200,
            "following_count": 180,
        },
        {
            "name": "sofiar",
            "avatar": "https://i.postimg.cc/hzDTJpTm/sofiar.png",
            "bio": "Fashion and lifestyle creator based in Milan.",
            "posts_count": 58,
            "followers_count": 3420,
            "following_count": 410,
        },
        {
            "name": "mayap",
            "avatar": "https://i.postimg.cc/cgxwKXww/mayap.png",
            "bio": "Startup marketer. Growth, data, and storytelling.",
            "posts_count": 21,
            "followers_count": 980,
            "following_count": 260,
        },
        {
            "name": "lina",
            "avatar": "https://i.postimg.cc/3WDRBcm7/lina.png",
            "bio": "Photographer capturing everyday beauty.",
            "posts_count": 76,
            "followers_count": 5100,
            "following_count": 600,
        },
        {
            "name": "yukit",
            "avatar": "https://i.postimg.cc/hh7jr5Tv/yukit.png",
            "bio": "Illustrator and indie game art enthusiast.",
            "posts_count": 44,
            "followers_count": 2300,
            "following_count": 310,
        },
        {
            "name": "amina",
            "avatar": "https://i.postimg.cc/Yjm93sYw/amina.png",
            "bio": "UX researcher passionate about human-centered design.",
            "posts_count": 19,
            "followers_count": 870,
            "following_count": 140,
        },
        {
            "name": "emmaw",
            "avatar": "https://i.postimg.cc/Bt16gVH9/emmaw.png",
            "bio": "Remote worker sharing productivity tips.",
            "posts_count": 62,
            "followers_count": 4100,
            "following_count": 520,
        },
        {
            "name": "norab",
            "avatar": "https://example.com/avatars/nora.jpg",
            "bio": "Tech writer exploring AI and creativity.",
            "posts_count": 28,
            "followers_count": 1500,
            "following_count": 230,
        },
        {
            "name": "danielm",
            "avatar": "https://example.com/avatars/daniel.jpg",
            "bio": "Backend engineer. APIs, databases, scalability.",
            "posts_count": 15,
            "followers_count": 640,
            "following_count": 120,
        },
        {
            "name": "leos",
            "avatar": "https://example.com/avatars/leo.jpg",
            "bio": "Indie maker building small but useful products.",
            "posts_count": 23,
            "followers_count": 910,
            "following_count": 200,
        },
        {
            "name": "lincoln",
            "avatar": "https://i.postimg.cc/SjzsrvCh/lincoln.png",
            "bio": "16th President of the United States. Preserved the Union, abolished slavery.",
            "posts_count": 5,
            "followers_count": 1865000,
            "following_count": 1,
        },
        {
            "name": "sejong",
            "avatar": "https://i.postimg.cc/3JMdrKTN/sejong.png",
            "bio": "4th King of Joseon. Creator of Hangul, the Korean alphabet.",
            "posts_count": 1443,
            "followers_count": 10000000,
            "following_count": 25,
        },
        {
            "name": "guanyu",
            "avatar": "https://i.postimg.cc/L5Y3gZz7/guanyu.png",
            "bio": "General serving under Liu Bei. Embodiment of loyalty and righteousness.",
            "posts_count": 3,
            "followers_count": 500000,
            "following_count": 2,
        },
        {
            "name": "newton",
            "avatar": "https://i.postimg.cc/C1R2S1yY/newton.png",
            "bio": "Physicist, mathematician, astronomer. Laid the foundations for classical mechanics.",
            "posts_count": 3,
            "followers_count": 1687000,
            "following_count": 0,
        },
        {
            "name": "curie",
            "avatar": "https://i.postimg.cc/J0b6D3gM/curie.png",
            "bio": "Physicist and chemist who conducted pioneering research on radioactivity.",
            "posts_count": 2,
            "followers_count": 1900000,
            "following_count": 1,
        },
        {
            "name": "sunsin",
            "avatar": "https://i.postimg.cc/vB7gXzY9/sunsin.png",
            "bio": "Korean admiral and military general famed for his victories against the Japanese navy.",
            "posts_count": 23,
            "followers_count": 1200000,
            "following_count": 0,
        },
    ]

    with Session(engine) as session:
        for profile_data in profiles_data:
            profile = Profile(**profile_data)
            session.add(profile)
        session.commit()


def main():
    create_db_and_tables()
    create_profiles()


if __name__ == "__main__":
    main()
