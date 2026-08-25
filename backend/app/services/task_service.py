from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate

class TaskService:
    def __init__(self, db: Session):
        self.db = db

    def get_user_tasks(self, user_id: int):
        return self.db.query(Task).filter(Task.user_id == user_id).all()

    def create_task_for_user(self, task_data: TaskCreate, user_id: int):
        new_task = Task(
            title=task_data.title,
            description=task_data.description,
            is_completed=task_data.is_completed or False,
            user_id=user_id
        )
        self.db.add(new_task)
        self.db.commit()
        self.db.refresh(new_task)
        return new_task

    def update_task_for_user(self, task_id: int, task_data: TaskUpdate, user_id: int):
        task = self.db.query(Task).filter(
            Task.id == task_id,
            Task.user_id == user_id
        ).first()
        
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found or you don't have permission"
            )
        
        update_data = task_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(task, key, value)
        
        self.db.commit()
        self.db.refresh(task)
        return task

    def delete_task_for_user(self, task_id: int, user_id: int):
        task = self.db.query(Task).filter(
            Task.id == task_id,
            Task.user_id == user_id
        ).first()
        
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found or you don't have permission"
            )
        
        self.db.delete(task)
        self.db.commit()
        return True