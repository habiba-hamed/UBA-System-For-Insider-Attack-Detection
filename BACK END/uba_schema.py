from pydantic import BaseModel


class Alert(BaseModel):
    alert_id: int
    anomaly_id: str
    anomaly_sc: str

class Soc(BaseModel):
    soc_id: int
    soc_name: str
    soc_pass: str

class User(BaseModel):
    user_no: int
    user_encoded_id: str
    user_decoded_id: str