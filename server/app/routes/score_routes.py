from flask import Blueprint, request, jsonify
from app import db 
from app.models import Score, User
from sqlalchemy import or_, and_

scores_bp = Blueprint('scores', __name__)

@scores_bp.route('/scores', methods=['POST'])
def add_score():
    data = request.get_json()
    
    if not data or 'username' not in data or 'song_id' not in data:
        return jsonify({"error": "Missing data"}), 400

    username = data['username']

    user = User.query.filter_by(username=username).first()
    if not user:
        user = User(username=username)
        db.session.add(user)
        db.session.commit()
    
    new_score = Score(
        user_id=user.id,
        song_id=data['song_id'],
        score=data['score'],          
        mistakes=data.get('mistakes', 0)
    )

    try:
        db.session.add(new_score)
        db.session.commit()

        higher_scores_count = Score.query.filter(
            or_(
                Score.score > new_score.score,
                and_(
                    Score.score == new_score.score,
                    Score.played_at > new_score.played_at
                )
            )
        ).count()
        
        rank = higher_scores_count + 1

        response_data = new_score.to_dict()
        response_data['rank'] = rank  

        return jsonify(response_data), 201

    except Exception as e:
        db.session.rollback() 
        return jsonify({"error": str(e)}), 500

@scores_bp.route('/scores', methods=['GET'])
def get_scores():
    scores = Score.query.order_by(Score.score.desc()).limit(10).all()
    results = []
    for s in scores:
        s_dict = s.to_dict()
        s_dict['username'] = s.player.username 
        results.append(s_dict)

    return jsonify(results), 200