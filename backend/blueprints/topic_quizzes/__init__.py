from flask import Blueprint

topic_quizzes = Blueprint('topic_quizzes', __name__)

from . import API_routes