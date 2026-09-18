from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

@router.post("/")
async def chat_with_bot(request: ChatRequest):
    # TODO: Connect this to LLM API (e.g. Gemini, OpenAI)
    # Placeholder logic
    return {
        "reply": f"Hello! I received your message: '{request.message}'. Currently, I am a placeholder for the real AI model."
    }
