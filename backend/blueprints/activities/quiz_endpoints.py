from . import activities
from app import db
from models import User, UserLevel
from .levels import get_rating
from .starter_questions import questions
from flask import request, jsonify


@activities.route('/quiz/questions', methods=['GET'])
def serve_questions():
    return jsonify(questions)

@activities.route('/quiz/evaluate', methods=['POST'])
def evaluate_quiz():
    user_answers = request.json.get('answers')

    score = 0
    for i, question in enumerate(questions):
        answer_key = f"question{i}"
        if answer_key in user_answers and user_answers[answer_key] == question['correct_answer']:
            score += question['weight']

    proficiency_level = get_rating(score)
    return jsonify({
        "score": score,
        "proficiency_level": proficiency_level
    })

