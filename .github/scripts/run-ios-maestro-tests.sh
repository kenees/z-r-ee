#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define the ports as a constant variable
PORTS=(8081 9000 9001 9002)

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Source the kill-mobile-development-servers.sh script to use the kill_mobile_development_servers function
source "$SCRIPT_DIR/kill-mobile-development-servers.sh"

# Set the trap to execute kill_mobile_development_servers on script exit
trap 'kill_mobile_development_servers "${PORTS[@]}"' EXIT

echo "🚀 Starting iOS Maestro tests..."

# Start the mobile servers in the background
echo "🔧 Starting mobile servers..."
pnpm run start:mobile:concurrently & # runs in background
echo "✅ Mobile servers started successfully."

# Build and install the mobile app on the device
echo "📱 Building and installing the app on the device..."
pnpm run:mobile-host:ios --simulator="$SIMULATOR_NAME"
echo "✅ App built and installed successfully."

# Run the end-to-end test scripts
echo "🧪 Running end-to-end test scripts..."
pnpm --filter mobile-e2e test:all
echo "✅ Test scripts executed successfully."

echo "🎉 All commands executed successfully. iOS Maestro tests completed."
