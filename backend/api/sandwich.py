"""
sandwich api
"""
from dataclasses import dataclass
from flask import jsonify
from flask_cors import cross_origin

from flask_common import app
from models import Sandwich


@dataclass
class ApiSandwich:
    id: int
    name: str
    description: str
    price: int
    image_url: str


@app.get('/api/sandwiches')
def get_sandwiches():
    all_sandwiches: "list[Sandwich]" = Sandwich.query.all()

    api_sandwiches = [ApiSandwich(
        id=s.sandwich_id,
        name=s.name,
        description=s.description,
        price=s.price,
        image_url='TODO'
    ) for s in all_sandwiches]

    return jsonify(api_sandwiches)
