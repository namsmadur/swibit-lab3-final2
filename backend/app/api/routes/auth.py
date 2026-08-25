from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.user import UserCreate, UserOut, LoginRequest, Token
from app.services.auth_service import AuthService

router = APIRouter()

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    auth_service = AuthService(db)
    new_user = auth_service.register_user(user)
    return new_user

@router.post("/login", response_model=Token)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    auth_service = AuthService(db)
    user = auth_service.authenticate_user(
        login_data.username,
        login_data.password
    )
    token = auth_service.create_access_token(user.username)
    return {"access_token": token, "token_type": "bearer"}