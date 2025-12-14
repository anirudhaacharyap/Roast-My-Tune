from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import music, roast

app = FastAPI(title="RoastMyTune API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "RoastMyTune API is running (No DB mode)"}

app.include_router(music.router, prefix="/api/music", tags=["music"])
app.include_router(roast.router, prefix="/api/roast", tags=["roast"])

