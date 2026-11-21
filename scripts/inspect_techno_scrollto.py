import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    'https://www.technosahotsava.in/assets/index-Dje3lYy2.js',
    headers={'User-Agent': 'Mozilla/5.0'}
)

with urllib.request.urlopen(req, context=ctx) as r:
    code = r.read().decode('utf-8', errors='ignore')

# Search for all occurrences of scrollTo in user code
matches = list(re.finditer(r'\.scrollTo\([^)]*\)', code))
print("Found scrollTo calls:", len(matches))
for m in matches:
    snippet = code[max(0, m.start()-100):min(len(code), m.end()+100)]
    print("Snippet:", snippet)
    print("-" * 50)
