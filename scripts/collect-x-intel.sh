#!/bin/bash
# collect-x-intel.sh — Search X for PayPal keywords, store results in CompanyEvents
# Runs via cron: 07:00, 13:00, 20:00 (Asia/Taipei)
# Each keyword: 3 results max, no content filtering (raw collection)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="/Users/allenchenmac/AI-Workspace/memory/daily"
LOG_FILE="${LOG_DIR}/x-intel-collect.log"
TMP_DIR="/tmp/ivc-collect"
PAYLOAD_API="http://localhost:3000/api/company-events"
PAYPAL_COMPANY_ID=2
MAX_RESULTS=3

# Direct paths (no nvm loading needed)
BIRD="/Users/allenchenmac/.nvm/versions/node/v22.22.0/bin/bird"
PYTHON="/usr/local/bin/python3"

mkdir -p "$TMP_DIR" "$LOG_DIR"

# Load bird credentials
if [ -f "${SCRIPT_DIR}/.env.bird" ]; then
  export AUTH_TOKEN=$(grep '^AUTH_TOKEN=' "${SCRIPT_DIR}/.env.bird" | cut -d= -f2)
  export CT0=$(grep '^CT0=' "${SCRIPT_DIR}/.env.bird" | cut -d= -f2)
else
  echo "[$(date -Iseconds)] ERROR: .env.bird not found" >> "$LOG_FILE"
  exit 1
fi

log() {
  echo "[$(date -Iseconds)] $1" >> "$LOG_FILE"
}

log "=== Collection run started ==="
total_stored=0

for keyword in "paypal" "PYPL"; do
  log "Searching: ${keyword}"

  # Save bird JSON to temp file
  "$BIRD" search "$keyword" -n "$MAX_RESULTS" --json > "$TMP_DIR/results.json" 2>/dev/null || echo "[]" > "$TMP_DIR/results.json"

  # Process with Python using temp file
  stored=$("$PYTHON" "$SCRIPT_DIR/process-tweets.py" \
    --input "$TMP_DIR/results.json" \
    --api "$PAYLOAD_API" \
    --company-id "$PAYPAL_COMPANY_ID" \
    --keyword "$keyword" 2>> "$LOG_FILE")

  log "  Keyword '${keyword}': ${stored} tweets stored"
  total_stored=$((total_stored + stored))
done

rm -f "$TMP_DIR/results.json"
log "=== Collection complete: ${total_stored} tweets stored ==="
