from flask import render_template, redirect, url_for, flash, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from . import auth_bp
from models import User
from app import db


@auth_bp.route('/signin', methods=['GET', 'POST'])
def signin():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

#The .first() method below is used as we expect either 0 or 1 response for each username, so no need for further sort

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        first_time_sign_in = user.first_sign_in
        completed_quiz = user.completed_quiz

        # Update first_sign_in status if it's their first time
        if user.first_sign_in:
            user.first_sign_in = False
            db.session.commit()

        return jsonify({
            "message": "Login successful! Welcome back.",
            "firstTimeSignIn": first_time_sign_in,
            "completedQuiz": completed_quiz,
            "username": username
        }), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not name or not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    new_user = User(name=name, username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registration successful! Please log in."}), 200

@auth_bp.route('/completeQuiz', methods=['POST'])
def complete_quiz():
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({"error": "Username is required"}), 400

    user = User.query.filter_by(username=username).first()
#Here is where we make the change to the complete quiz field if we receive acceptable submission
    if user:
        user.completed_quiz = True
        db.session.commit()
        return jsonify({"message": "Quiz completion status updated for user: " + username}), 200
    else:
        return jsonify({"error": "User not found"}), 404



@auth_bp.route('/test_route', methods=['POST'])
def test_route():
    return jsonify({"message": "Test route reached"}), 200

