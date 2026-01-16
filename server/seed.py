from app import create_app
from app.db import db
from app.models import User, Song, Score

app = create_app()

def seed_database():

    with app.app_context():
        print("--- Seeding Database ---")
        
        # 1. Reset everything (Optional)
        db.drop_all()
        db.create_all()

        # 2. Create User
        print("Creating User: Wenxin")
        user = User(username="Wenxin")
        db.session.add(user)

        # 3. Create Song
        print("Creating Song: Twinkle Twinkle")
        twinkle_notes = [
            {"key": "a", "time": 0},
            {"key": "a", "time": 500},
            {"key": "g", "time": 1000},
            {"key": "g", "time": 1500},
            {"key": "h", "time": 2000},
            {"key": "h", "time": 2500},
            {"key": "g", "time": 3000}
        ]
        song = Song(title="Twinkle Twinkle", notes=twinkle_notes)
        db.session.add(song)

        # 4. Save
        db.session.commit()
        print("--- Success! Database is ready. ---")

if __name__ == "__main__":
    seed_database()