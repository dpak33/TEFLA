from flask import Blueprint

activities = Blueprint('activities', __name__)

from blueprints.activities import routes, quiz_endpoints