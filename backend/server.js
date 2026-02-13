import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import channelRoutes from './routes/channels.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/videos', commentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'YouTube Clone API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
