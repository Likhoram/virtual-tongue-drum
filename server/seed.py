from app import create_app, db
from app.models import Song

app = create_app()

def seed_database():
    with app.app_context():
        print("🌱 Resetting database...")
        db.drop_all()   
        db.create_all() 
        
        print("🎵 Seeding 9 FULL songs...")

        # 1. Twinkle Twinkle
        twinkle = Song(
            title="Twinkle Twinkle Little Star",
            notes=[
                {"key": "C4", "time": 0.0}, {"key": "C4", "time": 0.5}, {"key": "G4", "time": 1.0}, {"key": "G4", "time": 1.5},
                {"key": "A4", "time": 2.0}, {"key": "A4", "time": 2.5}, {"key": "G4", "time": 3.0}, 
                {"key": "F4", "time": 4.0}, {"key": "F4", "time": 4.5}, {"key": "E4", "time": 5.0}, {"key": "E4", "time": 5.5},
                {"key": "D4", "time": 6.0}, {"key": "D4", "time": 6.5}, {"key": "C4", "time": 7.0},
                {"key": "G4", "time": 8.0}, {"key": "G4", "time": 8.5}, {"key": "F4", "time": 9.0}, {"key": "F4", "time": 9.5},
                {"key": "E4", "time": 10.0}, {"key": "E4", "time": 10.5}, {"key": "D4", "time": 11.0},
                {"key": "C4", "time": 12.0}, {"key": "C4", "time": 12.5}, {"key": "G4", "time": 13.0}, {"key": "G4", "time": 13.5},
                {"key": "A4", "time": 14.0}, {"key": "A4", "time": 14.5}, {"key": "G4", "time": 15.0}
            ]
        )

        # 2. Happy Birthday
        happy_birthday = Song(
            title="Happy Birthday",
            notes=[
                {"key": "G3", "time": 0.0}, {"key": "G3", "time": 0.25}, {"key": "A3", "time": 0.5}, {"key": "G3", "time": 1.0}, {"key": "C4", "time": 1.5}, {"key": "B3", "time": 2.0},
                {"key": "G3", "time": 3.0}, {"key": "G3", "time": 3.25}, {"key": "A3", "time": 3.5}, {"key": "G3", "time": 4.0}, {"key": "D4", "time": 4.5}, {"key": "C4", "time": 5.0},
                {"key": "G3", "time": 6.0}, {"key": "G3", "time": 6.25}, {"key": "G4", "time": 6.5}, {"key": "E4", "time": 7.0}, {"key": "C4", "time": 7.5}, {"key": "B3", "time": 8.0}, {"key": "A3", "time": 8.5},
                {"key": "F4", "time": 9.5}, {"key": "F4", "time": 9.75}, {"key": "E4", "time": 10.0}, {"key": "C4", "time": 10.5}, {"key": "D4", "time": 11.0}, {"key": "C4", "time": 11.5}
            ]
        )

        # 3. My Heart Will Go On
        titanic = Song(
            title="My Heart Will Go On",
            notes=[
                {"key": "C4", "time": 0.0}, {"key": "C4", "time": 0.8}, {"key": "C4", "time": 1.6}, {"key": "C4", "time": 2.4},
                {"key": "B3", "time": 3.2}, {"key": "C4", "time": 4.0}, 
                {"key": "C4", "time": 5.5}, {"key": "B3", "time": 6.0}, {"key": "C4", "time": 6.5}, {"key": "D4", "time": 7.5}, {"key": "E4", "time": 8.5}, {"key": "D4", "time": 9.5},
                {"key": "C4", "time": 11.0}, {"key": "C4", "time": 12.0}, {"key": "G4", "time": 13.0}, 
                {"key": "F4", "time": 14.0}, {"key": "E4", "time": 14.5}, {"key": "D4", "time": 15.0},
                {"key": "C4", "time": 16.0}, {"key": "B3", "time": 17.0}, {"key": "A3", "time": 18.0}, {"key": "G3", "time": 19.0}
            ]
        )

        # 4. Ode to Joy
        ode_to_joy = Song(
            title="Ode to Joy",
            notes=[
                {"key": "E4", "time": 0.0}, {"key": "E4", "time": 0.5}, {"key": "F4", "time": 1.0}, {"key": "G4", "time": 1.5},
                {"key": "G4", "time": 2.0}, {"key": "F4", "time": 2.5}, {"key": "E4", "time": 3.0}, {"key": "D4", "time": 3.5},
                {"key": "C4", "time": 4.0}, {"key": "C4", "time": 4.5}, {"key": "D4", "time": 5.0}, {"key": "E4", "time": 5.5},
                {"key": "E4", "time": 6.0}, {"key": "D4", "time": 6.5}, {"key": "D4", "time": 7.0},
                {"key": "D4", "time": 8.0}, {"key": "D4", "time": 8.5}, {"key": "E4", "time": 9.0}, {"key": "C4", "time": 9.5},
                {"key": "D4", "time": 10.0}, {"key": "E4", "time": 10.25}, {"key": "F4", "time": 10.5}, {"key": "E4", "time": 11.0}, {"key": "C4", "time": 11.5},
                {"key": "D4", "time": 12.0}, {"key": "E4", "time": 12.25}, {"key": "F4", "time": 12.5}, {"key": "E4", "time": 13.0}, {"key": "D4", "time": 13.5}, {"key": "C4", "time": 14.0}
            ]
        )

        # 5. Little White Boat
        little_white_boat = Song(
            title="Little White Boat (小白船)",
            notes=[
                {"key": "D4", "time": 0.0}, {"key": "B3", "time": 0.5}, {"key": "D4", "time": 1.0}, {"key": "G4", "time": 1.5},
                {"key": "A4", "time": 2.5}, {"key": "B4", "time": 3.0}, {"key": "A4", "time": 3.5}, {"key": "G4", "time": 4.0},
                {"key": "E4", "time": 4.5}, {"key": "D4", "time": 5.0},
                {"key": "D4", "time": 6.0}, {"key": "B3", "time": 6.5}, {"key": "D4", "time": 7.0}, {"key": "G4", "time": 7.5},
                {"key": "A4", "time": 8.5}, {"key": "G4", "time": 9.0}, {"key": "E4", "time": 9.5}, {"key": "D4", "time": 10.0},
                {"key": "D4", "time": 11.0}, {"key": "D4", "time": 11.5}, {"key": "E4", "time": 12.0}, {"key": "G4", "time": 12.5}, {"key": "E4", "time": 13.5}
            ]
        )

        # 6. Yesterday Once More
        yesterday = Song(
            title="Yesterday Once More",
            notes=[
                {"key": "G3", "time": 0.0}, {"key": "C4", "time": 0.5}, {"key": "C4", "time": 1.0}, 
                {"key": "D4", "time": 1.5}, {"key": "E4", "time": 2.0}, 
                {"key": "D4", "time": 2.5}, {"key": "C4", "time": 3.0}, 
                {"key": "B3", "time": 3.5}, {"key": "A3", "time": 4.0}, {"key": "G3", "time": 4.5},
                {"key": "E4", "time": 6.0}, {"key": "E4", "time": 6.5}, {"key": "E4", "time": 7.0},
                {"key": "D4", "time": 7.5}, {"key": "C4", "time": 8.0},
                {"key": "D4", "time": 8.5}, {"key": "E4", "time": 9.0},
                {"key": "D4", "time": 10.0}
            ]
        )

        # 7. Amazing Grace
        amazing_grace = Song(
            title="Amazing Grace",
            notes=[
                {"key": "G3", "time": 0.0}, {"key": "C4", "time": 0.5}, 
                {"key": "E4", "time": 1.0}, {"key": "C4", "time": 1.5},
                {"key": "E4", "time": 2.0}, 
                {"key": "D4", "time": 3.0}, {"key": "C4", "time": 3.5},
                {"key": "A3", "time": 4.0}, {"key": "G3", "time": 5.0}, 
                {"key": "C4", "time": 6.0}, {"key": "E4", "time": 6.5}, {"key": "G4", "time": 7.0}, {"key": "E4", "time": 7.5},
                {"key": "G4", "time": 8.0}, {"key": "E4", "time": 9.0}, {"key": "C4", "time": 9.5}, {"key": "A3", "time": 10.0}
            ]
        )

        # 8. Red River Valley
        red_river = Song(
            title="Red River Valley (红河谷)",
            notes=[
                {"key": "G3", "time": 0.0}, {"key": "C4", "time": 0.5}, {"key": "D4", "time": 1.0}, 
                {"key": "E4", "time": 1.5}, {"key": "E4", "time": 2.0},
                {"key": "D4", "time": 2.5}, {"key": "C4", "time": 3.0}, {"key": "D4", "time": 3.5},
                {"key": "C4", "time": 4.0}, {"key": "A3", "time": 4.5}, {"key": "G3", "time": 5.0},
                {"key": "G3", "time": 6.0}, {"key": "C4", "time": 6.5}, {"key": "E4", "time": 7.0},
                {"key": "G4", "time": 7.5}, {"key": "F4", "time": 8.0}, {"key": "E4", "time": 8.5}, {"key": "D4", "time": 9.0}
            ]
        )

        # 9. Hey Jude
        hey_jude = Song(
            title="Hey Jude",
            notes=[
                {"key": "G4", "time": 0.0}, {"key": "E4", "time": 1.0}, 
                {"key": "E4", "time": 2.0}, {"key": "G4", "time": 2.5}, {"key": "A4", "time": 3.0}, {"key": "D4", "time": 4.0}, 
                {"key": "D4", "time": 5.0}, {"key": "E4", "time": 5.5}, {"key": "F4", "time": 6.0}, {"key": "C5", "time": 7.0}, 
                {"key": "C5", "time": 8.0}, {"key": "B4", "time": 8.5}, {"key": "G4", "time": 9.0}, {"key": "A4", "time": 9.5}, 
                {"key": "G4", "time": 10.0}, {"key": "F4", "time": 10.5}, {"key": "E4", "time": 11.5}
            ]
        )

        db.session.add_all([twinkle, happy_birthday, titanic, ode_to_joy, little_white_boat, yesterday, amazing_grace, red_river, hey_jude])
        db.session.commit()
        print("✅ Database populated with 9 FULL-LENGTH songs!")

if __name__ == "__main__":
    seed_database()