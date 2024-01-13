from . import api_quizzes_bp
from flask import jsonify, request, current_app
import os
import requests
from models import User, TopicLevel
from app import db

@api_quizzes_bp.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json()
    current_app.logger.info(f"Received data: {data}")

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


@api_quizzes_bp.route('/update_topic_levels/<topic>', methods=['POST'])
def update_topic_levels(topic):
    try:
        data = request.json
        username = data.get('username')
        level = data.get('level')

        user = User.query.filter_by(username=username).first()

        if user:
            # Update or create TopicLevel record for the specified topic
            topic_field = getattr(user, f'{topic}_level')

            if topic_field:
                topic_field.level = level
            else:
                new_topic_level = TopicLevel(level=level, user_id=user.id, topic_name=topic)
                setattr(user, f'{topic}_level', new_topic_level)
                db.session.add(new_topic_level)

            db.session.commit()

            return jsonify({'success': True, 'message': f'{topic.capitalize()} level updated'})
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500