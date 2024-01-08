from flask import Blueprint

# Create a Blueprint instance
api_quizzes_bp = Blueprint('api_quizzes', __name__)

# Import the routes module to associate routes with the Blueprint
from . import routes