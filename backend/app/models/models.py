# Models are no longer used - app runs stateless without database
# This file is kept for potential future database integration

from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from datetime import datetime

# Note: If you want to re-enable database functionality in the future,
# uncomment the database.py imports and re-add the models below.

# from app.core.database import Base
# 
# class Roast(Base):
#     __tablename__ = "roasts"
#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(String, index=True, nullable=False)
#     roast_text = Column(Text, nullable=False)
#     taste_score = Column(Integer, nullable=False)
#     music_data_snapshot = Column(JSON, nullable=True) 
#     created_at = Column(DateTime, default=datetime.utcnow)
