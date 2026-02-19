# import app so that the launcher can find it
from flask import send_from_directory
from flask_cors import CORS

from flask_common import app, db  # noqa
# import models and api to initialize them
import models  # noqa
import api  # noqa

# hey, this is an example app and we're not looking for high-security or anything 🤷
CORS(app, origins='*')

@app.route('/static/<path:path>')
def static_file(path):
    """
    Handles serving static files
    """
    return send_from_directory('public', path)
