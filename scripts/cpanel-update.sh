#!/bin/sh
# Run this script on the cPanel server from the repo root (e.g. ~/pletenyikit-react).
# It fetches origin and resets the current branch to match origin/main exactly.
# Use after fixing "Diverging branches can't be fast-forwarded" (Error 128), or for future updates.

set -e

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Error: Not inside a Git repository. Run this from your repo root on the server."
  exit 1
fi

echo "Fetching origin..."
git fetch origin

echo "Resetting to origin/main..."
git reset --hard origin/main

echo "Done. Branch now matches origin/main."
