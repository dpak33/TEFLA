from flask import Flask
from blueprints.activities import activities

app = Flask(__name__)

app.register_blueprint(activities)
@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)