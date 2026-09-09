from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, get_password_hash, create_access_token
from app.schemas.user import UserCreate

class AuthService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = UserRepository()

    def register(self, user_data: UserCreate):
        existing = self.repo.get_by_email(self.db, user_data.email)
        if existing:
            raise ValueError("Email already registered")
        hashed = get_password_hash(user_data.password)
        return self.repo.create(self.db, {"email": user_data.email, "hashed_password": hashed, "username": user_data.email})

    def login(self, email: str, password: str):
        user = self.repo.get_by_email(self.db, email)
        if not user or not verify_password(password, user.hashed_password):
            raise ValueError("Invalid credentials")
        return create_access_token(data={"sub": str(user.id)})

