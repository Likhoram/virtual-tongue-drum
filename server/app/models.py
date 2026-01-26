from .db import db  # Matches your file structure
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    # This 'player' name is important, we use it in score_routes!
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
    # difficulty removed to prevent database crash
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
    played_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "song_id": self.song_id,
            "score": self.score,
            "mistakes": self.mistakes,
            "played_at": self.played_at.isoformat(),
            # This is extra handy for the frontend leaderboard!
            "username": self.player.username 
        }