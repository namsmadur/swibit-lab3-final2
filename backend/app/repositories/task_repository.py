from sqlalchemy.orm import Session
from app.models.task import Task
from app.repositories.base import BaseRepository

class TaskRepository(BaseRepository[Task]):
    def __init__(self):
        super().__init__(Task)

    def get_by_user(self, db: Session, user_id: int, skip: int = 0, limit: int = 100):
        return db.query(Task).filter(Task.user_id == user_id).offset(skip).limit(limit).all()
