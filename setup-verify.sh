#!/bin/bash

echo "=========================================="
echo "YouTube Clone - Setup Verification"
echo "=========================================="
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js installed: $(node -v)"
else
    echo "❌ Node.js not found. Please install Node.js"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm installed: $(npm -v)"
else
    echo "❌ npm not found"
    exit 1
fi

# Check MongoDB
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB installed"
else
    echo "⚠️  MongoDB not found locally. You can use MongoDB Atlas instead"
fi

echo ""
echo "=========================================="
echo "Setup Instructions"
echo "=========================================="
echo ""
echo "1. Start MongoDB (if using local):"
echo "   mongod"
echo ""
echo "2. Seed the database:"
echo "   cd backend"
echo "   npm run seed"
echo ""
echo "3. Start Backend (Terminal 1):"
echo "   cd backend"
echo "   npm run dev"
echo "   (Runs on http://localhost:5000)"
echo ""
echo "4. Start Frontend (Terminal 2):"
echo "   npm run dev"
echo "   (Runs on http://localhost:5173)"
echo ""
echo "=========================================="
echo "Test Credentials"
echo "=========================================="
echo "Email: john@example.com"
echo "Password: password123"
echo ""
echo "Email: jane@example.com"
echo "Password: password123"
echo ""
echo "=========================================="
echo "Features to Test"
echo "=========================================="
echo "✅ Browse videos on home page"
echo "✅ Search videos by title"
echo "✅ Filter by category (7 categories)"
echo "✅ Register new user"
echo "✅ Login with credentials"
echo "✅ Watch video"
echo "✅ Like/Dislike video"
echo "✅ Add/Edit/Delete comments"
echo "✅ Create channel"
echo "✅ Add/Edit/Delete videos"
echo "✅ Responsive design (mobile/tablet/desktop)"
echo ""
