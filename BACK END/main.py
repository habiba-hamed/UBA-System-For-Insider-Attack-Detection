from fastapi import FastAPI, Depends, HTTPException, status
from fastapi import FastAPI, Depends, HTTPException, status, Cookie
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import database
import models

app = FastAPI()

# Allow CORS for frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    soc_name: str  # Change from user_encoded_id to soc_name
    soc_pass: str  # Add the password field

# Function to authenticate user
def authenticate_user(db: Session, login_request: LoginRequest):
    return db.query(models.Soc).filter_by(soc_name=login_request.soc_name, soc_pass=login_request.soc_pass).first()

@app.post("/login/")
def login(login_request: LoginRequest, db: Session = Depends(database.get_db)):
    # Authenticate user
    soc = authenticate_user(db, login_request)

    if not soc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

    # Store username in session (here using a secure HTTP-only cookie)
    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(key="username", value=soc.soc_name, httponly=True, max_age=3600)  # Max age of the cookie (1 hour) 

    return response


@app.get("/alerts_count/")
def alerts_count(db: Session = Depends(database.get_db)):
    try:
        ctr = db.query(models.Alerts).count()
        return {"alerts_count": ctr}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error") from e

@app.get("/users_count/")
def users_count(db: Session = Depends(database.get_db)):
    try:
        ctr = db.query(models.Users).count()
        return {"users_count": ctr}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error") from e


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
