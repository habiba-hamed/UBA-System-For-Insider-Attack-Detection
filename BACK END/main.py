from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
import database
import models

app = FastAPI()

class LoginRequest(BaseModel):
    soc_name: str  # Change from user_encoded_id to soc_name
    soc_pass: str  # Add the password field

@app.post("/login/")
def login(login_request: LoginRequest, db: Session = Depends(database.get_db)):
    # Query the Soc table instead of the User table
    soc = db.query(models.Soc).filter_by(soc_name=login_request.soc_name, soc_pass=login_request.soc_pass).first()

    if not soc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

    return {"message": "Login successful"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
