import requests
import numpy as np
from app.ai.config import AI_PROVIDER, OPENAI_API_KEY, OPENAI_BASE_URL, EMBEDDING_MODEL

#To convert it into vector embeddings, 
def get_embedding(text: str) -> list[float]:
    if AI_PROVIDER == "openai":
        import openai
        client = openai.OpenAI(
            base_url=OPENAI_BASE_URL,
            api_key=OPENAI_API_KEY
        )
        response = client.embeddings.create(
            model=EMBEDDING_MODEL,
            input=text
        )
        return response.data[0].embedding
    raise ValueError(f"Unsupported AI provider: {AI_PROVIDER}")

#its calculates the similarity between two vectors 
def cosine_similarity(vec_a: list[float], vec_b: list[float]) -> float:
    a = np.array(vec_a)
    b = np.array(vec_b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))