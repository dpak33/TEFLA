from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    level = db.relationship('UserLevel', backref='user', uselist=False)

class UserLevel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))