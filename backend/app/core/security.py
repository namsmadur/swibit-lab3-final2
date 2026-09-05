from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    # ✅ استخدام timestamp عدد صحيح لتجنب مشاكل التنسيق
    to_encode.update({"exp": int(expire.timestamp())})
    token = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    logger.info(f"🔑 Created token with SECRET_KEY: {settings.SECRET_KEY[:10]}...")
    logger.info(f"🔑 Full token: {token}")
    return token

def decode_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        logger.info(f"🔓 Decoding token: {token[:20]}...")
        logger.info(f"🔑 Using SECRET_KEY: {settings.SECRET_KEY[:10]}...")
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        logger.info(f"✅ Token decoded successfully. Payload: {payload}")
        return payload
    except JWTError as e:
        logger.error(f"❌ JWT decode error: {e}")
        # طباعة جزء من التوكن والمفتاح للمقارنة
        logger.error(f"   Token: {token[:30]}...")
        logger.error(f"   Secret: {settings.SECRET_KEY[:10]}...")
        return None
