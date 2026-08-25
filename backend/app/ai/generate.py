from app.ai.config 
import AI_PROVIDER, OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL


#generate the response based on the prompt and context using the specified AI provider

def generate_response(prompt: str, context: str, system_prompt: str = None) -> str:
    if system_prompt is None:
        system_prompt = (
            "You are a helpful assistant. Answer based only on the provided context. "
            "If the answer is not in the context, say 'I do not know based on the provided documents.' "
            "Do not show your reasoning."
        )
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {prompt}"}
    ]
    if AI_PROVIDER == "openai":
        import openai
        client = openai.OpenAI(
            base_url=OPENAI_BASE_URL,
            api_key=OPENAI_API_KEY
        )
        completion = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=messages
        )
        return completion.choices[0].message.content
    raise ValueError(f"Unsupported AI provider: {AI_PROVIDER}")