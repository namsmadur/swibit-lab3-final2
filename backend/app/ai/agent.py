import json
from app.ai.rag import retrieve
from app.ai.generate import generate_response



def ask_assistant(query: str) -> dict:
    retrieved_docs = retrieve(query)
    if not retrieved_docs:
        return {
            "answer": "I could not find relevant information.",
            "sources": []
        }
    context = "\n\n---\n\n".join([doc["text"] for doc in retrieved_docs])
    sources = list(set([doc["source"] for doc in retrieved_docs]))
    raw_answer = generate_response(query, context)
    try:
        start = raw_answer.find('{')
        end = raw_answer.rfind('}') + 1
        if start != -1 and end != -1:
            parsed = json.loads(raw_answer[start:end])
            answer = parsed.get("answer", raw_answer)
            if "sources" in parsed:
                sources = list(set(sources + parsed["sources"]))
        else:
            answer = raw_answer
    except:
        answer = raw_answer
    return {
        "answer": answer,
        "sources": sources
    }