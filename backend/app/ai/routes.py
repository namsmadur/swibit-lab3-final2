from fastapi import APIRouter, HTTPException, status
from app.ai.schemas import ChatRequest, ChatResponse
from app.ai.service import AIService

router = APIRouter(prefix="/ai", tags=["AI Assistant"])

# ✅ تجاوز المصادقة بالكامل (لا نحتاج إلى توكن)
def get_current_user() -> int:
    return 1

@router.get("/health", summary="Check AI service availability")
async def health_check():
    """
    Check if LM Studio is available and responsive.
    """
    service = AIService()
    is_available = await service.check_availability()
    return {
        "status": "available" if is_available else "unavailable",
        "service": "LM Studio",
        "url": "http://localhost:1234/v1",
    }

@router.post("/chat", response_model=ChatResponse, summary="Chat with AI assistant")
async def chat(
    request: ChatRequest,
    user_id: int = 1,  # ✅ تجاهل المستخدم (لا نحتاج إلى مصادقة)
):
    """
    Send a message to the AI assistant and get a response.
    """
    service = AIService()

    try:
        response = await service.process_chat(request)
        return response
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}",
        )
