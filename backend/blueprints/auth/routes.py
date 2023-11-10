from flask import render_template, redirect, url_for, flash, request
from werkzeug.security import check_password_hash, generate_password_hash
from . import auth_bp
from models import User
from app import db


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            # User authenticated
            flash('Login successful! Welcome back.')
            return redirect(url_for('main.index'))  # Redirect to main page after login
        else:
            flash('Invalid username or password', 'error')
    return render_template('auth/login.html')  # Render the login template


@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Username already exists', 'error')
        else:
            new_user = User(username=username, email=email)
            new_user.set_password(password)  # Use the set_password method to hash the password
            db.session.add(new_user)
            db.session.commit()
            flash('Registration successful! Please log in.')
            return redirect(url_for('auth.login'))  # Redirect to login page after register
    return render_template('auth/register.html')  # Render the register template
