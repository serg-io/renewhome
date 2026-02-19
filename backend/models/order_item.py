"""
the order item model
"""
from datetime import datetime

from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, DateTime, func

from models import Order, Sandwich
from flask_common import db



class OrderItem(db.Model): # type: ignore
    """
    represents a single order, with relations to the items in the order
    """

    __tablename__= 'order_item'

    order_item_id: int = Column(Integer, primary_key=True) # type: ignore

    order_id: int = Column(Integer, ForeignKey('order.order_id')) # type: ignore
    order: Order = relationship(Order, backref="items") # type: ignore
    """ the order which the item belongs to """

    sandwich_id:int = Column( # type: ignore
        Integer, ForeignKey('sandwich.sandwich_id'))
    sandwich: Sandwich = relationship(Sandwich) # type: ignore
    """ the sandwich for this order item """

    quantity:int = Column(Integer) # type: ignore
    """ how many of this sandwich on the order """

    created_dttm:datetime = Column(DateTime, # type: ignore
                          server_default=func.current_timestamp()  # pylint: disable=no-member
                          )
    """ time when the item was added to the order """
    updated_dttm: datetime = Column(DateTime, # type: ignore
                          server_default=func.current_timestamp(),  # pylint: disable=no-member
                          server_onupdate=func.current_timestamp()   # type:ignore pylint: disable=no-member
                          )
    """ the time when the item was last updated"""
