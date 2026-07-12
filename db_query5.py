import sqlite3
import json
import datetime

db_path = r'C:\Users\Roya\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

def get_user_texts(session_id):
    """Get user text from parts table for a session."""
    cur.execute('''
        SELECT p.id, p.data, p.time_created, m.id as msg_id
        FROM part p
        JOIN message m ON p.message_id = m.id
        WHERE p.session_id = ?
          AND json_extract(m.data, '$.role') = 'user'
          AND json_extract(p.data, '$.type') = 'text'
        ORDER BY p.time_created
    ''', (session_id,))
    rows = cur.fetchall()
    results = []
    for r in rows:
        data = json.loads(r['data'])
        text = data.get('text', '')
        ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%m-%d %H:%M')
        results.append((ts, text))
    return results

# CICD session - user messages
print("=== CICD SESSION USER TEXTS ===")
texts = get_user_texts('ses_0aacb65cdffe9osXvn2oQtry2O')
for ts, t in texts:
    if t.strip():
        print(f"  [{ts}] {t[:500]}")
    else:
        print(f"  [{ts}] (empty)")

# SEO session - user messages (just last few)
print("\n=== SEO SESSION USER TEXTS (last 20) ===")
texts = get_user_texts('ses_0ae932f72ffe0N3352xyy8onU1')
for ts, t in texts[-20:]:
    if t.strip():
        print(f"  [{ts}] {t[:500]}")
    else:
        print(f"  [{ts}] (empty)")

# Also search for "always", "never", "remember", "rule", "decision" keywords in user text across all Apletv2 sessions
print("\n=== KEYWORD SEARCH: User directives across all sessions ===")
cur.execute('''
    SELECT p.data, p.time_created, s.title
    FROM part p
    JOIN message m ON p.message_id = m.id
    JOIN session s ON m.session_id = s.id
    WHERE s.directory LIKE '%Apletv2%'
      AND json_extract(m.data, '$.role') = 'user'
      AND json_extract(p.data, '$.type') = 'text'
      AND (
        json_extract(p.data, '$.text') LIKE '%always%'
        OR json_extract(p.data, '$.text') LIKE '%never%'
        OR json_extract(p.data, '$.text') LIKE '%remember%'
        OR json_extract(p.data, '$.text') LIKE '%rule%'
        OR json_extract(p.data, '$.text') LIKE '%must%'
        OR json_extract(p.data, '$.text') LIKE '%should%'
      )
    ORDER BY p.time_created DESC
    LIMIT 30
''', ())
rows = cur.fetchall()
for r in rows:
    data = json.loads(r['data'])
    text = data.get('text', '')[:400]
    ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%Y-%m-%d %H:%M')
    title = r['title'][:50] if r['title'] else '?'
    if text.strip():
        print(f"  [{ts}] ({title}) {text}")

# Search for error patterns
print("\n=== KEYWORD SEARCH: Error/fix patterns ===")
cur.execute('''
    SELECT p.data, p.time_created, s.title
    FROM part p
    JOIN message m ON p.message_id = m.id
    JOIN session s ON m.session_id = s.id
    WHERE s.directory LIKE '%Apletv2%'
      AND json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'text'
      AND (
        json_extract(p.data, '$.text') LIKE '%gotcha%'
        OR json_extract(p.data, '$.text') LIKE '%pitfall%'
        OR json_extract(p.data, '$.text') LIKE '%important%'
        OR json_extract(p.data, '$.text') LIKE '%critical%'
      )
    ORDER BY p.time_created DESC
    LIMIT 20
''', ())
rows = cur.fetchall()
for r in rows:
    data = json.loads(r['data'])
    text = data.get('text', '')[:400]
    ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%Y-%m-%d %H:%M')
    title = r['title'][:50] if r['title'] else '?'
    if text.strip():
        print(f"  [{ts}] ({title}) {text}")

conn.close()
