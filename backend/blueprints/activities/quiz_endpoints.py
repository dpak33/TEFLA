from . import activities
from app import db
from models import User, UserLevel, TopicLevel
from .levels import get_rating
from .starter_questions import questions
from flask import request, jsonify


@activities.route('/quiz/questions', methods=['GET'])
def serve_questions():
    return jsonify(questions)

@activities.route('/quiz/evaluate', methods=['POST'])
def evaluate_quiz():
    try:
        data = request.json  # Assuming data is in JSON format

        print('Received data:', data)
        user_info = data.get('answers', {}).get('user', {})
        user_answers = data.get('answers', {}).get('answers', {})

        # Extract username directly, assuming user_info is always a dictionary
        username = data.get('answers', {}).get('user', {}).get('username')

        # Assuming User model has a method to retrieve a user by username
        user = User.query.filter_by(username=username).first()

        if user:
            print(f"User found: {user.username}")
            # Access the current user directly
            score = 0
            for i, question in enumerate(questions):
                answer_key = f"question{i}"
                if answer_key in user_answers and user_answers[answer_key] == question['correct_answer']:
                    score += question['weight']

            proficiency_level = get_rating(score)

            # Assigning a level to the user based on the evaluation
            user_level = UserLevel(level=proficiency_level, user_id=user.id)
            db.session.add(user_level)
            print(f"UserLevel added to session with level {proficiency_level}.")

            supported_topics = ['travel', 'work', 'greetings']
            # Update topic levels for all topics with the proficiency_level
            for topic in supported_topics:
                # Update or create TopicLevel record for the specified topic
                topic_level = TopicLevel.query.filter_by(user_id=user.id, topic_name=topic).first()

                if topic_level:
                    topic_level.level = proficiency_level
                else:
                    new_topic_level = TopicLevel(level=proficiency_level, user_id=user.id, topic_name=topic)

                    setattr(user, f'{topic}_level', new_topic_level)
                    new_topic_level.user = user

                    db.session.add(new_topic_level)

            db.session.commit()
            print("UserLevel and TopicLevels committed.")
            return jsonify({'success': True})

        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500