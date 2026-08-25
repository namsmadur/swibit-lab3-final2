from pydantic import BaseModel, EmailStr, Field
from typing import Optional


#user out dont have a password so we dont seend a pass even a has pass to the cline
class usercrate(BaseModel):
    username: str 
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

class LoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    