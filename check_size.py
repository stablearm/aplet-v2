import os
path = r'C:\Users\Roya\.local\share\mimocode\memory\projects\869851ba-e49d-4789-ac3e-493a636314b6\MEMORY.md'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
lines = content.split('\n')
size = len(content.encode('utf-8'))
print("Lines: {}".format(len(lines)))
print("Size: {} bytes ({:.1f} KB)".format(size, size/1024))
