from flask_common import db
from models.order import Order
from models.order_item import OrderItem
from tests import HoagieTester


class OrderModelTest(HoagieTester):
    # HoagieTester resets the database via setUp() and starts with a clean DB
    def test_order_is_open_by_default(self):
        new_order = Order()
        assert new_order.status == Order.Status.OPEN

    def test_model_interaction(self):
        # Simple test to convince me that the model works as advertised!
        order = Order()
        db.session.add(order)
        db.session.commit()

        order_db = Order.query.filter(Order.order_id == order.order_id).first()
        assert order_db.order_id == order.order_id
        Order.query.filter(Order.order_id == order.order_id).delete()
        order_db = Order.query.filter(Order.order_id == order.order_id).first()
        assert order_db is None

    def test_add_sandwich_to_order(self):
        new_order = Order()
        db.session.add(new_order)
        db.session.flush()

        new_order.set_sandwich_quantity(1, quantity=1)

        assert len(new_order.items) == 1
        assert new_order.items[0].sandwich_id == 1
        assert new_order.items[0].order_id == new_order.order_id
        assert new_order.items[0].quantity == 1
