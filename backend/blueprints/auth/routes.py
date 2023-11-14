from flask import render_template, redirect, url_for, flash, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from . import auth_bp
from models import User
from app import db


@auth_bp.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            # User authenticated
            flash('Login successful! Welcome back.')
            return redirect(url_for('main.index'))
        else:
            flash('Invalid username or password', 'error')
    return render_template('auth/signin.html')

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
