from flask import Blueprint, jsonify, request
from .starter_questions import questions
from .levels import get_rating
from . import activities

# So below we are defining sub-routes within our activities endpoint
@activities.route('/quiz/questions', methods=['GET'])
def serve_questions():
    return jsonify(questions)

@activities.route('/quiz/evaluate', methods=['POST'])
def evaluate_quiz():
    user_answers = request.json.get('answers')
    score = sum(question['weight'] for i, question in enumerate(questions) if user_answers[i] == question['correct_answer'])
    proficiency_level = get_rating(score)

    return jsonify({
        "score": score,
        "proficiency_level": proficiency_level
    })

