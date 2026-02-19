
import json

from app_main import db, app
from models import Sandwich
from tests import HoagieTester


class SandwichApiTest(HoagieTester):
    def test_get_sandwiches(self):
        # The HoagieTester sets up the test DB so that the four main sandwiches are in the DB
        with app.test_client() as c:
            result = c.get('/api/sandwiches')
            assert result.status_code == 200
            payload = result.json
            assert payload is not None
            assert len(payload) == 4
