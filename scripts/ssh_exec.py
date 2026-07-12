import subprocess
import sys
import time

host = sys.argv[1]
user = sys.argv[2]
password = sys.argv[3]
command = " ".join(sys.argv[4:])

# Use plink-style approach with expect via subprocess
# On Windows, we'll use a PowerShell approach with SSH
ps_script = f'''
$securePassword = ConvertTo-SecureString "{password}" -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential("{user}", $securePassword)
# Can't use PSCredential with SSH directly, try expect-like
'''

# Alternative: use ssh with StrictHostKeyChecking and pipe password
# Actually, let's generate an SSH key and push it
import os
import tempfile

key_path = os.path.join(tempfile.gettempdir(), "aplet_deploy_key")

# Generate key if not exists
if not os.path.exists(key_path):
    subprocess.run(
        ["ssh-keygen", "-t", "ed25519", "-f", key_path, "-N", "", "-q"],
        check=True
    )

# Read public key
with open(key_path + ".pub", "r") as f:
    pub_key = f.read().strip()

# We need to add the key to the server
# Use subprocess with expect-like behavior
# Since we can't do password auth easily, let's try a different approach

# Write a temporary expect-like script
expect_script = f'''#!/usr/bin/expect -f
spawn ssh -o StrictHostKeyChecking=no {user}@{host} "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '{pub_key}' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && echo KEY_ADDED"
expect {{
    "password:" {{
        send "{password}\\r"
        exp_continue
    }}
    "KEY_ADDED" {{
        exit 0
    }}
    timeout {{
        exit 1
    }}
    eof {{
        exit 1
    }}
}}'''

expect_path = os.path.join(tempfile.gettempdir(), "setup_key.exp")
with open(expect_path, "w") as f:
    f.write(expect_script)

result = subprocess.run(["expect", expect_path], capture_output=True, text=True, timeout=30)
print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)
print("RC:", result.returncode)

if result.returncode == 0:
    print("Key added successfully!")
    # Now run the actual command with the key
    result2 = subprocess.run(
        ["ssh", "-i", key_path, "-o", "StrictHostKeyChecking=no", f"{user}@{host}", command],
        capture_output=True, text=True, timeout=120
    )
    print(result2.stdout)
    if result2.stderr:
        print("STDERR:", result2.stderr)
    sys.exit(result2.returncode)
else:
    print("Failed to add SSH key")
    sys.exit(1)
