import sqlite3
import json
import datetime

db_path = r'C:\Users\Roya\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

def extract_text(data_json, max_len=400):
    """Extract user text from message data."""
    data = json.loads(data_json)
    role = data.get('role', '?')
    content = data.get('content', '')
    if isinstance(content, str):
        return content[:max_len]
    elif isinstance(content, list):
        texts = []
        for p in content:
            if isinstance(p, dict):
                t = p.get('text', '')
                if t:
                    texts.append(t[:200])
        return ' | '.join(texts)[:max_len]
    return str(content)[:max_len]

# Session: CICD setup
session_id = 'ses_0aacb65cdffe9osXvn2oQtry2O'
cur.execute('''
    SELECT m.id, m.data, m.time_created
    FROM message m
    WHERE m.session_id = ? AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
''', (session_id,))
rows = cur.fetchall()
print("=== CICD SESSION (ses_0aacb65cdffe) USER MESSAGES ===")
for r in rows:
    text = extract_text(r['data'])
    ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%m-%d %H:%M')
    if text.strip():
        print(f"  [{ts}] {text[:350]}")
    else:
        print(f"  [{ts}] (empty/attachment only)")

print("\n")

# Now check the assistant messages for key decisions and durable knowledge
# in the CICD session - look for "user says", "remember", "rule" type things
session_id = 'ses_0aacb65cdffe9osXvn2oQtry2O'
cur.execute('''
    SELECT m.id, m.data, m.time_created
    FROM message m
    WHERE m.session_id = ? AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
''', (session_id,))
rows = cur.fetchall()
print("=== CICD SESSION - ALL USER DATA RAW ===")
for r in rows:
    data = json.loads(r['data'])
    ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%m-%d %H:%M')
    # Print full data structure for first few
    content = data.get('content', '')
    if isinstance(content, str):
        print(f"  [{ts}] str: {content[:400]}")
    elif isinstance(content, list):
        for i, p in enumerate(content):
            if isinstance(p, dict):
                ptype = p.get('type', '?')
                if ptype == 'text':
                    print(f"  [{ts}] text[{i}]: {p.get('text', '')[:400]}")
                elif ptype == 'image':
                    print(f"  [{ts}] image[{i}]: {p.get('source', {}).get('type', 'unknown')}")
                elif ptype == 'tool_result':
                    print(f"  [{ts}] tool_result[{i}]")
                else:
                    print(f"  [{ts}] {ptype}[{i}]: {str(p)[:200]}")

conn.close()
