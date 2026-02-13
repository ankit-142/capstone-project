# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB installed (or MongoDB Atlas account)

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ..
npm install
```

### 3. Setup Environment Variables
Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
```

### 4. Start MongoDB
```bash
# If using local MongoDB
mongod
```

### 5. Seed Database
```bash
cd backend
npm run seed
```

### 6. Start Backend Server
```bash
# In backend directory
npm run dev
```
Backend runs on: http://localhost:5000

### 7. Start Frontend Server
```bash
# In root directory (new terminal)
npm run dev
```
Frontend runs on: http://localhost:5173

## Test Credentials

After seeding, use these credentials to login:

**User 1:**
- Email: john@example.com
- Password: password123

**User 2:**
- Email: jane@example.com
- Password: password123

## Testing Features

1. **Browse Videos**: Visit home page to see video grid
2. **Search**: Use search bar to find videos by title
3. **Filter**: Click category buttons to filter videos
4. **Register**: Create new account with username, email, password
5. **Login**: Sign in with credentials
6. **Watch Video**: Click any video to watch and interact
7. **Like/Dislike**: Click like/dislike buttons on video player
8. **Comment**: Add, edit, or delete comments
9. **Create Channel**: Click "Create Channel" in sidebar
10. **Manage Videos**: Add, edit, or delete videos from your channel

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file

### Port Already in Use
- Change PORT in backend/.env
- Update API baseURL in src/utils/api.js

### CORS Error
- Backend CORS is enabled for all origins
- Check if backend server is running

### Authentication Issues
- Clear localStorage in browser
- Re-login with valid credentials

## Project Structure

```
CapstoneProject/
├── backend/          # Node.js/Express backend
│   ├── config/       # Database configuration
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Auth middleware
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Entry point
├── src/              # React frontend
│   ├── components/   # Reusable components
│   ├── context/      # Context API
│   ├── pages/        # Page components
│   ├── styles/       # CSS files
│   └── utils/        # Utility functions
└── README.md         # Documentation
```

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user
- POST /api/channels - Create channel
- GET /api/channels/:id - Get channel
- POST /api/videos - Create video
- GET /api/videos - Get all videos
- GET /api/videos/:id - Get video
- PUT /api/videos/:id - Update video
- DELETE /api/videos/:id - Delete video
- POST /api/videos/:id/like - Like video
- POST /api/videos/:id/dislike - Dislike video
- POST /api/videos/:videoId/comments - Add comment
- PUT /api/videos/:videoId/comments/:commentId - Update comment
- DELETE /api/videos/:videoId/comments/:commentId - Delete comment

## Support

For issues or questions, refer to:
- README.md - Full documentation
- PROJECT_COMPLETION.md - Feature checklist
- backend/README.md - API documentation
