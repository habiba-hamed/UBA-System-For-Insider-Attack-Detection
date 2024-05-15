from sqlalchemy import Column, Integer, String
import database


class Alert(database.Base):
    __tablename__ = 'alert'

    alert_id = Column(Integer, primary_key=True, index=True)
    anomaly_id = Column(String)
    anomaly_sc = Column(String)

class Soc(database.Base):
    __tablename__ = 'soc'

    soc_id = Column(Integer, primary_key=True, index=True)
    soc_name = Column(String)
    soc_pass = Column(String)

class User(database.Base):
    __tablename__ = 'user'

    user_no = Column(Integer, primary_key=True, index=True)
    user_encoded_id = Column(String, unique=True, index=True)
    user_decoded_id = Column(String)