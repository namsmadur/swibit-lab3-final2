from pydantic_settings import BaseSettings
from typing import Optional

class AISettings(BaseSettings):
    LM_STUDIO_URL: str = "http://localhost:1234/v1"
    LM_STUDIO_MODEL: str = "local-model"
    LM_STUDIO_API_KEY: Optional[str] = None

    class Config:
        env_file = ".env"
        extra = "ignore"

ai_settings = AISettings()
