# YouTube Clone - MERN Stack

A full-stack YouTube clone application built with MongoDB, Express.js, React, and Node.js (MERN stack).

## Features

### Frontend (React)
- **Home Page**: Video grid with thumbnails, header, sidebar, and filter buttons
- **User Authentication**: Register and login with JWT authentication
- **Search & Filter**: Search videos by title and filter by category
- **Video Player**: Watch videos with like/dislike functionality and comments
- **Channel Management**: Create channels and manage videos (CRUD operations)
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop

### Backend (Node.js & Express)
- **RESTful API**: Well-structured API endpoints
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Database**: Store users, channels, videos, and comments
- **Protected Routes**: Middleware for authentication
- **CRUD Operations**: Full create, read, update, delete functionality

## Technologies Used

- **Frontend**: React, React Router, Axios, CSS3
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Tools**: Vite, ES Modules

## Project Structure

```
CapstoneProject/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── channelController.js
│   │   ├── videoController.js
│   │   └── commentController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Channel.js
│   │   └── Video.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── channels.js
│   │   ├── videos.js
│   │   └── comments.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── VideoCard.jsx
│   │   └── FilterButtons.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Auth.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── Channel.jsx
│   │   ├── CreateChannel.jsx
│   │   └── MyChannels.jsx
│   ├── styles/
│   │   ├── Header.css
│   │   ├── Sidebar.css
│   │   ├── VideoCard.css
│   │   ├── FilterButtons.css
│   │   ├── Home.css
│   │   ├── Auth.css
│   │   ├── VideoPlayer.css
│   │   ├── Channel.css
│   │   ├── CreateChannel.css
│   │   └── MyChannels.css
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

4. Start MongoDB (if using local):
```bash
mongod
```

5. Seed the database with sample data:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to project root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Channels
- `POST /api/channels` - Create channel (protected)
- `GET /api/channels/:id` - Get channel by ID
- `GET /api/channels/my-channels` - Get user's channels (protected)
- `PUT /api/channels/:id` - Update channel (protected)

### Videos
- `POST /api/videos` - Create video (protected)
- `GET /api/videos` - Get all videos (with search & filter)
- `GET /api/videos/:id` - Get video by ID
- `PUT /api/videos/:id` - Update video (protected)
- `DELETE /api/videos/:id` - Delete video (protected)
- `POST /api/videos/:id/like` - Like video (protected)
- `POST /api/videos/:id/dislike` - Dislike video (protected)

### Comments
- `POST /api/videos/:videoId/comments` - Add comment (protected)
- `PUT /api/videos/:videoId/comments/:commentId` - Update comment (protected)
- `DELETE /api/videos/:videoId/comments/:commentId` - Delete comment (protected)

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Videos**: View videos on the home page, use filters and search
3. **Watch Videos**: Click on any video to watch and interact (like/dislike/comment)
4. **Create Channel**: After login, create your own channel
5. **Upload Videos**: Add videos to your channel with title, description, and category
6. **Manage Content**: Edit or delete your videos from the channel page

## Sample Credentials

After seeding the database:
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`

## Features Implemented

✅ User registration with validation
✅ JWT-based authentication
✅ Search videos by title
✅ Filter videos by category (6+ categories)
✅ Video player with like/dislike functionality
✅ Full CRUD operations for comments
✅ Full CRUD operations for videos
✅ Channel creation and management
✅ Responsive design for all devices
✅ Protected routes and authorization
✅ Clean code structure with ES Modules

## Contributing

This is a capstone project. For educational purposes only.

## License

MIT License
