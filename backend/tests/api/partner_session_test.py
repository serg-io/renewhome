
from enum import Enum
import json
from flask.testing import FlaskClient

from app_main import app
from tests import HoagieTester

CLIENT_TOKEN = '-UalX1ujR6MIkczQGUMu9zuCyyNW0H-t'
CLIENT_SECRET = 'sxK3NaYyW34aW0V2JFRrr2crW5oAdASA'

class PartnerSessionAPITest(HoagieTester):
    def test_create_session(self):

        with app.test_client() as client:
            result = request_access_token(client, CLIENT_TOKEN, CLIENT_SECRET)
            response = result.json

            assert result.status_code == 200
            assert response is not None
            assert response.get('access_token') is not None

    def test_invalid_credentials(self):
        with app.test_client() as client:
            result = request_access_token(client, 'invalid_token', 'invalid_secret')

            assert result.status_code == 404

##########
# Helpers
##########

def request_access_token(client: FlaskClient, client_token: str = CLIENT_TOKEN, client_secret: str = CLIENT_SECRET):
    data = json.dumps({ 'client_secret': client_secret })
    return client.post(f'/api/partner/{ client_token }/session', data=data, content_type='application/json')