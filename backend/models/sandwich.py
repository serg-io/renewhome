"""
Sandwich data model
"""
from sqlalchemy import Column, Integer, String

from flask_common import db

class Sandwich(db.Model): # type: ignore
    """
    Represents a single sandwich available from Hoagie Helper
    """

    __tablename__= 'sandwich'

    sandwich_id:int = Column(Integer, primary_key=True) # type: ignore
    """ the unique ID of the sandwich """
    name:str = Column(String(255), unique=True, nullable=False) # type: ignore
    """ the menu name of the sandwich """
    description:str = Column(String(2048)) # type: ignore
    """ the menu description of the sandwich """
    price:int = Column(Integer) # type: ignore
    """ the price of the sandwich in US cents"""

    def image_url(self):
        """ returns the url of the image for the sandwich """
        return f"/static/{self.sandwich_id}.jpeg"

    @classmethod
    def summarize_sandwich_orders(cls):

        db.session.execute(f'''
        SELECT * FROM `{cls.__tablename__}`
        ''')
