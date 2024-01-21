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
    message = f"Assuming that the user is a {user_level} language learner, please generate 20 multiple choice grammar and vocabulary tests on the topic of {topic}, as well as two more open-ended short-response questions at the end of the test." \
              f"Please ensure that each of the multiple choice questions has five different options with one clear correct answer. Please ensure that each of the multi-choice questions follow this precise sort of structure: 'I ______ my luggage" \
              f"at the airport this morning - with the options being, for example: a) left b) leave c) take d) grabbed e) will depart. For vocab questions, it might be:" \
              f"another name for a plane ticket is a) valise b) travel document c) passport d) boarding pass e) suitcase. " \
              f" Please also ensure that both of the open-ended questions come at the end of the test. Please do not provide any open-ended questions before" \
              f"or during the multi-choice questions. Ensure that both open-ended questions come at the very end of the test! Please also ensure" \
              f"that none of the multi-choice options are ambiguous. For example, the following should not be allowed: she ______ the train to work. (options: " \
              f"a) takes b) will take c) took d) flies e) has taken. This should not be allowed as a possible question because takes, took, will take and" \
              f"has taken are all potentially correct since we don't have any sense of time. Therefore, if you have a question like this, ensure" \
              f"that you make the answer mutually exclusive by providing temporal or other context. For example 'she ______ the train yesterday. That" \
              f"way we know the correct answer must be took since it happened yesterday, in the past. Finally please evaluate the open-ended question" \
              f"with a score between 0 and 4. Please do not ignore this part of the process or we will not be able to devise a percentage score: I don't" \
              f"care if the score between 0 and 4 is somewhat questionable: the important thing is that we also have scores for those questions too." \


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


@api_quizzes_bp.route('/test_response', methods=['POST'])
def test_response():
    data = request.get_json()
    print("Received data for testing:", data)
    return jsonify({"success": True})


@api_quizzes_bp.route('/evaluate_quiz', methods=['POST'])
def evaluate_quiz():
    try:
        data = request.json
        user_level = data.get('user_level')
        topic = data.get('topic')
        user_answers = data.get('user_answers')

        if not user_level or not topic or not user_answers:
            return jsonify({"error": "Missing required fields"}), 400

        # Construct the message for ChatGPT using user answers
        # Adjust this based on your actual structure of user_answers
        message = f"Assuming that the user is a {user_level} language learner, evaluate the following quiz answers:\n\n{user_answers}"

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
            # Extract relevant information from the response_data if needed
            quiz_score = response_data.get('quiz_score')
            # You can also handle any additional logic based on the response
            return jsonify({'success': True, 'quiz_score': quiz_score})
        else:
            error_message = {
                "error": f"Error from ChatGPT API: {response.status_code}",
                "details": response.text
            }
            return jsonify(error_message), response.status_code

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500