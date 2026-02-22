
from curses import nonl
from enum import Enum
import json

from dacite import Config, from_dict


from api.order import BASE_ORDER_ROUTE, BASE_PARTNER_ORDER_ROUTE, ApiOrder, ApiOrderItemInput
from app_main import db, app
from models import Order
from tests import HoagieTester


class OrderApiTest(HoagieTester):
    # Hoagie tester defines some nice setup logic to clear the DB so we start each test with a standard, empty-ish database
    def test_create_empty_order(self):
        with app.test_client() as client:
            result = client.post(f'{BASE_ORDER_ROUTE}/create')
            assert result.status_code == 200
            payload = result.json
            assert payload is not None
            returned_order = from_dict(
                ApiOrder, payload, config=Config(cast=[Enum]))

            added_order: Order = Order.query.first()

            assert added_order.order_id == returned_order.id

    def test_create_order_with_items(self):
        item_input = ApiOrderItemInput(
            quantity=2,
            sandwich_id=1
        )

        with app.test_client() as client:
            result = client.post(f'{BASE_ORDER_ROUTE}/create', data=json.dumps({
                'items': [item_input.__dict__]
            }), content_type='application/json')
            assert result.status_code == 200
            payload = result.json
            assert payload is not None
            returned_order = from_dict(
                ApiOrder, payload, config=Config(cast=[Enum]))

            added_order: Order = Order.query.first()
            assert added_order.order_id == returned_order.id
            assert len(added_order.items) == 1
            assert added_order.items[0].quantity == 2
            assert added_order.items[0].sandwich_id == 1

    def test_submit_order__good_case(self):
        order = Order()
        db.session.add(order)
        db.session.flush()

        with app.test_client() as client:
            result = client.post(
                f'{BASE_ORDER_ROUTE}/{order.order_id}/submit', content_type='application/json')
            assert result.status_code == 200
            payload = result.json
            assert payload is not None
            returned_order = from_dict(
                ApiOrder, payload, config=Config(cast=[Enum]))

            assert returned_order.id == order.order_id

            assert order.status == Order.Status.SUBMITTED

    def test_submit_order__already_submitted_case(self):
        order = Order()
        
        # orders are forced to open on create, so set this after constructor
        order.status = Order.Status.SUBMITTED
        db.session.add(order)
        db.session.flush()
        
        with app.test_client() as client:
            result = client.post(
                f'{BASE_ORDER_ROUTE}/{order.order_id}/submit', content_type='application/json')
            assert result.status_code == 400

    def test_submit_order__invalid_order_id_case(self):
        with app.test_client() as client:
            result = client.post(
                f'{BASE_ORDER_ROUTE}/777/submit', content_type='application/json')
            assert result.status_code == 404

    def test_update_order_items(self):
        order: Order = Order()
        db.session.add(order)
        db.session.flush()

        item_input = ApiOrderItemInput(
            quantity=2,
            sandwich_id=1
        )

        with app.test_client() as client:
            result = client.post(f'{BASE_ORDER_ROUTE}/{order.order_id}/items', data=json.dumps({
                'items': [item_input.__dict__]
            }), content_type='application/json')
            assert result.status_code == 200
            payload = result.json
            assert payload is not None
            returned_order = from_dict(
                ApiOrder, payload, config=Config(cast=[Enum]))

            assert order.order_id == returned_order.id

            # be sure we added the order item per the input data
            db.session.refresh(order)  # Refresh the order from the DB after it was updated out of scope by the client
            assert len(order.items) == 1
            assert order.items[0].sandwich_id == item_input.sandwich_id
            assert order.items[0].quantity == item_input.quantity

    def test_create_partner_order_without_phone_number(self):
        with app.test_client() as client:
            item_input = ApiOrderItemInput(
                quantity=2,
                sandwich_id=1
            )
            result = client.post(f'{BASE_PARTNER_ORDER_ROUTE}/create', data=json.dumps({
                'items': [item_input.__dict__],
            }), content_type='application/json')
            assert result.status_code == 200
            payload = result.json
            assert payload is not None

            added_order: Order = Order.query.first()
            assert added_order.order_id == payload['order_id']
            assert added_order.customer_phone_number is None
            assert len(added_order.items) == 1
            assert added_order.items[0].quantity == 2
            assert added_order.items[0].sandwich_id == 1
            assert added_order.status == Order.Status.SUBMITTED

    def test_create_partner_order_with_phone_number(self):
        with app.test_client() as client:
            item_input = ApiOrderItemInput(
                quantity=2,
                sandwich_id=1
            )
            result = client.post(f'{BASE_PARTNER_ORDER_ROUTE}/create', data=json.dumps({
                'items': [item_input.__dict__],
                'phone_number': '+1 858 456 7890'
            }), content_type='application/json')
            assert result.status_code == 200
            payload = result.json
            assert payload is not None

            added_order: Order = Order.query.first()
            assert added_order.order_id == payload['order_id']
            assert added_order.customer_phone_number == '+18584567890'
            assert len(added_order.items) == 1
            assert added_order.items[0].quantity == 2
            assert added_order.items[0].sandwich_id == 1
            assert added_order.status == Order.Status.SUBMITTED

    def test_create_partner_order_without_items(self):
        with app.test_client() as client:
            result = client.post(f'{BASE_PARTNER_ORDER_ROUTE}/create', data=json.dumps({}), content_type='application/json')
            assert result.status_code == 400

    def test_create_partner_order_with_zero_items(self):
        with app.test_client() as client:
            result = client.post(f'{BASE_PARTNER_ORDER_ROUTE}/create', data=json.dumps({ 'items': [] }), content_type='application/json')
            assert result.status_code == 400
