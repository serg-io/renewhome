"""
Partner session model
"""
import random
import string
from datetime import datetime

from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, DECIMAL, func

from flask_common import db

TOKEN_LENGTH = 32

class PartnerSession(db.Model): # type: ignore
    """
    Represents a partner session
    """

    __tablename__= 'partner_session'

    access_token: str = Column(String(TOKEN_LENGTH), primary_key=True)

    hoagie_partner_id: int = Column(Integer, ForeignKey('hoagie_partner.hoagie_partner_id')) # type: ignore

    created_dttm: datetime = Column(DateTime, # type: ignore
                          server_default=func.current_timestamp()  # pylint: disable=no-member
                          )
    """ Time when session was created """

    duration: int = Column(Integer, default=7200)
    """ The duration of the session in seconds """

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        # Generate a random accesss_token
        self.access_token = ''.join(random.choices(string.ascii_letters + string.digits, k=TOKEN_LENGTH))
