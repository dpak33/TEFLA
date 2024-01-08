from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import requests
import os

topic_quizzes = Blueprint('topic_quizzes', __name__)

@topic_quizzes.route('/test_route', methods=['POST'])
def test_route():
    return jsonify({"message": "Test route reached"}), 200


@topic_quizzes.route('/generate_quiz', methods=['POST', 'OPTIONS'])
@cross_origin(origins="http://localhost:4200", methods=['POST', 'OPTIONS'])
def generate_quiz():
    # Extract user level and topic from request data
    data = request.json
#labeled as user_level in service file on frontend before sending, so the below correct:
    user_level = data.get('user_level')
    topic = data.get('topic')

    if not user_level or not topic:
        return jsonify({"error": "Missing required fields"}), 400

    # ChatGPT endpoint
    api_url = "https://api.openai.com/v1/chat/completions"

    # Construct the message for ChatGPT
    message = f"Assuming that the user is a {user_level} language learner, please generate 20 grammar and vocabulary tests on the topic of {topic}, as well as two more open-ended short-response questions."

    # API request data
    api_data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "system", "content": message}],
        "temperature": 0.7
    }

    # API key and headers
    chat_api_key = os.getenv('CHAT_API_KEY')
    headers = {
        "Authorization": f"Bearer {chat_api_key}",
        "Content-Type": "application/json"
    }

    # Send request to ChatGPT API
    response = requests.post(api_url, json=api_data, headers=headers)

    # Handle the response
    if response.status_code == 200:
        response_data = response.json()
        return jsonify(response_data)
    else:
        error_message = {
            "error": f"Error from ChatGPT API: {response.status_code}",
            "details": response.text
        }
        return jsonify(error_message), response.status_code