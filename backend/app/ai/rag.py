import os
from typing import List, Dict
from app.ai.embeddings import get_embedding, cosine_similarity
from app.ai.config import TOP_K_RESULTS, CHUNK_SIZE, CHUNK_OVERLAP, POLICIES_DIR


_vector_store: List[Dict] = []

def chunk_text(text: str) -> List[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + CHUNK_SIZE
        chunks.append(text[start:end])
        start = end - CHUNK_OVERLAP
    return chunks
#Reads policy files chunks them converts them into vector and stores them in memory
def load_policies():
    global _vector_store
    _vector_store = []
    if not os.path.exists(POLICIES_DIR):
        print(f"Warning: {POLICIES_DIR} not found.")
        return
    for filename in os.listdir(POLICIES_DIR):
        if filename.endswith((".md", ".txt")):
            with open(os.path.join(POLICIES_DIR, filename), "r", encoding="utf-8") as f:
                content = f.read()
                chunks = chunk_text(content)
                for chunk in chunks:
                    embedding = get_embedding(chunk)
                    _vector_store.append({
                        "text": chunk,
                        "embedding": embedding,
                        "source": filename
                    })
    print(f"Loaded {len(_vector_store)} chunks.")
#It receives a question converts it into a vector and searches for the three most similar segments
def retrieve(query: str) -> List[Dict]:
    if not _vector_store:
        load_policies()
        if not _vector_store:
            return []
    query_embedding = get_embedding(query)
    scored = []
    for item in _vector_store:
        score = cosine_similarity(query_embedding, item["embedding"])
        scored.append({"text": item["text"], "source": item["source"], "score": score})
    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:TOP_K_RESULTS]