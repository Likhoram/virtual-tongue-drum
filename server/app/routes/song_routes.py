from flask import Blueprint, jsonify
from app.models import Song

songs_bp = Blueprint('songs', __name__, url_prefix='/api/songs')

@songs_bp.route('', methods=['GET'])
def get_songs():
    songs = Song.query.all()
    return jsonify([song.to_dict() for song in songs])