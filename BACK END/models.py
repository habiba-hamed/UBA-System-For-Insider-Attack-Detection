from sqlalchemy import Column, Integer, String, DateTime, func
import database


class Alerts(database.Base):
    __tablename__ = 'alerts'

    alert_id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime)
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