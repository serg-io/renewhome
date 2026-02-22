"""
order api
"""
from dataclasses import dataclass
from http.client import BAD_REQUEST
from typing import Optional, Union, List

from flask import jsonify, request
from werkzeug.exceptions import BadRequest
from dacite import from_dict
import phonenumbers

from flask_common import app, db
from models import Order
from _helpers import safe_int
from .partner import authenticate_partner_request


@dataclass
class ApiOrderItem:
    id: int
    order_id: int
    sandwich_id: int
    quantity: int


@dataclass
class ApiOrder:
    id: int
    items: List[ApiOrderItem]
    status: Order.Status
    customer_phone_number: Optional[str]


@dataclass
class ApiOrderItemInput:
    """ the input object to create or update an order """
    sandwich_id: int
    quantity: int


BASE_ORDER_ROUTE = '/api/order'
BASE_PARTNER_ORDER_ROUTE = '/api/partner/order'


@app.route(f'{BASE_ORDER_ROUTE}/create', methods=['POST'])
def create_order_api():
    """
    handles creating a new order, optionally with a sandwich selected

    payload:
    {
        items: ApiOrderItemInput[]
    }
    """

    order = Order()
    db.session.add(order)
    db.session.commit()

    try:
        update_order_items(order.order_id)
    except:
        pass  # maybe do something else here?

    return jsonify(make_api_order(order))


@app.get(BASE_ORDER_ROUTE)
def get_orders():
    """ gets a single order by id """
    orders = Order.query.all()

    if not orders:
        return jsonify([])

    return jsonify([make_api_order(o) for o in orders])


@app.get(f'{BASE_ORDER_ROUTE}/<order_id>')
def get_order(order_id: str):
    """ gets a single order by id """
    order = Order.query.get(safe_int(order_id))

    if not order:
        return 'not found', 404

    return jsonify(make_api_order(order))


@app.route(f'{BASE_ORDER_ROUTE}/<order_id>/items', methods=['POST'])
def update_order_items(order_id: Union[str, int]):
    """
    update one or more items on an order, payload need not contain all the items, only changes
    payload:
    {
        items: {
            sandwich_id: int,
            quantity: int
        }[]
    }
    """

    payload = request.json

    order: Order = Order.query.get(safe_int(order_id))

    if order.status is not Order.Status.OPEN:
        return 'order is not open for changes', 400

    if payload and payload['items']:
        for item in payload['items']:
            try:
                item = from_dict(ApiOrderItemInput, item)
                order.set_sandwich_quantity(
                    item.sandwich_id,
                    quantity=item.quantity
                )
            except:
                # swallow per item orders for now
                pass

    return jsonify(make_api_order(order))


@app.route(f'{BASE_ORDER_ROUTE}/<order_id>/submit', methods=['POST'])
def submit_order(order_id: str):
    """
    submit an order to be made by the kitchen
    payload:
    {
        phone_number?: str
    }
    """

    order: Order = Order.query.get(safe_int(order_id))

    if not order:
        return 'order not found', 404

    if order.status is not Order.Status.OPEN:
        return 'order is not open', 400

    # collect and set the phone number if needed
    try:
        payload = request.json
        phone_raw = payload.get('phone_number')
        if phone_raw:
            
                phone_number = phonenumbers.parse(phone_raw, "US")
                order.customer_phone_number = phonenumbers.format_number(phone_number,phonenumbers.PhoneNumberFormat.E164)
    except phonenumbers.NumberParseException:
        pass
    except BadRequest:
        pass

    order.status = Order.Status.SUBMITTED
    db.session.commit()
    return jsonify(make_api_order(order))

@app.route(f'{BASE_PARTNER_ORDER_ROUTE}/create', methods=['POST'])
def create_partner_order():
    """
    Handles creating and submitting a partner order
    payload:
    {
        items: {
            sandwich_id: int,
            quantity: int
        }[],
        phone_number?: str
    }
    """

    if not authenticate_partner_request(request):
        return 'Unauthorized request.', 401

    payload = request.json

    if 'items' not in payload or len(payload.get('items')) == 0:
        return 'Invalid request payload: The order payload does not contain any items.', 400

    for item in payload.get('items'):
        if item.get('quantity') < 1:
            return 'Invalid request: Quantity must be a positive integer.', 400

    order = Order()
    db.session.add(order)
    db.session.commit()

    try:
        update_order_items(order.order_id)
        submit_order(order.order_id)
    except:
        return 'Order creation failed', 500

    return jsonify({'order_id': order.order_id})


##########
# Helpers
##########

def make_api_order(order: Order) -> dict:

    return ApiOrder(
        id=order.order_id,
        status=order.status,
        customer_phone_number=order.customer_phone_number,
        items=[
            ApiOrderItem(
                id=i.order_item_id,
                order_id=i.order_id,
                sandwich_id=i.sandwich_id,
                quantity=i.quantity
            ) for i in order.items
        ]
    )
