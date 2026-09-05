from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.task import Task
from app.repositories.task_repository import TaskRepository
from app.schemas.task import TaskCreate, TaskUpdate

class TaskService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = TaskRepository()

    def create_task(self, user_id: int, task_data: TaskCreate):
        data = task_data.dict()
        data["user_id"] = user_id
        return self.repo.create(self.db, data)

    def get_tasks(self, user_id: int) -> List[Task]:
        return self.repo.get_by_user(self.db, user_id)

    def get_task(self, task_id: int):
        return self.repo.get(self.db, task_id)

    def update_task(self, task_id: int, task_data: TaskUpdate):
        data = {k: v for k, v in task_data.dict().items() if v is not None}
        return self.repo.update(self.db, task_id, data)

    def delete_task(self, task_id: int):
        return self.repo.delete(self.db, task_id)
