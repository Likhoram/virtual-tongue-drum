from .db import db
from datetime import datetime, timezone

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
    notes = db.Column(db.JSON, nullable=False) 
    scores = db.relationship('Score', backref='song_played', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "notes": self.notes
        }

class Score(db.Model):
    __tablename__ = 'scores' 
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    mistakes = db.Column(db.Integer, default=0)
    played_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "song_id": self.song_id,
            "score": self.score,
            "mistakes": self.mistakes,
            "played_at": self.played_at.isoformat(),
            "username": self.player.username 
        }