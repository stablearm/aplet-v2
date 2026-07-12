import sqlite3
import json

db_path = r'C:\Users\Roya\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# List tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [r[0] for r in cur.fetchall()]
print("TABLES:", tables)
print()

# Get schema for key tables
for t in ['session', 'message', 'part', 'task', 'task_event', 'actor_registry']:
    if t in tables:
        cur.execute("PRAGMA table_info({})".format(t))
        cols = [(r[1], r[2]) for r in cur.fetchall()]
        print("SCHEMA {}: {}".format(t, cols))
        print()

# List recent sessions for this project
cur.execute("SELECT id, directory, title, time_created FROM session WHERE directory LIKE '%Apletv2%' ORDER BY time_created DESC LIMIT 30")
rows = cur.fetchall()
print("RECENT SESSIONS for Apletv2 (last 30):")
for r in rows:
    print("  {} | dir={} | title={} | time={}".format(r[0], r[1], r[2], r[3]))

# Count total messages per session
print("\nMESSAGE COUNTS for Apletv2 sessions:")
for r in rows:
    cur.execute("SELECT COUNT(*) FROM message WHERE session_id=?", (r[0],))
    mc = cur.fetchone()[0]
    print("  {} => {} messages".format(r[0], mc))

conn.close()
