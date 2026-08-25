from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.ai.agent import ask_assistant
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

class AskRequest(BaseModel):
    query: str

class AskResponse(BaseModel):
    answer: str
    sources: list[str]

@router.post("/ask", response_model=AskResponse)
def ask_question(
    request: AskRequest,
    current_user: User = Depends(get_current_user)
):
    if not request.query or len(request.query.strip()) == 0:
        raise HTTPException(400, "Query cannot be empty")
    
    result = ask_assistant(request.query)
    
    return AskResponse(
        answer=result["answer"],
        sources=result["sources"]
    )