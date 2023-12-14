from flask import Flask
from extensions import db, migrate  # Import extensions from extensions.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuration settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Obsidian1989!@localhost:5432/tefl_app_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Attach extensions to the app
db.init_app(app)
migrate.init_app(app, db)

@app.route('/')
def hello_world():
    return 'Hello, World!'

# Import your models and blueprints AFTER initializing the app and extensions
from models import User, UserLevel
from blueprints.activities.routes import activities
from blueprints.auth import auth_bp


app.register_blueprint(activities, url_prefix='/activities')
app.register_blueprint(auth_bp, url_prefix='/auth')


if __name__ == '__main__':
    app.run(debug=True)