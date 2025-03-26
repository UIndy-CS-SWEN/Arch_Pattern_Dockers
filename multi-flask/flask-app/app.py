from flask import Flask
import os
import mysql.connector

app = Flask(__name__)

db_config = {
    "host": os.getenv("DATABASE_HOST", "mysql"),
    "user": os.getenv("DATABASE_USER", "root"),
    "password": os.getenv("DATABASE_PASSWORD", "root"),
    "database": os.getenv("DATABASE_NAME", "mydb"),
}

@app.route("/")
def hello():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()
        return f"Hello from Flask! Connected to DB: {db_name[0]}"
    except Exception as e:
        return f"Database connection failed: {str(e)}"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)