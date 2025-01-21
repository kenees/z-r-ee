#!/bin/bash

# File containing the JSON data
JSON_FILE="packages/mobile-sdk/lib/devDependencies.json"

# Backup the original file
cp "$JSON_FILE" "$JSON_FILE.bak"

# Read the JSON file into a variable
JSON_DATA=$(cat "$JSON_FILE")

# Update the JSON manually without third-party tools
UPDATED_JSON=$(echo "$JSON_DATA" | \
  while IFS= read -r line; do
    if echo "$line" | grep -q '"zephyr-repack-plugin"'; then
      echo "$line"
      echo '    "name": "zephyr-repack-plugin",'
      echo '    "version": "../../submodules/zephyr-packages/libs/zephyr-repack-plugin",'
      echo '    "devOnly": true'
      # Skip the next lines that belong to the old structure
      while IFS= read -r skip_line && [[ ! "$skip_line" =~ ^[[:space:]]*} ]]; do :; done
      echo "$skip_line"  # Add the closing bracket
    else
      echo "$line"
    fi
  done)

mv "$JSON_FILE.bak" "$JSON_FILE"

# Run pnpm align-deps
pnpm align-deps
