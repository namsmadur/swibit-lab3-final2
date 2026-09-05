from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.task import TaskCreate, TaskUpdate, TaskOut
from app.services.task_service import TaskService
from app.models.task import Task

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")
router = APIRouter(prefix="/tasks", tags=["Tasks"])

# 🔥 تجاوز المصادقة (مؤقتاً)
def get_current_user(token: str = Depends(oauth2_scheme)) -> int:
    return 1

@router.post("", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user),
):
    return TaskService(db).create_task(user_id, task)

@router.get("", response_model=List[TaskOut])
def get_tasks(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user),
):
    return TaskService(db).get_tasks(user_id)

@router.get("/{task_id}", response_model=TaskOut)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user),
):
    service = TaskService(db)
    task = service.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return task

@router.put("/{task_id}", response_model=TaskOut)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user),
):
    service = TaskService(db)
    task = service.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return service.update_task(task_id, task_data)

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user),
):
    """
    حذف المهمة مباشرة من قاعدة البيانات.
    """
    print(f"🗑️ [BACKEND] DELETE request for task_id: {task_id}, user_id: {user_id}")
    
    # البحث عن المهمة
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        print(f"❌ [BACKEND] Task {task_id} not found")
        raise HTTPException(status_code=404, detail="Task not found")
    
    # التحقق من الصلاحية
    if task.user_id != user_id:
        print(f"❌ [BACKEND] User {user_id} not authorized to delete task {task_id}")
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # تنفيذ الحذف
    try:
        db.delete(task)
        db.commit()
        print(f"✅ [BACKEND] Task {task_id} deleted successfully")
        return {"message": "Task deleted successfully", "id": task_id}
    except Exception as e:
        db.rollback()
        print(f"❌ [BACKEND] Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
