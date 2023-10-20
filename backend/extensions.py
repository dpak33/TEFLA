from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize extensions outside of app context
db = SQLAlchemy()
migrate = Migrate()