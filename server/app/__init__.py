from flask import Flask
from flask_cors import CORS
from .db import db, migrate
from .routes.song_routes import songs_bp
from .routes.score_routes import scores_bp # <--- Import both
import os
from dotenv import load_dotenv

load_dotenv() 

def create_app(config=None):
    app = Flask(__name__)
    CORS(app)
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
    
    if not app.config['SQLALCHEMY_DATABASE_URI']:
        raise RuntimeError("DATABASE_URI is missing. Did you create the .env file?")

    if config:
        app.config.update(config)

    db.init_app(app)
    migrate.init_app(app, db)

    # --- CENTRALIZED ROUTING ---
    # We apply /api to everything here. Consistent and Clean.
    app.register_blueprint(songs_bp, url_prefix='/api')
    app.register_blueprint(scores_bp, url_prefix='/api')
    
    return app