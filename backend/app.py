from flask import Flask
from blueprints.activities.routes import activities  # Adjust the import based on your folder structure


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Obsidian1989!@localhost:5432/tefl_app_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


app.register_blueprint(activities, url_prefix='/activities')

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)