from . import api_quizzes_bp
from flask import jsonify

@api_quizzes_bp.route('/test_route', methods=['GET', 'POST'])
def test_route():
    return jsonify({"message": "API Quizzes Test Route Reached"}), 200