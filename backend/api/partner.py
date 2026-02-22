"""
Partner Session API
"""
from flask import jsonify, request

from flask_common import app, db
from models import HoagiePartner, PartnerSession

BASE_PARTNER_ORDER_ROUTE = '/api/partner/order'

@app.route(f'/api/partner/<client_token>/session', methods=['POST'])
def create_partner_session_token(client_token: str):
    """
    Creates a session token for the partner with the given client_token.
    payload:
    {
        client_secret: str
    }
    """

    payload = request.json

    if not payload or not payload['client_secret']:
        return 'Invalid or missing credentials.', 404
    
    client_secret = payload.get('client_secret')

    partner = HoagiePartner.query.filter(HoagiePartner.client_token == client_token, HoagiePartner.client_secret == client_secret).scalar()

    if not partner:
        return 'A partner with the given client_token does not exist.', 404
    
    partner_session = PartnerSession()
    partner_session.hoagie_partner_id = partner.hoagie_partner_id

    db.session.add(partner_session)
    db.session.commit()
    
    return jsonify({
        'access_token': partner_session.access_token,
        'expires_in': partner_session.duration,
        'refresh_token': None,
        'token_type': 'bearer'
    })