from app import create_app
import os
import sys


sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from seed import seed_database
except ImportError:
    from server.seed import seed_database

app = create_app()

@app.route('/seed_db')
def run_seeding():
    try:
        seed_database()
        return "✅ Database Seeded Successfully! Go play!", 200
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)