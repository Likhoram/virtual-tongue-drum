from app.db import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    scores = db.relationship('Score', backref='player', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }

class Song(db.Model):
    __tablename__ = 'songs'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    difficulty = db.Column(db.String(20), default="Medium")
    notes = db.Column(db.JSON, nullable=False) 
    scores = db.relationship('Score', backref='song_played', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            'difficulty': self.difficulty,
            "notes": self.notes
        }

class Score(db.Model):
    __tablename__ = 'scores' 
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    mistakes = db.Column(db.Integer, default=0)
    played_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "song_id": self.song_id,
            "score": self.score,
            "mistakes": self.mistakes,
            "played_at": self.played_at.isoformat()
        }


    @classmethod
    def from_dict(cls, data):
        return cls(
            user_id=data.get("user_id"),
            song_id=data.get("song_id"),
            score=data.get("score"),
            mistakes=data.get("mistakes", 0) # Default to 0 if missing
        )