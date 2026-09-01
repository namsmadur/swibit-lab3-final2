from fastapi import HTTPException, status
from datetime import timedelta
import os
from app.daos.user_dao import UserDAO
from app.core.security import get_password_hash, verify_password, create_access_token
from app.schemas.user import UserCreate

class AuthService:
    def __init__(self, user_dao: UserDAO):
        self.user_dao = user_dao

    def register_user(self, user_data: UserCreate):
        if self.user_dao.get_by_username(user_data.username):
            raise HTTPException(400, "Username already registered")
        if self.user_dao.get_by_email(user_data.email):
            raise HTTPException(400, "Email already registered")
        hashed_password = get_password_hash(user_data.password)
        return self.user_dao.create(
            username=user_data.username,
            email=user_data.email,
            hashed_password=hashed_password
        )

    def authenticate_user(self, username: str, password: str):
        user = self.user_dao.get_by_username(username)
        if not user:
            raise HTTPException(401, "Incorrect credentials")
        if not verify_password(password, user.hashed_password):
            raise HTTPException(401, "Incorrect credentials")
        return user

    def create_access_token(self, username: str) -> str:
        expires_delta = timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)))
        return create_access_token(data={"sub": username}, expires_delta=expires_delta)
