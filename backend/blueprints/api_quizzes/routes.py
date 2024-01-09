from . import api_quizzes_bp
from flask import jsonify, request
import os
import requests

@api_quizzes_bp.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json()


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

# Send request to ChatGPT API - catch possible network exception from API
    try:
        response = requests.post(api_url, json=api_data, headers=headers)
    except requests.RequestException as e:
        return jsonify({"error": "Network error from external API: please wait a moment", "details": str(e)}), 500

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