from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.auth import router as auth_router
from app.api.routes.tasks import router as tasks_router
from app.api.routes.assistant import router as assistant_router
from app.core.database import Base, engine

app = FastAPI(title="Swibit Lab", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(tasks_router, prefix="/tasks", tags=["Tasks"])
app.include_router(assistant_router, prefix="/assistant", tags=["AI Assistant"])

@app.get("/")
def root():
    return {"message": "Swibit Lab API v1.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}
