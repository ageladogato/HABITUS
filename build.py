#!/usr/bin/env python3
"""Build Habitus: stitches src/ into one self-contained index.html.

Usage:  python3 build.py
The script files are joined in the order listed in src/build-order.txt,
because they all share one scope (later files use functions from earlier ones).
"""
from pathlib import Path
import subprocess, sys

root = Path(__file__).parent
src = root / "src"
order = [l.strip() for l in (src / "build-order.txt").read_text().splitlines() if l.strip()]
js = "".join((src / name).read_text() for name in order)
html = (src / "template.html").read_text()
html = html.replace("/*STYLES*/", (src / "styles.css").read_text()).replace("/*SCRIPTS*/", js)
(root / "index.html").write_text(html)
print(f"Built index.html from {len(order)} script files ({len(html)//1024} KB).")

# Optional syntax check if Node.js is installed
try:
    tmp = root / ".build-check.js"
    tmp.write_text(js)
    r = subprocess.run(["node", "--check", str(tmp)], capture_output=True, text=True)
    tmp.unlink()
    if r.returncode:
        print("JavaScript syntax error:\n" + r.stderr); sys.exit(1)
    print("Syntax check passed.")
except FileNotFoundError:
    print("(Node.js not found, skipped syntax check.)")
