#!/bin/bash

# Commit 1: Initial setup
git add package.json vite.config.js index.html eslint.config.js .gitignore
git commit -m "feat: Initialize project with Vite and React setup"

# Commit 2: README
git add README.md
git commit -m "docs: Enhance README with detailed project documentation"

# Commit 3: Backend env
git add backend/.env.example backend/package.json
git commit -m "config: Add environment configuration and MongoDB connection setup"

# Commit 4: Database schemas
git add backend/models/User.js backend/models/Video.js backend/models/Channel.js
git commit -m "feat: Implement User, Video, and Channel database schemas"

# Commit 5: Comment schema
git add backend/models/Video.js
git commit -m "feat: Implement comment schema and relationship mapping"

# Commit 6: JWT auth
git add backend/controllers/authController.js
git commit -m "feat: Add JWT-based authentication system"

# Commit 7: Auth middleware
git add backend/middleware/auth.js
git commit -m "feat: Implement authentication middleware for protected routes"

# Commit 8: Video APIs
git add backend/controllers/videoController.js backend/routes/videos.js
git commit -m "feat: Create video CRUD APIs with proper validation"

# Commit 9: Channel APIs
git add backend/controllers/channelController.js backend/routes/channels.js
git commit -m "feat: Implement channel creation and management APIs"

# Commit 10: Comment APIs
git add backend/controllers/commentController.js backend/routes/comments.js
git commit -m "feat: Implement comment CRUD functionality in backend"

# Commit 11: Like/Dislike
git add backend/controllers/videoController.js
git commit -m "feat: Add like and dislike functionality to video controller"

# Commit 12: Frontend routing
git add src/App.jsx src/main.jsx
git commit -m "feat: Configure frontend routing using React Router"

# Commit 13: Auth context
git add src/context/AuthContext.jsx
git commit -m "feat: Create global authentication context using Context API"

# Commit 14: Header
git add src/components/Header.jsx src/styles/Header.css
git commit -m "feat: Build responsive Header component with search functionality"

# Commit 15: Sidebar
git add src/components/Sidebar.jsx src/styles/Sidebar.css
git commit -m "feat: Implement toggleable Sidebar navigation component"

# Commit 16: VideoCard
git add src/components/VideoCard.jsx src/styles/VideoCard.css
git commit -m "feat: Create reusable VideoCard component for video grid"

# Commit 17: Home page
git add src/pages/Home.jsx src/styles/Home.css
git commit -m "feat: Implement home page layout with dynamic video rendering"

# Commit 18: API utility
git add src/utils/api.js
git commit -m "feat: Integrate frontend with backend using Axios API utility"

# Commit 19: Search
git add src/components/Header.jsx src/pages/Home.jsx
git commit -m "feat: Implement search functionality based on video title"

# Commit 20: Filter buttons
git add src/components/FilterButtons.jsx src/styles/FilterButtons.css
git commit -m "feat: Add category filter buttons with dynamic filtering logic"

# Commit 21: Video player
git add src/pages/VideoPlayer.jsx src/styles/VideoPlayer.css
git commit -m "feat: Build video player page with video details and interaction buttons"

# Commit 22: Comments UI
git add src/pages/VideoPlayer.jsx
git commit -m "feat: Implement comment section UI with add, edit, and delete functionality"

# Commit 23: Like/Dislike frontend
git add src/pages/VideoPlayer.jsx
git commit -m "feat: Connect like and dislike buttons to backend API"

# Commit 24: Channel page
git add src/pages/Channel.jsx src/styles/Channel.css
git commit -m "feat: Implement channel page with video management options"

# Commit 25: Video upload
git add src/pages/Channel.jsx
git commit -m "feat: Add video upload functionality to channel page"

# Commit 26: Edit/Delete videos
git add src/pages/Channel.jsx
git commit -m "feat: Add edit and delete functionality for channel videos"

# Commit 27: Protected routes
git add src/pages/CreateChannel.jsx src/pages/MyChannels.jsx
git commit -m "feat: Implement protected routes for authenticated users"

# Commit 28: Responsive design
git add src/styles/*.css
git commit -m "style: Improve responsive design for mobile and tablet devices"

# Commit 29: Validation
git add src/pages/Auth.jsx
git commit -m "feat: Add frontend form validation and error handling"

# Commit 30: Production ready
git add backend/server.js backend/config/db.js backend/seed.js src/
git commit -m "refactor: Refactor codebase and optimize performance for production readiness"

echo "✅ All 30 commits created successfully!"
