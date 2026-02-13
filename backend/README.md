# YouTube Clone Backend

Backend API for YouTube Clone application built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

3. Seed database:
```bash
npm run seed
```

4. Start server:
```bash
npm run dev
```

## API Documentation

### Base URL
`http://localhost:5000/api`

### Authentication Endpoints

#### Register User
- **POST** `/auth/register`
- Body: `{ username, email, password }`
- Returns: User object with JWT token

#### Login User
- **POST** `/auth/login`
- Body: `{ email, password }`
- Returns: User object with JWT token

#### Get Current User
- **GET** `/auth/me`
- Headers: `Authorization: Bearer <token>`
- Returns: Current user object

### Channel Endpoints

#### Create Channel
- **POST** `/channels`
- Headers: `Authorization: Bearer <token>`
- Body: `{ channelName, description, channelBanner }`

#### Get Channel
- **GET** `/channels/:id`
- Returns: Channel with videos

#### Get User Channels
- **GET** `/channels/my-channels`
- Headers: `Authorization: Bearer <token>`

#### Update Channel
- **PUT** `/channels/:id`
- Headers: `Authorization: Bearer <token>`
- Body: Channel fields to update

### Video Endpoints

#### Create Video
- **POST** `/videos`
- Headers: `Authorization: Bearer <token>`
- Body: `{ title, description, thumbnailUrl, videoUrl, category, channelId }`

#### Get All Videos
- **GET** `/videos?search=<query>&category=<category>`
- Query params: search, category

#### Get Video
- **GET** `/videos/:id`
- Returns: Video with comments

#### Update Video
- **PUT** `/videos/:id`
- Headers: `Authorization: Bearer <token>`

#### Delete Video
- **DELETE** `/videos/:id`
- Headers: `Authorization: Bearer <token>`

#### Like Video
- **POST** `/videos/:id/like`
- Headers: `Authorization: Bearer <token>`

#### Dislike Video
- **POST** `/videos/:id/dislike`
- Headers: `Authorization: Bearer <token>`

### Comment Endpoints

#### Add Comment
- **POST** `/videos/:videoId/comments`
- Headers: `Authorization: Bearer <token>`
- Body: `{ text }`

#### Update Comment
- **PUT** `/videos/:videoId/comments/:commentId`
- Headers: `Authorization: Bearer <token>`
- Body: `{ text }`

#### Delete Comment
- **DELETE** `/videos/:videoId/comments/:commentId`
- Headers: `Authorization: Bearer <token>`

## Database Models

### User
- username (unique)
- email (unique)
- password (hashed)
- avatar
- channels (array of channel IDs)

### Channel
- channelName (unique)
- owner (user ID)
- description
- channelBanner
- subscribers
- videos (array of video IDs)

### Video
- title
- thumbnailUrl
- videoUrl
- description
- channelId
- uploader (user ID)
- category
- views
- likes
- dislikes
- likedBy (array of user IDs)
- dislikedBy (array of user IDs)
- comments (embedded documents)

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled
- ES Modules
