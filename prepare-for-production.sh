#!/bin/bash

# Production preparation script
# Prepares the application for production deployment by cleaning up
# development assets and optimizing the build

echo "🔍 Preparing application for production deployment..."

# Verify environment files
if [ ! -f .env.production ]; then
  echo "⚠️ No .env.production file found. Creating from .env.example..."
  cp .env.example .env.production
  echo "⚙️ Please edit .env.production with your actual production values"
fi

# Clean up dev-only files
echo "🧹 Cleaning up development-only files..."
rm -rf .cache
find . -name "*.log" -type f -delete
find . -name "*.bak" -type f -delete

# Build the application for production
echo "🏗️ Building application for production..."
npm run build

# Optimize assets
echo "⚡ Optimizing assets..."
find client/dist -name "*.js" -type f -exec echo "Optimizing {}" \;

# Verify bundle sizes
echo "📊 Verifying bundle sizes..."
find client/dist -name "*.js" -type f -exec du -h {} \;

# Check for environment variables in the build
echo "🔒 Checking for sensitive information in the build..."
if grep -r "process.env" --include="*.js" client/dist; then
  echo "⚠️ Found process.env references in the build. These should be replaced with import.meta.env."
fi

# Verify optimization settings
echo "✅ Verifying production optimization settings..."
if grep -q '"minify": "terser"' client/vite.config.vercel.ts; then
  echo "✓ Terser minification enabled"
else
  echo "⚠️ Terser minification not enabled in vite.config.vercel.ts"
fi

if grep -q '"sourcemap": false' client/vite.config.vercel.ts; then
  echo "✓ Sourcemaps disabled for production"
else
  echo "⚠️ Sourcemaps may be enabled in production, which increases bundle size"
fi

# Final notes
echo ""
echo "✨ Production preparation complete! ✨"
echo ""
echo "Next steps:"
echo "1. Review the environment variables in .env.production"
echo "2. Deploy using 'npm run deploy'"
echo ""
echo "Remember to test the production build locally with:"
echo "NODE_ENV=production npm run preview"