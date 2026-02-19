from datetime import datetime
from flask_common import db
from models.order import Order
from models.price import Price
from models.product import Product, ProductType
from tests import HoagieTester


class PriceTest(HoagieTester):
    # HoagieTester resets the database via setUp() and starts with a clean DB
    def test_price_created(self):
        mayo: Product = Product()
        mayo.name = 'Mayonnaise'
        mayo.type = ProductType.CONDIMENT
        db.session.add(mayo)
        db.session.commit()

        price: Price = Price()
        price.price = 123
        price.product_id = mayo.product_id
        price.price_dttm = datetime(2025, 2, 4, 17, 0, 0)
        db.session.add(price)
        db.session.commit()

        loaded_price:Price = Price.query.get(price.price_id)
        assert loaded_price
        assert loaded_price.price == 123
        assert loaded_price.product_id == mayo.product_id
        assert loaded_price.price_dttm == datetime(2025, 2, 4, 17, 0, 0)
        assert loaded_price.created_dttm is not None
        assert loaded_price.updated_dttm is not None
