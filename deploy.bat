@echo off
echo 🚀 Starting deployment process for The Rustic Table website...

REM Check if we're in the correct directory
if not exist "index.html" (
    echo ❌ Error: index.html not found. Please run this script from the project root directory.
    pause
    exit /b 1
)

echo 📝 Checking project files...

REM Check for required files
set "files_missing=0"
if not exist "index.html" (
    echo ❌ index.html - Missing
    set "files_missing=1"
) else (
    echo ✅ index.html - Found
)

if not exist "menu.html" (
    echo ❌ menu.html - Missing  
    set "files_missing=1"
) else (
    echo ✅ menu.html - Found
)

if not exist "reservations.html" (
    echo ❌ reservations.html - Missing
    set "files_missing=1"
) else (
    echo ✅ reservations.html - Found
)

if not exist "about.html" (
    echo ❌ about.html - Missing
    set "files_missing=1"
) else (
    echo ✅ about.html - Found
)

if not exist "css\styles.css" (
    echo ❌ css\styles.css - Missing
    set "files_missing=1"
) else (
    echo ✅ css\styles.css - Found
)

if not exist "js\main.js" (
    echo ❌ js\main.js - Missing
    set "files_missing=1"
) else (
    echo ✅ js\main.js - Found
)

if "%files_missing%"=="1" (
    echo ❌ Some required files are missing!
    pause
    exit /b 1
)

echo.
echo 🔧 Running pre-deployment checks...

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel%==0 (
    echo 📦 Installing dependencies...
    npm install --silent
    echo ✅ Dependencies installed
) else (
    echo ⚠️  npm not found. Skipping dependency installation.
)

echo.
echo 🌐 Starting local server for testing...
echo 📍 Your website will be available at: http://localhost:8080
echo.
echo 🔄 Choose deployment option:
echo 1. Test locally (recommended first)
echo 2. Deploy to GitHub Pages
echo 3. Deploy to Netlify  
echo 4. Export for manual hosting
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo 🚀 Starting local development server...
    REM Try npx first
    npx --version >nul 2>&1
    if %errorlevel%==0 (
        npx http-server . -p 8080 -o
    ) else (
        echo ℹ️  npx not available. Please open index.html in your browser.
        REM Try Python
        python --version >nul 2>&1
        if %errorlevel%==0 (
            echo 🐍 Starting Python server...
            python -m http.server 8080
        ) else (
            echo 📁 Opening index.html in default browser...
            start index.html
        )
    )
) else if "%choice%"=="2" (
    echo 📚 GitHub Pages deployment instructions:
    echo 1. Push your code to a GitHub repository
    echo 2. Go to Settings ^> Pages in your repository
    echo 3. Select 'Deploy from a branch'
    echo 4. Choose 'main' branch and '/ ^(root^)' folder
    echo 5. Your site will be available at: https://yourusername.github.io/the-rustic-table/
) else if "%choice%"=="3" (
    echo 🌐 Netlify deployment instructions:
    echo 1. Visit https://netlify.com and create an account
    echo 2. Drag and drop your project folder to Netlify
    echo 3. Or connect your GitHub repository for automatic deployments
    echo 4. Your site will get a custom URL like: https://amazing-name-123456.netlify.app
) else if "%choice%"=="4" (
    echo 📁 Creating deployment package...
    
    REM Get current date for filename
    for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
    set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
    set "datestamp=%YYYY%%MM%%DD%"
    
    echo 📁 Manual export: Copy these files to your web server:
    echo    - index.html
    echo    - menu.html
    echo    - reservations.html  
    echo    - about.html
    echo    - 404.html
    echo    - css\ folder
    echo    - js\ folder
    echo    - assets\ folder ^(if you have local images^)
) else (
    echo ❌ Invalid option selected
    pause
    exit /b 1
)

echo.
echo ✨ Deployment process completed!
echo.
echo 📋 Post-deployment checklist:
echo    ☐ Test all pages load correctly
echo    ☐ Test form submissions
echo    ☐ Test responsive design on mobile
echo    ☐ Check all links work properly
echo    ☐ Verify contact information is correct
echo    ☐ Test reservation form functionality
echo.
echo 🍽️  Your restaurant website is ready to serve customers!
pause
