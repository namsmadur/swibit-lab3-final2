import os 
from pathlib import Path 
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#this code for path in the project root
base_dir = Path(__file__).resolve().parent.parent 
#root the project core app backend 
env_path = base_dir / ".env" 
load_dotenv(dotenv_path=env_path) 

#read the database url from the .env file
database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise ValueError("DATABASE_URL is not set in the .env file")

#create the database engine for the project 
engine = create_engine(database_url)
#create a configured "Session" class band engine 
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
#create a base class for declarative class definitions for the code 
Base = declarative_base() 
#FUNCTION TO GET A DATABASE SESSION (used for dependency injection) its for setting up
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()