import sqlite3
import json
import datetime

db_path = r'C:\Users\Roya\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Check the actual data structure of user messages - look for images
session_id = 'ses_0aacb65cdffe9osXvn2oQtry2O'
cur.execute('''
    SELECT m.id, m.data, m.time_created
    FROM message m
    WHERE m.session_id = ? AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
    LIMIT 5
''', (session_id,))
rows = cur.fetchall()
print("=== CICD SESSION - RAW USER MESSAGE DATA (first 5) ===")
for r in rows:
    ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%m-%d %H:%M')
    data_str = r['data']
    # Parse to see keys
    data = json.loads(data_str)
    print(f"\n[{ts}] keys: {list(data.keys())}")
    content = data.get('content', '')
    print(f"  content type: {type(content).__name__}")
    if isinstance(content, str):
        print(f"  content value: repr={repr(content[:200])}")
    elif isinstance(content, list):
        for i, item in enumerate(content[:5]):
            if isinstance(item, dict):
                print(f"  content[{i}] keys: {list(item.keys())}")
                print(f"  content[{i}]: {json.dumps(item, ensure_ascii=False)[:300]}")

# Check part table for image references
print("\n\n=== PART TABLE FOR CICD SESSION (first 10) ===")
cur.execute('''
    SELECT p.id, p.data, p.time_created
    FROM part p
    WHERE p.session_id = ?
    ORDER BY p.time_created
    LIMIT 10
''', (session_id,))
parts = cur.fetchall()
for p in parts:
    data = json.loads(p['data'])
    ptype = data.get('type', '?')
    ts = datetime.datetime.fromtimestamp(p['time_created']/1000).strftime('%m-%d %H:%M')
    preview = json.dumps(data, ensure_ascii=False)[:300]
    print(f"  [{ts}] type={ptype} | {preview}")

# Now check the assistant tool calls for durable knowledge in CICD session
print("\n\n=== CICD SESSION - ASSISTANT TOOL CALLS (sampling) ===")
cur.execute('''
    SELECT m.id, m.data, m.time_created
    FROM message m
    WHERE m.session_id = ? AND json_extract(m.data, '$.role') = 'assistant'
    ORDER BY m.time_created
''', (session_id,))
rows = cur.fetchall()
print(f"Total assistant messages: {len(rows)}")

# Find tool calls with bash/write/edit
for r in rows:
    data = json.loads(r['data'])
    content = data.get('content', '')
    if isinstance(content, list):
        for item in content:
            if isinstance(item, dict) and item.get('type') == 'tool_use':
                tool = item.get('name', '?')
                inp = item.get('input', {})
                if tool in ['bash', 'write', 'edit']:
                    if tool == 'bash':
                        cmd = inp.get('command', '')[:150]
                        ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%m-%d %H:%M')
                        print(f"  [{ts}] {tool}: {cmd}")
                    elif tool == 'write':
                        fp = inp.get('file_path', '')[:100]
                        ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%m-%d %H:%M')
                        print(f"  [{ts}] write: {fp}")
                    elif tool == 'edit':
                        fp = inp.get('file_path', '')[:100]
                        ts = datetime.datetime.fromtimestamp(r['time_created']/1000).strftime('%m-%d %H:%M')
                        print(f"  [{ts}] edit: {fp}")

conn.close()
