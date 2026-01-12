from fastapi import Depends, APIRouter, HTTPException, Query
from sqlmodel import Session, SQLModel, create_engine, select
from uuid import UUID

from .models import (
    Profile,
    ProfilePublic,
    ProfileCreate,
    ProfileUpdate,
    Post,
    PostPublic,
    PostCreate,
    Chat,
    ChatPublic,
    ChatCreate,
    Message,
    MessagePublic,
    MessageCreate,
    ProfileChatLink,
)

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


router = APIRouter()


@router.post("/profiles/", response_model=ProfilePublic)
def create_profile(*, session: Session = Depends(get_session), profile: ProfileCreate):
    db_profile = Profile.model_validate(profile)
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)
    return db_profile


@router.get("/profiles/", response_model=list[ProfilePublic])
def read_profiles(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, le=100),
):
    profiles = session.exec(select(Profile).offset(offset).limit(limit)).all()
    return profiles


@router.get("/profiles/{profile_id}", response_model=ProfilePublic)
def read_profile(*, session: Session = Depends(get_session), profile_id: UUID):
    profile = session.get(Profile, profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.get("/users/{name}", response_model=ProfilePublic)
def read_user_by_name(*, session: Session = Depends(get_session), name: str):
    profile = session.exec(select(Profile).where(Profile.name == name)).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.patch("/profiles/{profile_id}", response_model=ProfilePublic)
def update_profile(
    *, session: Session = Depends(get_session), profile_id: UUID, profile: ProfileUpdate
):
    db_profile = session.get(Profile, profile_id)
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    profile_data = profile.model_dump(exclude_unset=True)
    db_profile.sqlmodel_update(profile_data)
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)
    return db_profile


@router.delete("/profiles/{profile_id}")
def delete_profile(*, session: Session = Depends(get_session), profile_id: UUID):
    profile = session.get(Profile, profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    session.delete(profile)
    session.commit()
    return {"ok": True}


@router.post("/posts/", response_model=PostPublic)
def create_post(*, session: Session = Depends(get_session), post: PostCreate):
    db_post = Post.model_validate(post)

    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post


@router.get("/posts/", response_model=list[PostPublic])
def read_posts(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, le=100),
):
    posts = session.exec(select(Post).offset(offset).limit(limit)).all()
    return posts


@router.get("/posts/{post_id}", response_model=PostPublic)
def read_post(*, session: Session = Depends(get_session), post_id: UUID):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.get("/profiles/{profile_id}/posts/", response_model=list[PostPublic])
def read_profile_posts(*, session: Session = Depends(get_session), profile_id: UUID):
    profile: Profile = session.get(Profile, profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile.posts


@router.post("/chats/", response_model=ChatPublic)
def create_chat(*, session: Session = Depends(get_session), chat: ChatCreate):
    # Validate that at least one profile_id is provided
    if not chat.profile_ids or len(chat.profile_ids) == 0:
        raise HTTPException(
            status_code=400, detail="At least one profile_id is required"
        )

    # Validate that all profile_ids exist
    profiles = []
    for profile_id in chat.profile_ids:
        profile = session.get(Profile, profile_id)
        if not profile:
            raise HTTPException(
                status_code=404, detail=f"Profile with id {profile_id} not found"
            )
        profiles.append(profile)

    # Create the chat
    db_chat = Chat.model_validate(chat)
    session.add(db_chat)
    session.commit()
    session.refresh(db_chat)

    # Create ProfileChatLink entries
    for profile in profiles:
        link = ProfileChatLink(profile_id=profile.id, chat_id=db_chat.id)
        session.add(link)

    session.commit()

    return db_chat


@router.get("/chats/", response_model=list[ChatPublic])
def read_chats(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, le=100),
):
    chats = session.exec(select(Chat).offset(offset).limit(limit)).all()
    return chats


@router.get("/chats/{chat_id}", response_model=ChatPublic)
def read_chat(*, session: Session = Depends(get_session), chat_id: UUID):
    chat = session.get(Chat, chat_id)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat


@router.post("/messages/", response_model=MessagePublic)
def create_message(*, session: Session = Depends(get_session), message: MessageCreate):
    # Validate that the chat_id exists
    chat = session.get(Chat, message.chat_id)
    if not chat:
        raise HTTPException(
            status_code=404, detail=f"Chat with id {message.chat_id} not found"
        )

    # Validate that the profile_id exists (if provided)
    # For now, we'll assume profile_id is part of the message or associated with the chat
    # In a real implementation, you might want to validate the profile as well

    db_message = Message.model_validate(message)
    session.add(db_message)
    session.commit()
    session.refresh(db_message)
    return db_message


@router.get("/messages/", response_model=list[MessagePublic])
def read_messages(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, le=100),
):
    messages = session.exec(select(Message).offset(offset).limit(limit)).all()
    return messages


@router.get("/chats/{chat_id}/messages/", response_model=list[MessagePublic])
def read_chat_messages(*, session: Session = Depends(get_session), chat_id: UUID):
    chat = session.get(Chat, chat_id)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    # Get messages for this chat
    messages = session.exec(select(Message).where(Message.chat_id == chat_id)).all()
    return messages
