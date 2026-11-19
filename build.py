"""Build the planner pages.

src/app.html            the planner (3D engine and interface)
src/properties/*.js     one file per home (walls, doors, windows, rooms, built-ins, sample furniture)

Writes:
  index.html            the full page that GitHub Pages serves
  dist/preview.html     the same page without the <!doctype>/<head> wrapper, for the Claude preview

Run:  python3 build.py
"""
from datetime import date
from pathlib import Path

root = Path(__file__).parent
app = (root / "src" / "app.html").read_text(encoding="utf-8")
homes = sorted((root / "src" / "properties").glob("*.js"))
# Flat 9 first, then any other homes alphabetically
homes.sort(key=lambda p: (p.stem != "flat9", p.stem))
scripts = "\n".join(f"<script>/* {p.name} */\n{p.read_text(encoding='utf-8')}</script>" for p in homes)
if "<!--PROPERTIES-->" not in app:
    raise SystemExit("src/app.html is missing the <!--PROPERTIES--> marker")
body = app.replace("<!--PROPERTIES-->", scripts, 1)

(root / "dist").mkdir(exist_ok=True)
(root / "dist" / "preview.html").write_text(body, encoding="utf-8")

head = (
    "<!doctype html>\n<html lang=\"en\">\n<head>\n"
    "<meta charset=\"utf-8\">\n"
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n"
    f"<meta name=\"build-date\" content=\"{date.today().isoformat()}\">\n"
    "<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}"
    "body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>\n"
)
split = body.index('<div class="app">')
html = head + body[:split] + "</head>\n<body>\n" + body[split:] + "\n</body>\n</html>\n"
(root / "index.html").write_text(html, encoding="utf-8")
print(f"Built index.html ({len(html):,} bytes) and dist/preview.html with homes: {', '.join(p.stem for p in homes)}")
