from fastapi import Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.daos.user_dao import UserDAO
from app.daos.task_dao import TaskDAO
from app.services.auth_service import AuthService
from app.services.task_service import TaskService

def get_user_dao(db: Session = Depends(get_db)) -> UserDAO:
    return UserDAO(db)

def get_task_dao(db: Session = Depends(get_db)) -> TaskDAO:
    return TaskDAO(db)

def get_auth_service(
    user_dao: UserDAO = Depends(get_user_dao)
) -> AuthService:
    return AuthService(user_dao)

def get_task_service(
    task_dao: TaskDAO = Depends(get_task_dao)
) -> TaskService:
    return TaskService(task_dao)
