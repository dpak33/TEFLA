from . import activities
from app import db
from models import User, UserLevel
from .levels import get_rating
from .starter_questions import questions
from flask import request, jsonify


@activities.route('/test_add_user', methods=['POST'])
def test_add_user():
    # Adding a dummy user
    user = User(username="dummyUser30", email="dummy@user30.com")
    db.session.add(user)
    db.session.commit()

    # Simulate a quiz evaluation for the dummy user
    dummy_answers = request.json.get('answers')
    score = sum(question['weight'] for i, question in enumerate(questions) if dummy_answers[i] ==
                question['correct_answer'])
    proficiency_level = get_rating(score)


    # Assigning a level to the user based on the evaluation
    user_level = UserLevel(level=proficiency_level, user_id=user.id)
    db.session.add(user_level)
    print(f"UserLevel added to session with level {proficiency_level}.")
    db.session.commit()
    print("UserLevel committed.")

    return jsonify({
        "username": user.username,
        "email": user.email,
        "score": score,
        "proficiency_level": proficiency_level
    })



@activities.route('/')
def activities_home():
    return "Activities Home Page"


@activities.route('/start')
def start_activities():
    return "Start Activities Page"