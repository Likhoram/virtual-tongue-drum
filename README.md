#  Virtual Tongue Drum

### A Full-Stack Rhythm Arcade Game
**Live Demo:** [Play the Game Here](https://virtual-tongue-drum.vercel.app/)

![Python](https://img.shields.io/badge/Backend-Python%20%7C%20Flask-blue)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-61DAFB)
![Deploy](https://img.shields.io/badge/Deploy-Render%20%26%20Vercel-success)

##  About
Virtual Tongue Drum is a web-based rhythm game that combines musicality with arcade-style mechanics. This project simulates the pitched percussion instrument Tongue Drum with a circular layout, requiring players to map visual cues to spatial inputs in real-time.

Why I built this:
Leveraging my background in Music Composition (PhD) and Software Engineering, I wanted to build an application that handles precise timing data, manages complex state synchronization between client/server, and persists competitive user data.

---

##  Backend Architecture 

The application is built as a decoupled **Client-Server** architecture.

###  API Design (Flask & SQLAlchemy)
The backend serves as the source of truth for game data (Songs, Note Maps) and user persistence (Scores, Leaderboards).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/songs` | Fetches all available songs and their note maps (JSON). |
| `GET` | `/api/scores` | Retrieves the global high-score list (SQL Aggregation). |
| `POST` | `/api/scores` | Validates and saves a new game result. |
| `GET` | `/seed_db` | **DevOps Utility:** Triggers a schema rebuild and data seed for rapid iteration. |

###  Database Schema (PostgreSQL)
The database is normalized to ensure data integrity while allowing flexible song structures.

* **Users:** Stores unique player identities.
* **Songs:** Stores metadata and uses a `JSON` column for `notes`.
    * *Decision:* Storing notes as JSON instead of a separate table allows for faster retrieval of the entire song structure in a single query, reducing latency during game load.
* **Scores:** A join table linking Users and Songs with performance metrics (`mistakes`, `score`, `timestamp`).

##  Tech Stack

**Backend:**
* **Language:** Python 3.10
* **Framework:** Flask (REST API)
* **ORM:** SQLAlchemy
* **Database:** PostgreSQL (Production), SQLite (Dev)

**Frontend:**
* **Framework:** React 18 (Vite)
* **Language:** TypeScript
* **Styling:** CSS-in-JS (Inline dynamic styles) + CSS Modules
* **Audio:** Web Audio API (Tone.js / Howler)

