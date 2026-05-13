#!/usr/bin/env bash
#
# Cron entry point — sets up env then runs the TS scheduler.
#
# Why a wrapper script: cron's environment is minimal (no PATH for Homebrew, no
# keychain on macOS). We export what's needed before invoking npm/tsx.
#
# Wire up from crontab (see crontab.example) or test manually:
#     ./scheduler/daily.sh
#     ./scheduler/daily.sh "원하는 프롬프트"

set -euo pipefail

DEMO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DEMO_DIR"

# Make sure homebrew + nodenv/asdf bins are visible from cron.
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

# Load .env into the environment so claude/telegram tokens are visible.
if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

# If your `claude` CLI relies on macOS keychain (OAuth) and you run this from
# cron without a login session, set ANTHROPIC_API_KEY in .env so the CLI uses
# the API key directly instead of the keychain.

LOG_FILE="${DEMO_DIR}/scheduler/last-run.log"
: > "$LOG_FILE"
{
  echo "=== run at $(date -u +%Y-%m-%dT%H:%M:%SZ) (cwd=$(pwd)) ==="
  echo "PATH=$PATH"
  echo "claude binary: $(command -v claude || echo not-found)"
  echo "tsx binary:    $(command -v tsx || echo via-npx)"
  echo "---"
} >> "$LOG_FILE"

npx --yes tsx src/scheduler.ts "$@" >> "$LOG_FILE" 2>&1
