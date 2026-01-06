from fastapi import Depends, APIRouter, HTTPException, Query
from sqlmodel import Session, SQLModel, create_engine, select
from uuid import UUID

from .models import Profile, ProfilePublic, ProfileCreate, ProfileUpdate

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
