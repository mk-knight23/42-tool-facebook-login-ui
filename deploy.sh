#!/bin/bash

# =============================================================================
# Facebook Login UI - Deployment Script
# =============================================================================
# Deploys the Angular-based Facebook Login UI to Vercel
# =============================================================================

set -e

REPO_NAME="42-tool-facebook-login-ui"
VERCEL_PROJECT="antigravity-42-tool-facebook-login-ui"

echo "🚀 Deploying $REPO_NAME to Vercel..."

# Check if vercel-cli is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing vercel-cli..."
    npm install -g vercel
fi

# Deploy to Vercel (production)
echo "🔗 Deploying to Vercel..."
vercel --token="$VERCEL_TOKEN" --prod --yes

echo "✅ Deployment complete!"
echo "🌐 Live URL: https://$REPO_NAME.vercel.app"
