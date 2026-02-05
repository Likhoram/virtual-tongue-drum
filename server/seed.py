from app import create_app, db
from app.models import Song

app = create_app()

def seed_database():
    with app.app_context():
        print("🌱 Resetting database...")
        db.drop_all()   
        db.create_all() 
        
        print("🎵 Seeding songs (Range G3-C5)...")

        # 1. Happy Birthday (25 Notes)
        happy_birthday = Song(
            title="Happy Birthday",
            notes=[
                {"key": "G3"}, {"key": "G3"}, {"key": "A3"}, {"key": "G3"}, {"key": "C4"}, {"key": "B3"},
                {"key": "G3"}, {"key": "G3"}, {"key": "A3"}, {"key": "G3"}, {"key": "D4"}, {"key": "C4"},
                {"key": "G3"}, {"key": "G3"}, {"key": "G4"}, {"key": "E4"}, {"key": "C4"}, {"key": "B3"}, {"key": "A3"},
                {"key": "F4"}, {"key": "F4"}, {"key": "E4"}, {"key": "C4"}, {"key": "D4"}, {"key": "C4"}
            ]
        )

        # 2. Amazing Grace (34 Notes)
        amazing_grace = Song(
            title="Amazing Grace",
            notes=[
                {"key": "G3"}, {"key": "C4"}, {"key": "E4"}, {"key": "C4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}, {"key": "A3"}, {"key": "G3"},
                {"key": "G3"}, {"key": "C4"}, {"key": "E4"}, {"key": "C4"}, {"key": "E4"}, {"key": "D4"}, {"key": "G4"},
                {"key": "E4"}, {"key": "G4"}, {"key": "E4"}, {"key": "G4"}, {"key": "E4"}, {"key": "C4"}, {"key": "G3"}, {"key": "A3"},{"key": "C4"}, {"key": "A3"}, {"key": "G3"},
                {"key": "G3"}, {"key": "C4"}, {"key": "E4"}, {"key": "C4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}
            ]
        )

        # 3. Red River Valley (38 Notes)
        red_river = Song(
            title="Red River Valley (红河谷)",
            notes=[
                {"key": "G3"}, {"key": "C4"}, {"key": "E4"}, {"key": "E4"}, {"key": "E4"}, {"key": "D4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"},
                {"key": "G3"}, {"key": "C4"}, {"key": "E4"}, {"key": "C4"}, {"key": "E4"}, {"key": "G4"}, {"key": "F4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "G4"}, {"key": "F4"}, {"key": "E4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"}, {"key": "G4"}, {"key": "F4"},
                {"key": "A3"}, {"key": "A3"}, {"key": "G3"}, {"key": "B3"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}
            ]
        )

        # 4. Twinkle Twinkle (42 Notes)
        twinkle = Song(
            title="Twinkle Twinkle Little Star",
            notes=[
                {"key": "C4"}, {"key": "C4"}, {"key": "G4"}, {"key": "G4"}, {"key": "A4"}, {"key": "A4"}, {"key": "G4"},
                {"key": "F4"}, {"key": "F4"}, {"key": "E4"}, {"key": "E4"}, {"key": "D4"}, {"key": "D4"}, {"key": "C4"},
                {"key": "G4"}, {"key": "G4"}, {"key": "F4"}, {"key": "F4"}, {"key": "E4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "G4"}, {"key": "G4"}, {"key": "F4"}, {"key": "F4"}, {"key": "E4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "C4"}, {"key": "C4"}, {"key": "G4"}, {"key": "G4"}, {"key": "A4"}, {"key": "A4"}, {"key": "G4"},
                {"key": "F4"}, {"key": "F4"}, {"key": "E4"}, {"key": "E4"}, {"key": "D4"}, {"key": "D4"}, {"key": "C4"}
            ]
        )

        # 5. Jingle Bells (47 Notes)
        jingle_bells = Song(
            title="Jingle Bells",
            notes=[
                {"key": "E4"}, {"key": "E4"}, {"key": "E4"},
                {"key": "E4"}, {"key": "E4"}, {"key": "E4"},
                {"key": "E4"}, {"key": "G4"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"},
                {"key": "F4"}, {"key": "F4"}, {"key": "F4"}, {"key": "F4"}, {"key": "F4"}, {"key": "E4"}, {"key": "E4"},
                {"key": "E4"}, {"key": "D4"}, {"key": "D4"}, {"key": "E4"}, {"key": "D4"}, {"key": "G4"},
                {"key": "E4"}, {"key": "E4"}, {"key": "E4"},
                {"key": "E4"}, {"key": "E4"}, {"key": "E4"},
                {"key": "E4"}, {"key": "G4"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"},
                {"key": "F4"}, {"key": "F4"}, {"key": "F4"}, {"key": "F4"}, {"key": "F4"}, {"key": "E4"}, {"key": "E4"},
                {"key": "G4"}, {"key": "G4"}, {"key": "F4"}, {"key": "D4"}, {"key": "C4"}
            ]
        )

        # 6. Little White Boat (55 Notes)
        white_boat = Song(
            title="Little White Boat (小白船)",
            notes=[
                {"key": "G4"}, {"key": "A4"}, {"key": "A4"}, {"key": "G4"}, {"key": "E4"}, {"key": "G4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}, {"key": "G3"},
                {"key": "A3"}, {"key": "C4"}, {"key": "D4"}, {"key": "G4"}, {"key": "E4"},
                {"key": "G4"}, {"key": "A4"}, {"key": "A4"}, {"key": "G4"}, {"key": "E4"}, {"key": "G4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}, {"key": "G3"},
                {"key": "A3"}, {"key": "C4"}, {"key": "G3"}, {"key": "D4"}, {"key": "C4"},
                {"key": "E4"}, {"key": "E4"}, {"key": "E4"}, {"key": "D4"}, {"key": "E4"}, {"key": "A4"}, {"key": "G4"},
                {"key": "E4"}, {"key": "D4"}, {"key": "E4"}, {"key": "A4"}, {"key": "G4"},
                {"key": "C5"}, {"key": "G4"}, {"key": "G4"}, {"key": "E4"}, {"key": "G4"}, {"key": "A4"}, 
                {"key": "G4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}, {"key": "G3"}, {"key": "D4"}, {"key": "C4"}
            ]
        )

        # 7. Ode to Joy (62 Notes)
        ode_to_joy = Song(
            title="Ode to Joy",
            notes=[
                {"key": "E4"}, {"key": "E4"}, {"key": "F4"}, {"key": "G4"}, {"key": "G4"}, {"key": "F4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "C4"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"}, {"key": "E4"}, {"key": "D4"}, {"key": "D4"},
                {"key": "E4"}, {"key": "E4"}, {"key": "F4"}, {"key": "G4"}, {"key": "G4"}, {"key": "F4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "C4"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}, {"key": "C4"},
                {"key": "D4"}, {"key": "D4"}, {"key": "E4"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"}, {"key": "F4"}, {"key": "E4"}, {"key": "C4"},
                {"key": "D4"}, {"key": "E4"}, {"key": "F4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}, {"key": "D4"}, {"key": "G3"},
                {"key": "E4"}, {"key": "E4"}, {"key": "F4"}, {"key": "G4"}, {"key": "G4"}, {"key": "F4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "C4"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}, {"key": "C4"}
            ]
        )

        db.session.add_all([happy_birthday, amazing_grace, red_river, twinkle, jingle_bells, white_boat, ode_to_joy])
        
        db.session.commit()
        print("✅ Database populated with Songs!")

if __name__ == "__main__":
    seed_database()