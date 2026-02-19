"""
the order model
"""
from datetime import datetime

from sqlalchemy import Column, Integer, Enum, DateTime, String, func

from flask_common import db
from libs.ohm_enum import OhmStrEnum

from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from models import OrderItem


class Order(db.Model): # type: ignore
    """
    represents a single order, which has a related set of OrderItems
    """

    __tablename__='order'

    class Status(OhmStrEnum):
        OPEN = 'OPEN'
        SUBMITTED = 'SUBMITTED'
        FULFILLED = 'FULFILLED'

    order_id: int = Column(Integer, primary_key=True) # type: ignore
    customer_phone_number: str = Column(String, default=None, nullable=True) # type: ignore
    status: Status = Column(Enum(Status), server_default=Status.OPEN) # type: ignore

    created_dttm:datetime = Column( # type: ignore
        DateTime,server_default=func.current_timestamp()# pylint: disable=no-member
    )
                                      
    """ time when the order was created """
    updated_dttm:datetime = Column( # type: ignore
        DateTime,
        server_default=func.current_timestamp(),  # pylint: disable=no-member
        server_onupdate=func.current_timestamp()   # type:ignore pylint: disable=no-member
    )
    """ the time when the order was last updated"""

    # populated as a backref on the relationship
    items: 'list[OrderItem]'
    """ the items which have been added to the order """

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.status = Order.Status.OPEN

    def set_sandwich_quantity(self, sandwich_id: int, quantity=1):
        """ add a sandwich to this order, optionally specifying a quantity """
        from models import OrderItem
        item = OrderItem(sandwich_id=sandwich_id,
                         order_id=self.order_id, quantity=quantity)
        db.session.add(item)

        db.session.commit()
