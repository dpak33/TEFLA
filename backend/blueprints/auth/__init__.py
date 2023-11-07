from flask import Blueprint

# Create a Blueprint instance
auth_bp = Blueprint('auth', __name__)

# Import the routes module to associate routes with the Blueprint
from . import routes