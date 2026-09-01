from fastapi import HTTPException, status
from app.daos.task_dao import TaskDAO
from app.schemas.task import TaskCreate, TaskUpdate

class TaskService:
    def __init__(self, task_dao: TaskDAO):
        self.task_dao = task_dao

    def get_user_tasks(self, user_id: int):
        return self.task_dao.get_by_user_id(user_id)

    def create_task_for_user(self, task_data: TaskCreate, user_id: int):
        return self.task_dao.create(
            title=task_data.title,
            description=task_data.description,
            is_completed=task_data.is_completed or False,
            user_id=user_id
        )

    def update_task_for_user(self, task_id: int, task_data: TaskUpdate, user_id: int):
        task = self.task_dao.get_by_id_and_user(task_id, user_id)
        if not task:
            raise HTTPException(404, "Task not found or you don't have permission")
        return self.task_dao.update(
            task=task,
            title=task_data.title,
            description=task_data.description,
            is_completed=task_data.is_completed
        )

    def delete_task_for_user(self, task_id: int, user_id: int):
        task = self.task_dao.get_by_id_and_user(task_id, user_id)
        if not task:
            raise HTTPException(404, "Task not found or you don't have permission")
        self.task_dao.delete(task)
        return True
