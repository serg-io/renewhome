
from enum import Enum
import json

from app_main import db, app
from tests import HoagieTester


class PartnerSessionAPITest(HoagieTester):
    def test_create_session(self):
        client_token = '-UalX1ujR6MIkczQGUMu9zuCyyNW0H-t'
        client_secret = 'sxK3NaYyW34aW0V2JFRrr2crW5oAdASA'

        with app.test_client() as client:
            data = json.dumps({ 'client_secret': client_secret })
            result = client.post(f'/api/partner/{ client_token }/session', data=data, content_type='application/json')
            response = result.json

            assert result.status_code == 200
            assert response is not None
            assert response.get('access_token') is not None

    def test_invalid_credentials(self):
        client_token = 'invalid_token'
        client_secret = 'invalid_secret'

        with app.test_client() as client:
            data = json.dumps({ 'client_secret': client_secret })
            result = client.post(f'/api/partner/{ client_token }/session', data=data, content_type='application/json')

            assert result.status_code == 404
