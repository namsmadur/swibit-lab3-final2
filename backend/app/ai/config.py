import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from the .env file located in the project root
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
ENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

# Read AI-related configuration from environment variables
AI_PROVIDER = os.getenv("AI_PROVIDER", "openai")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-no-key-required")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "http://127.0.0.1:1234/v1")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "deepseek/deepseek-r1-0528-qwen3-8b")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "text-embedding-nomic-embed-text-v1.5")
TOP_K_RESULTS = int(os.getenv("TOP_K_RESULTS", 3))
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", 500))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", 50))
POLICIES_DIR = BASE_DIR / "docs" / "policies"