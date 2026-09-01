from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.ai.rag_pipeline import ask_assistant
from backend.app.core.security import get_current_user
from backend.app.models.user import User

#it receives a request (a question) from the user 
# checks the incomplete set, and calls Ask_assistant
#  from rag_pipeline  subsequently, it handles cases where an 
# answer cannot be provided and manages the sources.
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