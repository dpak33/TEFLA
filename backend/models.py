from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    level = db.relationship('UserLevel', back_populates='user', uselist=False)
    first_sign_in = db.Column(db.Boolean, default=True, nullable=False)
    completed_quiz = db.Column(db.Boolean, default=False, nullable=True)

    travel_level_id = db.Column(db.Integer, db.ForeignKey('topic_level.id'))
    work_level_id = db.Column(db.Integer, db.ForeignKey('topic_level.id'))
    greetings_level_id = db.Column(db.Integer, db.ForeignKey('topic_level.id'))

    travel_level = db.relationship('TopicLevel', back_populates='user_travel', uselist=False,
                                   foreign_keys=[travel_level_id],
                                   overlaps="work_level_id,greetings_level_id")
    work_level = db.relationship('TopicLevel', back_populates='user_work', uselist=False, foreign_keys=[work_level_id],
                                 overlaps="travel_level_id,greetings_level_id")
    greetings_level = db.relationship('TopicLevel', back_populates='user_greetings', uselist=False,
                                      foreign_keys=[greetings_level_id],
                                      overlaps="travel_level_id,work_level_id")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class UserLevel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='level')


class TopicLevel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topic_name = db.Column(db.String(20), nullable=False)
    level = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    user_travel = db.relationship('User', back_populates='travel_level', foreign_keys=[User.travel_level_id],
                                  overlaps="user_work,user_greetings")
    user_work = db.relationship('User', back_populates='work_level', foreign_keys=[User.work_level_id],
                                overlaps="user_travel,user_greetings")
    user_greetings = db.relationship('User', back_populates='greetings_level', foreign_keys=[User.greetings_level_id],
                                     overlaps="user_travel,user_work")