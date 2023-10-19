from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize extensions outside of app context
db = SQLAlchemy()
migrate = Migrate()

app = Flask(__name__)

# Configuration settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Obsidian1989!@localhost:5432/tefl_app_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Attach extensions to the app
db.init_app(app)
migrate.init_app(app, db)

# Now import your models and blueprints AFTER initializing the app and extensions
from models import User, UserLevel
from blueprints.activities.routes import activities

app.register_blueprint(activities, url_prefix='/activities')

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)