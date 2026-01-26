from app import create_app
import os
import sys

# 1. This helps us find the seed.py file
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# 2. Import your seed function
try:
    from seed import seed_database
except ImportError:
    # Fallback in case of path issues
    from server.seed import seed_database

app = create_app()

# 3. Create a temporary "Button" to run the script
@app.route('/seed_db')
def run_seeding():
    try:
        seed_database()
        return """
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: green;">✅ Database Seeded Successfully!</h1>
            <p>You have added 9 full songs to your database.</p>
            <p>You can now go back to the <a href="/">Game Home Page</a>.</p>
        </div>
        """, 200
    except Exception as e:
        return f"<h1>Error:</h1><p>{str(e)}</p>", 500

if __name__ == '__main__':
    app.run()