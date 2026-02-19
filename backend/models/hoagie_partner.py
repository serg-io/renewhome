"""
the Parnter model
"""
from datetime import datetime
from decimal import Decimal

from sqlalchemy import Column, Integer, String, DateTime, DECIMAL, func

from flask_common import db


class HoagiePartner(db.Model): # type: ignore
    """
    represents a partner on our Hoagie platform, including credentials
    """

    __tablename__= 'hoagie_partner'

    hoagie_partner_id: int = Column(Integer, primary_key=True) # type: ignore

    hoagie_partner_name: str = Column(String(255), unique=True) # type: ignore
    """A unique name for each partner"""
    
    price_per_request: Decimal = Column(DECIMAL(10, 4))
    """ The price, in USD, of each API request made to Hoagie Haven by this partner"""

    client_token: str = Column(String(32))

    client_secret: str = Column(String(32))

    created_dttm:datetime = Column(DateTime, # type: ignore
                          server_default=func.current_timestamp()  # pylint: disable=no-member
                          )
    """ time when partner was created """
    updated_dttm: datetime = Column(DateTime, # type: ignore
                          server_default=func.current_timestamp(),  # pylint: disable=no-member
                          server_onupdate=func.current_timestamp()   # type:ignore pylint: disable=no-member
                          )
    """ time when the partner was last updated """