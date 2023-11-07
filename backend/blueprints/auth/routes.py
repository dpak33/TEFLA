from flask import render_template, redirect, url_for, flash, request
from werkzeug.security import check_password_hash, generate_password_hash
from . import auth_bp
from yourapp.models import User
from yourapp import db

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Example: get data from form
        username = request.form.get('username')
        password = request.form.get('password')
        # Validate and check user
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            # User authenticated
            # Log in the user (e.g., using Flask-Login)
            return redirect(url_for('main.index'))  # Redirect to main page after login
        else:
            flash('Invalid username or password')
    # GET or failed POST
    return render_template('auth/login.html')  # Render the login template

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Example: get data from form
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        # Check if user already exists
        user = User.query.filter_by(username=username).first()
        if user:
            flash('Username already exists')
        else:
            # Create new user and add to database
            new_user = User(username=username, email=email, password_hash=generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('auth.login'))  # Redirect to login page after register
    # GET or failed POST
    return render_template('auth/register.html')
