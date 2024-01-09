from . import api_quizzes_bp
from flask import jsonify, request





@api_quizzes_bp.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid or no JSON data provided"}), 400

    user_level = data.get('user_level')
    topic = data.get('topic')

    if not user_level or not topic:
        return jsonify({"error": "Missing required fields"}), 400

    message = f"Assuming that the user is a {user_level} language learner, please generate 20 grammar and vocabulary tests on the topic of {topic}, as well as two more open-ended short-response questions."
    return jsonify({"message": message}), 200  # Returning the message as a JSON response