"""Build the GitHub Pages site from src/planner.html.

src/planner.html is the same file published as the Claude preview page (it has no
<!doctype>/<head> wrapper, because Claude adds that when publishing). This script
adds the wrapper and writes index.html, which is what GitHub Pages serves.
Run:  python3 build.py
"""
from datetime import date
from pathlib import Path

root = Path(__file__).parent
body = (root / "src" / "planner.html").read_text(encoding="utf-8")
head = (
    "<!doctype html>\n<html lang=\"en\">\n<head>\n"
    "<meta charset=\"utf-8\">\n"
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n"
    f"<meta name=\"build-date\" content=\"{date.today().isoformat()}\">\n"
    "<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}"
    "body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>\n"
)
# move the page's own <title>/<meta>/<link>/<style> into <head>; everything from the app markup on goes in <body>
split = body.index('<div class="app">')
html = head + body[:split] + "</head>\n<body>\n" + body[split:] + "\n</body>\n</html>\n"
(root / "index.html").write_text(html, encoding="utf-8")
print("index.html built,", len(html), "bytes")
