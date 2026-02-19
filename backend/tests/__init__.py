from flask_common import db
from unittest import TestCase
from models import Order, OrderItem, Product, Sandwich


class HoagieTester(TestCase):
    def setUp(self):  # Our default test case assumes we have the standard 4 sandwiches, no customers, and no orders
        db.session.execute(
            """DELETE FROM customer""")  # there is no model so do this directly in the database
        OrderItem.query.delete()
        Order.query.delete()
        Sandwich.query.delete()
        Product.query.delete()
        self.set_up_sandwiches()

    def set_up_sandwiches(self):
        # Re-seed the database with sandwiches
        the_king = Sandwich(
            name='The King', description="Elvis' beloved hoagie, with peanut butter and bananas", price=1199)
        salty_sally = Sandwich(
            name='Salty Sally', description='Salted cod with a soy sauce glaze, topped with salt preserved veggies and salted vinegar chips', price=1049)
        khartoum = Sandwich(
            name="An Offer You Can't Refuse", description="Classic Italian cold cut, served \"swimming with the fishes\" (covered in fish sauce)", price=1149)
        pb_j = Sandwich(
            name='PB&J', description="The comfort of home, served on a scooped-out loaf shaped like a baseball bat.", price=1699)
        db.session.add(the_king)
        db.session.add(salty_sally)
        db.session.add(khartoum)
        db.session.add(pb_j)
        db.session.flush()
        the_king.sandwich_id = 1
        salty_sally.sandwich_id = 2
        khartoum.sandwich_id = 3
        pb_j.sandwich_id = 4
        db.session.flush()
