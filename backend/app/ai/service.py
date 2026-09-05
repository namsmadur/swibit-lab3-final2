from app.ai.client import LMStudioClient
from app.ai.schemas import ChatRequest, ChatResponse

class AIService:
    """
    Service layer for AI operations.
    Handles business logic before/after calling the AI client.
    """

    def __init__(self):
        self.client = LMStudioClient()

    async def process_chat(self, request: ChatRequest) -> ChatResponse:
        """
        Process a chat request and return the AI response.

        Args:
            request: ChatRequest containing messages and parameters

        Returns:
            ChatResponse with the AI's reply
        """
        try:
            response_data = await self.client.chat_completion(
                messages=request.messages,
                temperature=request.temperature,
                max_tokens=request.max_tokens,
                context=request.context,
            )

            # Extract response text
            if response_data.get("choices") and len(response_data["choices"]) > 0:
                response_text = response_data["choices"][0]["message"]["content"]
            else:
                response_text = "No response from the model."

            return ChatResponse(
                response=response_text,
                model=response_data.get("model", "unknown"),
                usage=response_data.get("usage"),
            )
        except Exception as e:
            raise RuntimeError(f"AI service error: {str(e)}")

    async def check_availability(self) -> bool:
        """Check if the underlying AI client is available."""
        return await self.client.health_check()
