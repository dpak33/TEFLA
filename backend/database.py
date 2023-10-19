from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app import app   # Import the Flask app instance

db = SQLAlchemy(app)
migrate = Migrate(app, db)