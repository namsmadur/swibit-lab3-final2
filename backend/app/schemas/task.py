from pydantic import BaseModel, Field
from typing import Optional

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: Optional[str] = Field("pending", pattern="^(pending|in_progress|completed)$")

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: Optional[str] = Field(None, pattern="^(pending|in_progress|completed)$")

class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: str
    user_id: int
    class Config:
        from_attributes = True
