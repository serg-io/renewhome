from unittest.mock import patch
from flask import Flask
import pytest
from flask_sqlalchemy import SQLAlchemy

from models import Order, OrderItem


@pytest.fixture(scope='session')
def app():
    '''
    Create a Flask app context for the tests.
    '''
    app = Flask(__name__)
    # figure out if we're in test mode
    app.testing = True

    # config the db connection
    _database = 'hoagie_helper_test'
    app.config['SQLALCHEMY_DATABASE_URI'] = \
        f'mysql+pymysql://ohmconnect:this-is-a-secure-password@db/{_database}'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    return app


@pytest.fixture(scope='session')
def db(app):
    '''
    Provide the transactional fixtures with access to the database via a Flask-SQLAlchemy
    database connection.
    '''
    db = SQLAlchemy(app=app)
    yield db
