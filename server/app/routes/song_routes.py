from flask import Blueprint, jsonify
from ..models import Song
from ..db import db

songs_bp = Blueprint('songs', __name__) 

@songs_bp.route('/songs', methods=['GET'])
def get_songs():
    songs = Song.query.all()
    return jsonify([song.to_dict() for song in songs]), 200

@songs_bp.route('/songs/<int:id>', methods=['GET'])
def get_song(id):
    song = db.session.get(Song, id)
    if song:
        return jsonify(song.to_dict()), 200
    return jsonify({"error": "Song not found"}), 404