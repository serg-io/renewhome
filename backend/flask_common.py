"""
common flask setup
"""

# this red line is a known issue with pylance https://github.com/microsoft/pylance-release/issues/845
from sqlalchemy.orm import declarative_base
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret-hoagie-key'

# figure out if we're in test mode
app.testing = app.env.upper() == 'TEST'

print(f'Running in {app.env}')

# config the db connection
_database = 'hoagie_helper' if not app.testing else 'hoagie_helper_test'
app.config['SQLALCHEMY_DATABASE_URI'] = \
    f'mysql+pymysql://ohmconnect:this-is-a-secure-password@db/{_database}'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app=app)
