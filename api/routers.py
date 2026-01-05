from fastapi import APIRouter, HTTPException
from sqlmodel import Session, create_engine, select
from models import Profile, ProfileCreate, ProfileUpdate, ProfilePublic

router = APIRouter()


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


@router.get("/profiles/", response_model=list[Profile])
async def read_users():
    with Session(engine) as session:
        profiles = session.exec(select(Profile)).all()
        return profiles


@router.post("/profiles/")
async def create_profile(profile: ProfileCreate):
    with Session(engine) as session:
        db_profile = Profile.model_validate(profile)
        session.add(db_profile)
        session.commit()
        session.refresh(db_profile)
        return db_profile


@router.get("/profiles/{name}", response_model=Profile)
async def read_user(name: str):
    with Session(engine) as session:
        profile = session.get(Profile, name)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        return profile


@router.patch("/profiles/{name}", response_model=ProfilePublic)
def update_profile(name: str, profile: ProfileUpdate):
    with Session(engine) as session:
        db_profile = session.get(Profile, name)
        if not db_profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        profile_data = profile.model_dump(exclude_unset=True)
        db_profile.sqlmodel_update(profile_data)
        session.add(db_profile)
        session.commit()
        session.refresh(db_profile)
        return db_profile
