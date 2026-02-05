from app import create_app, db
from app.models import Song

app = create_app()

def seed_database():
    with app.app_context():
        print("🌱 Resetting database...")
        db.drop_all()   
        db.create_all() 
        
        print("🎵 Seeding songs (Step-by-Step Mode)...")

        # 1. Twinkle Twinkle
        twinkle = Song(
            title="Twinkle Twinkle Little Star",
            notes=[
                {"key": "C4"}, {"key": "C4"}, {"key": "G4"}, {"key": "G4"},
                {"key": "A4"}, {"key": "A4"}, {"key": "G4"}, 
                {"key": "F4"}, {"key": "F4"}, {"key": "E4"}, {"key": "E4"},
                {"key": "D4"}, {"key": "D4"}, {"key": "C4"},
                {"key": "G4"}, {"key": "G4"}, {"key": "F4"}, {"key": "F4"},
                {"key": "E4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "C4"}, {"key": "C4"}, {"key": "G4"}, {"key": "G4"},
                {"key": "A4"}, {"key": "A4"}, {"key": "G4"}
            ]
        )

        # 2. Happy Birthday
        happy_birthday = Song(
            title="Happy Birthday",
            notes=[
                {"key": "G3"}, {"key": "G3"}, {"key": "A3"}, {"key": "G3"}, {"key": "C4"}, {"key": "B3"},
                {"key": "G3"}, {"key": "G3"}, {"key": "A3"}, {"key": "G3"}, {"key": "D4"}, {"key": "C4"},
                {"key": "G3"}, {"key": "G3"}, {"key": "G4"}, {"key": "E4"}, {"key": "C4"}, {"key": "B3"}, {"key": "A3"},
                {"key": "F4"}, {"key": "F4"}, {"key": "E4"}, {"key": "C4"}, {"key": "D4"}, {"key": "C4"}
            ]
        )

        # 3. My Heart Will Go On
        titanic = Song(
            title="My Heart Will Go On",
            notes=[
                {"key": "C4"}, {"key": "C4"}, {"key": "C4"}, {"key": "C4"},
                {"key": "B3"}, {"key": "C4"}, 
                {"key": "C4"}, {"key": "B3"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "C4"}, {"key": "C4"}, {"key": "G4"}, 
                {"key": "F4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "C4"}, {"key": "B3"}, {"key": "A3"}, {"key": "G3"}
            ]
        )

        # 4. Ode to Joy
        ode_to_joy = Song(
            title="Ode to Joy",
            notes=[
                {"key": "E4"}, {"key": "E4"}, {"key": "F4"}, {"key": "G4"},
                {"key": "G4"}, {"key": "F4"}, {"key": "E4"}, {"key": "D4"},
                {"key": "C4"}, {"key": "C4"}, {"key": "D4"}, {"key": "E4"},
                {"key": "E4"}, {"key": "D4"}, {"key": "D4"},
                {"key": "D4"}, {"key": "D4"}, {"key": "E4"}, {"key": "C4"},
                {"key": "D4"}, {"key": "E4"}, {"key": "F4"}, {"key": "E4"}, {"key": "C4"},
                {"key": "D4"}, {"key": "E4"}, {"key": "F4"}, {"key": "E4"}, {"key": "D4"}, {"key": "C4"}
            ]
        )

        # 5. Yesterday Once More
        yesterday = Song(
            title="Yesterday Once More",
            notes=[
                {"key": "G3"}, {"key": "C4"}, {"key": "C4"}, 
                {"key": "D4"}, {"key": "E4"}, 
                {"key": "D4"}, {"key": "C4"}, 
                {"key": "B3"}, {"key": "A3"}, {"key": "G3"},
                {"key": "E4"}, {"key": "E4"}, {"key": "E4"},
                {"key": "D4"}, {"key": "C4"},
                {"key": "D4"}, {"key": "E4"},
                {"key": "D4"}
            ]
        )

        # 6. Amazing Grace
        amazing_grace = Song(
            title="Amazing Grace",
            notes=[
                {"key": "G3"}, {"key": "C4"}, 
                {"key": "E4"}, {"key": "C4"},
                {"key": "E4"}, 
                {"key": "D4"}, {"key": "C4"},
                {"key": "A3"}, {"key": "G3"}, 
                {"key": "C4"}, {"key": "E4"}, {"key": "G4"}, {"key": "E4"},
                {"key": "G4"}, {"key": "E4"}, {"key": "C4"}, {"key": "A3"}
            ]
        )

        # 7. Hey Jude
        hey_jude = Song(
            title="Hey Jude",
            notes=[
                {"key": "G4"}, {"key": "E4"}, 
                {"key": "E4"}, {"key": "G4"}, {"key": "A4"}, {"key": "D4"}, 
                {"key": "D4"}, {"key": "E4"}, {"key": "F4"}, {"key": "C5"}, 
                {"key": "C5"}, {"key": "B4"}, {"key": "G4"}, {"key": "A4"}, 
                {"key": "G4"}, {"key": "F4"}, {"key": "E4"}
            ]
        )

        # 8. You Are My Sunshine
        sunshine = Song(
            title="You Are My Sunshine",
            notes=[
                {"key": "G3"}, {"key": "C4"}, {"key": "D4"}, 
                {"key": "E4"}, {"key": "E4"}, {"key": "E4"}, 
                {"key": "D4"}, {"key": "C4"},
                {"key": "G3"}, {"key": "C4"}, {"key": "D4"},
                {"key": "E4"}, {"key": "C4"},
                {"key": "F4"}, {"key": "A4"}, {"key": "A4"},
                {"key": "G4"}, {"key": "F4"}, {"key": "E4"},
                {"key": "C4"},
            ]
        )


        db.session.add_all([twinkle, happy_birthday, titanic, ode_to_joy, yesterday, amazing_grace, hey_jude, sunshine])
        db.session.commit()
        print("✅ Database populated with Songs!")

if __name__ == "__main__":
    seed_database()