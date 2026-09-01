from fastapi import APIRouter, Depends, status
from app.schemas.user import UserCreate, UserOut, LoginRequest, Token
from app.services.auth_service import AuthService
from app.dependencies import get_auth_service

router = APIRouter()

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(
    user: UserCreate,
    auth_service: AuthService = Depends(get_auth_service)
):
    return auth_service.register_user(user)

@router.post("/login", response_model=Token)
def login(
    login_data: LoginRequest,
    auth_service: AuthService = Depends(get_auth_service)
):
    user = auth_service.authenticate_user(login_data.username, login_data.password)
    token = auth_service.create_access_token(user.username)
    return {"access_token": token, "token_type": "bearer"}
