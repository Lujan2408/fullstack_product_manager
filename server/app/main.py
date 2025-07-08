# FastAPI application

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.main import api_router
from app.core.db import lifespan
from app.core.config import settings
from app.core.middleware.logging_middleware import LoggingMiddleware
from app.core.logging import logger

app = FastAPI(lifespan=lifespan)

# Add logging middleware
app.add_middleware(LoggingMiddleware)

# Add cors middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Welcome to Product Manager API", "status": "running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)