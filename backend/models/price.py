"""
Price data model. 
"""
from sqlalchemy.orm import relationship
from sqlalchemy import Column, ForeignKey, Integer, DateTime, func

from flask_common import db
from datetime import datetime
from models.product import Product


class Price(db.Model):  # type: ignore
    """
    Represents a price at a specific time for a product. Data
    is downloaded from the Real Time Market API
    """

    __tablename__ = 'price'

    price_id: int = Column(Integer, primary_key=True)  # type: ignore
    """ the unique ID of the price """
    product_id: int = Column(Integer, ForeignKey(
        'product.product_id'))  # type: ignore
    product: Product = relationship(
        Product, backref="products")  # type: ignore
    """ foreign key to the product table / product model """
    price: int = Column(Integer)  # type: ignore
    """ the price of the product in US cents"""
    price_dttm: datetime = Column(DateTime)  # type: ignore
    """ time corresponding to this price, stored in UTC """
    created_dttm: datetime = Column(DateTime,  # type: ignore
                                    server_default=func.current_timestamp()  # pylint: disable=no-member
                                    )
    """ time when this price record was added to the DB """
    updated_dttm: datetime = Column(DateTime,  # type: ignore
                                    server_default=func.current_timestamp(),  # pylint: disable=no-member
                                    # type:ignore pylint: disable=no-member
                                    server_onupdate=func.current_timestamp()
                                    )
    """ the time when the price was last updated """
