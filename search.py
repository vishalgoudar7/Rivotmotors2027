import os
import re

directories = ["app", "components", "lib", "api", "config", "prisma"]

# Terms to search (case-insensitive words/phrases)
terms_ci = [
    r"todo",
    r"fixme",
    r"hack",
    r"placeholder",
    r"coming soon",
    r"under construction",
    r"not implemented"
]

# Regex patterns
patterns = [
    # todo, fixme, hack, etc.
    (re.compile(r"\b(" + "|".join(terms_ci) + r")\b", re.IGNORECASE), "Unfinished indicator term"),
    # return null / return undefined
    (re.compile(r"return\s+(null|undefined)\b"), "Return null/undefined"),
    # empty click handlers
    (re.compile(r"onClick\s*=\s*\{\s*(\(\s*\)|[a-zA-Z0-9_]+)\s*=>\s*\{\s*\}\s*\}"), "Empty arrow function click handler"),
    (re.compile(r"onClick\s*=\s*\{\s*async\s*\(\s*\)\s*=>\s*\{\s*\}\s*\}"), "Empty async arrow function click handler"),
    (re.compile(r"onClick\s*=\s*\{\s*\(\s*\)\s*=>\s*(null|undefined)\s*\}"), "Click handler returning null/undefined"),
    # disabled buttons: e.g. <button ... disabled ...> or <Button ... disabled ...> or disabled={true}
    # Note: disabled buttons are only indicative of unfinished if they are permanently disabled, e.g. disabled={true} or static disabled prop.
    # Let's search for disabled props/attributes in JSX/TSX
    (re.compile(r"\bdisabled\s*=\s*\{\s*true\s*\}"), "Explicitly disabled component (disabled={true})"),
    (re.compile(r"<[A-Za-z]+[^>]*?disabled(?!=)[^>]*?>"), "Plain disabled attribute in HTML/JSX tag"),
]

def search_files():
    results = []
    for d in directories:
        if not os.path.exists(d):
            continue
        for root, dirs, files in os.walk(d):
            for file in files:
                # Only check relevant source files (js, jsx, ts, tsx, css, prisma schemas)
                if not file.endswith((".js", ".jsx", ".ts", ".tsx", ".prisma", ".json")):
                    continue
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        lines = f.readlines()
                except Exception:
                    continue
                
                for i, line in enumerate(lines):
                    for pat, desc in patterns:
                        match = pat.search(line)
                        if match:
                            results.append({
                                "file": file_path,
                                "line_num": i + 1,
                                "snippet": line.strip(),
                                "pattern_desc": desc,
                                "match_text": match.group(0)
                            })
    return results

search_results = search_files()
print(f"Total results: {len(search_results)}")
for r in search_results:
    print(f"FILE: {r['file']}:{r['line_num']}")
    print(f"DESC: {r['pattern_desc']} (matched: '{r['match_text']}')")
    print(f"CODE: {r['snippet']}")
    print("-" * 50)
