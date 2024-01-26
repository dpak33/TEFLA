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
    message = f"Assuming that the user is a {user_level} language learner, please generate 12 multiple choice grammar questions and 12 multiple choice vocabulary questions on the topic of {topic}. Please also generate two open-ended short-response questions at the end of the test." \
              f"Please ensure that each of the multiple choice questions has five different options with one clear correct answer. Please ensure that each of the multi-choice questions follow this precise sort of structure: 'I ______ my luggage" \
              f"at the airport this morning - with the options being, for example: a) left b) leave c) take d) grabbed e) will depart. For vocab questions, it might be:" \
              f"'Another name for a plane ticket is a ________.' a) valise b) travel document c) passport d) boarding pass e) suitcase. Make the formatting of the vocab and grammar questions identical." \
              f" Please also ensure that both of the open-ended questions come at the end of the test. Please do not provide any open-ended questions before" \
              f"or during the multi-choice questions. Ensure that both open-ended questions come at the very end of the test! Please absolutely ensure" \
              f"that NONE of the multi-choice options have ambiguous options. For example, the following type of question MUST NOT be allowed: she ______ the train to work. (options: " \
              f"a) takes b) will take c) took d) flies e) has taken. This MUST NOT be allowed as a possible question because takes, took, will take and" \
              f"has taken are all potentially correct since we don't have any sense of time or limiting context. Therefore, ensure" \
              f"that you make the answer mutually exclusive by providing temporal or other context to limit the correct answer to one: provide such context in EVERY question to eliminate ambiguity. For example 'she ______ the train yesterday. That" \
              f"way we know the correct answer must be 'took' since it happened yesterday, in the past. Or you could have 'she ______ the train tomorrow'. Then we know" \
              f" that is should be 'will take' the train since it's in the future. ALWAYS provide temporal context to exclude multiple viable options with grammar questions!!"


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
    username = data.get('username')
    current_topic = data.get('currentTopic')
    user_level = data.get('userLevel')

    print("Received data for testing:", data)
    print("Username: ", username)
    print("current topic: ", current_topic)
    print("user level:", user_level)

    if not user_level or not current_topic:
        return jsonify({"error": "Missing required fields"}), 400

    return jsonify({"success": True})


@api_quizzes_bp.route('/evaluate_quiz', methods=['POST'])
def evaluate_quiz():
    try:
        data = request.get_json()
        current_topic = data.get('currentTopic')
        user_level = data.get('userLevel')

        print("Received data for testing:", data)
        print("current topic: ", current_topic)

        if not user_level or not current_topic:
            return jsonify({"error": "Missing required fields"}), 400

        # ChatGPT endpoint
        api_url = "https://api.openai.com/v1/chat/completions"

        # Construct the message for ChatGPT using user answers
        # Adjust this based on your actual structure of user_answers
        message = f"Assuming the user is a {user_level} language learner, evaluate the following quiz answers for a test on the topic of {current_topic}. Here are the quiz answers: {data}. The multiple-choice questions have only one correct answer, and the user scores one point for each correct answer. There are no half marks. The last two questions are open-ended and are scored out of three points each. Note that if a question is left unanswered, the user gets 0 points for that question. Ensure that you include unanswered questions in the overall score calculation. For example, if a user only answers four questions, their maximum score will be 4/30 * 100 = 13.3333%. That's because there are 24 multi-choice questions, each worth one mark, and two open-ended questions, each worth three marks. Please provide the percentage value as a number without the '%' sign or any additional text. Return only the number, such as 65, 82, or 58. Do not include a full stop, period, or '%' mark. Calculate the score and return the percentage. DO NOT SHOW HOW TO CALCULATE IT IN CODE OR ARITHMETICALLY. Just calculate the score and return it."

        # API request data
        api_data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": message},
                {"role": "user", "content": "Provide the quiz score as a percentage."}
            ],
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
            print("Api response: ", response_data)
            # Extract relevant information from the response_data if needed
            quiz_score = ""
            quiz_score_message = response_data['choices'][0]['message']['content']
            quiz_score_message = quiz_score_message.rstrip('.')
            for char in quiz_score_message:
                if char.isdigit() or char == '.':
                    quiz_score += char

            quiz_score = float(quiz_score)

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