#!/bin/bash

echo "🚀 Starting deployment process for The Rustic Table website..."

# Check if we're in the correct directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the project root directory."
    exit 1
fi

echo "📝 Checking project files..."

# Required files check
required_files=("index.html" "menu.html" "reservations.html" "about.html" "css/styles.css" "js/main.js")

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - Found"
    else
        echo "❌ $file - Missing"
        exit 1
    fi
done

echo ""
echo "🔧 Running pre-deployment checks..."

# Check if npm is available and install dependencies
if command -v npm &> /dev/null; then
    echo "📦 Installing dependencies..."
    npm install --silent
    echo "✅ Dependencies installed"
else
    echo "⚠️  npm not found. Skipping dependency installation."
fi

# Optional: Run a simple HTTP server for testing
echo ""
echo "🌐 Starting local server for testing..."
echo "📍 Your website will be available at: http://localhost:8080"
echo ""
echo "🔄 Choose deployment option:"
echo "1. Test locally (recommended first)"
echo "2. Deploy to GitHub Pages"
echo "3. Deploy to Netlify"
echo "4. Export for manual hosting"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🚀 Starting local development server..."
        if command -v npx &> /dev/null; then
            npx http-server . -p 8080 -o
        else
            echo "ℹ️  npx not available. Please open index.html in your browser."
            if command -v python3 &> /dev/null; then
                echo "🐍 Starting Python server..."
                python3 -m http.server 8080
            elif command -v python &> /dev/null; then
                echo "🐍 Starting Python server..."
                python -m SimpleHTTPServer 8080
            fi
        fi
        ;;
    2)
        echo "📚 GitHub Pages deployment instructions:"
        echo "1. Push your code to a GitHub repository"
        echo "2. Go to Settings > Pages in your repository"
        echo "3. Select 'Deploy from a branch'"
        echo "4. Choose 'main' branch and '/ (root)' folder"
        echo "5. Your site will be available at: https://yourusername.github.io/the-rustic-table/"
        ;;
    3)
        echo "🌐 Netlify deployment instructions:"
        echo "1. Visit https://netlify.com and create an account"
        echo "2. Drag and drop your project folder to Netlify"
        echo "3. Or connect your GitHub repository for automatic deployments"
        echo "4. Your site will get a custom URL like: https://amazing-name-123456.netlify.app"
        ;;
    4)
        echo "📁 Creating deployment package..."
        
        # Create a zip file with all necessary files
        if command -v zip &> /dev/null; then
            zip -r "the-rustic-table-$(date +%Y%m%d).zip" . -x "node_modules/*" ".git/*" "*.zip" "deploy.sh"
            echo "✅ Deployment package created: the-rustic-table-$(date +%Y%m%d).zip"
            echo "📤 Upload this zip file to your web hosting service"
        else
            echo "📁 Manual export: Copy these files to your web server:"
            echo "   - index.html"
            echo "   - menu.html" 
            echo "   - reservations.html"
            echo "   - about.html"
            echo "   - 404.html"
            echo "   - css/ folder"
            echo "   - js/ folder"
            echo "   - assets/ folder (if you have local images)"
        fi
        ;;
    *)
        echo "❌ Invalid option selected"
        exit 1
        ;;
esac

echo ""
echo "✨ Deployment process completed!"
echo ""
echo "📋 Post-deployment checklist:"
echo "   ☐ Test all pages load correctly"
echo "   ☐ Test form submissions"
echo "   ☐ Test responsive design on mobile"
echo "   ☐ Check all links work properly"
echo "   ☐ Verify contact information is correct"
echo "   ☐ Test reservation form functionality"
echo ""
echo "🍽️  Your restaurant website is ready to serve customers!"
