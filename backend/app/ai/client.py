import httpx
from typing import List, Dict, Any

from app.ai.config import ai_settings
from app.ai.schemas import ChatMessage

class LMStudioClient:
    """
    Asynchronous client for interacting with LM Studio's OpenAI-compatible API.
    """

    def __init__(self):
        self.base_url = ai_settings.LM_STUDIO_URL
        self.model = ai_settings.LM_STUDIO_MODEL
        self.api_key = ai_settings.LM_STUDIO_API_KEY

    async def chat_completion(
        self,
        messages: List[ChatMessage],
        temperature: float = 0.7,
        max_tokens: int = 1000,
        context: str | None = None,
    ) -> Dict[str, Any]:
        """
        Send a chat completion request to LM Studio.

        Args:
            messages: List of chat messages (user, assistant, system)
            temperature: Sampling temperature (0.0 - 2.0)
            max_tokens: Maximum tokens to generate
            context: Optional RAG context to inject as system message

        Returns:
            Raw response from LM Studio API
        """
        # Convert to LM Studio format
        formatted_messages = [{"role": msg.role, "content": msg.content} for msg in messages]

        # Inject context as system message if provided
        if context:
            formatted_messages.insert(0, {
                "role": "system",
                "content": f"Use the following context to answer the user's question:\n\n{context}"
            })

        payload = {
            "model": self.model,
            "messages": formatted_messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": False,
        }

        headers = {"Content-Type": "application/json"}
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"

        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                json=payload,
                headers=headers,
            )
            response.raise_for_status()
            return response.json()

    async def health_check(self) -> bool:
        """
        Check if LM Studio is available.

        Returns:
            True if LM Studio is running and responding, False otherwise.
        """
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(f"{self.base_url}/models")
                return response.status_code == 200
        except Exception:
            return False
