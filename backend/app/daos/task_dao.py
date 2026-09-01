from sqlalchemy.orm import Session
from app.models.task import Task

class TaskDAO:
    def __init__(self, db: Session):
        self.db = db

    def get_by_user_id(self, user_id: int):
        return self.db.query(Task).filter(Task.user_id == user_id).all()

    def get_by_id_and_user(self, task_id: int, user_id: int):
        return self.db.query(Task).filter(
            Task.id == task_id,
            Task.user_id == user_id
        ).first()

    def create(self, title: str, description: str, is_completed: bool, user_id: int):
        task = Task(
            title=title,
            description=description,
            is_completed=is_completed,
            user_id=user_id
        )
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def update(self, task: Task, title: str = None, description: str = None, is_completed: bool = None):
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        if is_completed is not None:
            task.is_completed = is_completed
        self.db.commit()
        self.db.refresh(task)
        return task

    def delete(self, task: Task):
        self.db.delete(task)
        self.db.commit()
