import sqlite3
import json
import datetime

db_path = r'C:\Users\Roya\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Session: CICD setup ses_0aacb65cdffe9osXvn2oQtry2O (252 messages)
# Get all user messages
session_id = 'ses_0aacb65cdffe9osXvn2oQtry2O'
cur.execute('''
    SELECT m.id, m.data, m.time_created
    FROM message m
    WHERE m.session_id = ? AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
''', (session_id,))
rows = cur.fetchall()
print("=== CICD SESSION USER MESSAGES ===")
for r in rows:
    data = json.loads(r['data'])
    text_parts = data.get('content', [])
    if isinstance(text_parts, str):
        text = text_parts[:300]
    elif isinstance(text_parts, list):
        text = ' '.join([p.get('text', '')[:200] for p in text_parts if p.get('type') == 'text'])[:300]
    else:
        text = str(text_parts)[:300]
    ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%m-%d %H:%M')
    print(f"  [{ts}] {text}")

print("\n")

# Session: SEO ses_0ae932f72ffe0N3352xyy8onU1 (594 messages)
session_id2 = 'ses_0ae932f72ffe0N3352xyy8onU1'
cur.execute('''
    SELECT m.id, m.data, m.time_created
    FROM message m
    WHERE m.session_id = ? AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
''', (session_id2,))
rows2 = cur.fetchall()
print("=== SEO SESSION USER MESSAGES ===")
for r in rows2:
    data = json.loads(r['data'])
    text_parts = data.get('content', [])
    if isinstance(text_parts, str):
        text = text_parts[:300]
    elif isinstance(text_parts, list):
        text = ' '.join([p.get('text', '')[:200] for p in text_parts if p.get('type') == 'text'])[:300]
    else:
        text = str(text_parts)[:300]
    ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%m-%d %H:%M')
    print(f"  [{ts}] {text}")

conn.close()
