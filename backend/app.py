from flask import Flask
from blueprints.activities.routes import activities  # Adjust the import based on your folder structure
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.register_blueprint(activities, url_prefix='/activities')

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)