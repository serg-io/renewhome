from datetime import datetime
from flask_common import db
from models.order import Order
from models.price import Price
from models.product import Product, ProductType
from tests import HoagieTester


class ProductTest(HoagieTester):
    # HoagieTester resets the database via setUp() and starts with a clean DB
    def test_product_created(self):
        product: Product = Product()
        product.name = 'Mustard'
        product.type = ProductType.CONDIMENT
        db.session.add(product)
        db.session.commit()

        loaded_product: Product = Product.query.get(product.product_id)
        assert loaded_product
        assert loaded_product.name == 'Mustard'
        assert loaded_product.type == ProductType.CONDIMENT
        assert loaded_product.created_dttm is not None
        assert loaded_product.updated_dttm is not None
