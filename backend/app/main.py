from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes import auth, tasks, verify
from app.ai import routes as ai_routes
from app.core.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Swibit Lab3 API",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(tasks.router, prefix="/api/v1")
app.include_router(ai_routes.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Swibit Lab3 API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

