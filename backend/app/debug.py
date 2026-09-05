from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")
router = APIRouter(prefix="/debug", tags=["Debug"])

@router.get("/token")
async def debug_token(token: str = Depends(oauth2_scheme)):
    print(f"🔍 Raw token: '{token}'")
    print(f"🔍 Length: {len(token)}")
    print(f"🔍 ASCII codes: {[ord(c) for c in token]}")
    return {"token": token, "length": len(token)}
