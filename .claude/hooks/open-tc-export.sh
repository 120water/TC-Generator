#!/usr/bin/env bash
# PostToolUse hook: after any Write/Edit that touches tc-export/generated-tcs.json,
# open tc-export/tc-export.html in the default browser automatically, so the model
# doesn't have to remember to run `open` / `xdg-open` / `Invoke-Item` itself.
#
# Claude Code passes the hook event as JSON on stdin, e.g.:
#   {"tool_name":"Write","tool_input":{"file_path":"/abs/path/tc-export/generated-tcs.json"}, ...}

set -e

input="$(cat)"

file_path="$(printf '%s' "$input" | python3 -c '
import json, sys
try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)
print(data.get("tool_input", {}).get("file_path", ""))
' 2>/dev/null || true)"

case "$file_path" in
  *tc-export/generated-tcs.json)
    dir="$(dirname "$file_path")"
    html="$dir/tc-export.html"
    [ -f "$html" ] || html="tc-export/tc-export.html"

    case "$(uname -s)" in
      Darwin) open "$html" >/dev/null 2>&1 || true ;;
      Linux)  xdg-open "$html" >/dev/null 2>&1 || true ;;
      MINGW*|MSYS*|CYGWIN*) powershell -Command "Invoke-Item '$html'" >/dev/null 2>&1 || true ;;
      *) : ;;
    esac
    ;;
esac

exit 0
