"""
Product data model. 
"""
from sqlalchemy import Column, Integer, String, DateTime, func

from flask_common import db
from datetime import datetime


class ProductType:
    COLD_CUT = 'COLD_CUT'
    BREAD = 'BREAD'
    CONDIMENT = 'CONDIMENT'
    VEGETABLE = 'VEGETABLE'


class Product(db.Model):  # type: ignore
    """
    Represents a tracked product from the Real Time Market API
    """

    __tablename__ = 'product'

    product_id: int = Column(Integer, primary_key=True)  # type: ignore
    """ the unique ID of the product """
    name: str = Column(String(255), unique=True,
                       nullable=False)  # type: ignore
    """ product name """
    type: str = Column(String(32))  # type: ignore
    """ Type of product, must be of type ProductType"""
    created_dttm: datetime = Column(DateTime,  # type: ignore
                                    server_default=func.current_timestamp()  # pylint: disable=no-member
                                    )
    """ time when the product was added to the DB """
    updated_dttm: datetime = Column(DateTime,  # type: ignore
                                    server_default=func.current_timestamp(),  # pylint: disable=no-member
                                    # type:ignore pylint: disable=no-member
                                    server_onupdate=func.current_timestamp()
                                    )
    """ the time when the product was last updated """
