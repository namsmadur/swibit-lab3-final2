from fastapi import APIRouter, Depends, Path, status
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.task import TaskCreate, TaskUpdate, TaskOut
from app.services.task_service import TaskService
from app.dependencies import get_task_service

router = APIRouter(
    dependencies=[Depends(get_current_user)],
    tags=["Tasks"]
)

@router.get("/", response_model=list[TaskOut])
def get_tasks(
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service)
):
    return task_service.get_user_tasks(current_user.id)

@router.post("/", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_new_task(
    task: TaskCreate,
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service)
):
    return task_service.create_task_for_user(task, current_user.id)

@router.put("/{task_id}", response_model=TaskOut)
def update_existing_task(
    task_id: int = Path(..., ge=1),
    task_update: TaskUpdate = None,
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service)
):
    return task_service.update_task_for_user(task_id, task_update, current_user.id)

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_task(
    task_id: int = Path(..., ge=1),
    current_user: User = Depends(get_current_user),
    task_service: TaskService = Depends(get_task_service)
):
    task_service.delete_task_for_user(task_id, current_user.id)
    return None
e.delete_task_for_user(task_id)
    return None