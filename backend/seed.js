import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Channel from './models/Channel.js';
import Video from './models/Video.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await User.deleteMany({});
    await Channel.deleteMany({});
    await Video.deleteMany({});

    const user1 = await User.create({
      username: 'JohnDoe',
      email: 'john@example.com',
      password: 'password123',
      avatar: 'https://i.pravatar.cc/150?img=1'
    });

    const user2 = await User.create({
      username: 'JaneSmith',
      email: 'jane@example.com',
      password: 'password123',
      avatar: 'https://i.pravatar.cc/150?img=2'
    });

    const channel1 = await Channel.create({
      channelName: 'Code with John',
      owner: user1._id,
      description: 'Coding tutorials and tech reviews by John Doe.',
      channelBanner: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=300&fit=crop',
      subscribers: 5200
    });

    const channel2 = await Channel.create({
      channelName: 'Jane Gaming',
      owner: user2._id,
      description: 'Gaming videos and live streams.',
      channelBanner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=300&fit=crop',
      subscribers: 3400
    });

    await User.findByIdAndUpdate(user1._id, { $push: { channels: channel1._id } });
    await User.findByIdAndUpdate(user2._id, { $push: { channels: channel2._id } });

    const videos = [
      {
        title: 'Learn React in 30 Minutes',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'A quick tutorial to get started with React.',
        channelId: channel1._id,
        uploader: user1._id,
        category: 'Education',
        views: 15200,
        likes: 1023,
        dislikes: 45,
        duration: 1800,
        uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'JavaScript ES6 Features',
        thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=225&fit=crop',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        description: 'Learn about modern JavaScript ES6 features.',
        channelId: channel1._id,
        uploader: user1._id,
        category: 'Technology',
        views: 8900,
        likes: 567,
        dislikes: 23,
        duration: 1260,
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Epic Gaming Moments',
        thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Best gaming moments compilation.',
        channelId: channel2._id,
        uploader: user2._id,
        category: 'Gaming',
        views: 25000,
        likes: 2100,
        dislikes: 89,
        duration: 900,
        uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Top 10 Music Hits 2024',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=225&fit=crop',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        description: 'The best music hits of 2024.',
        channelId: channel2._id,
        uploader: user2._id,
        category: 'Music',
        views: 45000,
        likes: 3500,
        dislikes: 120,
        duration: 2400,
        uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Football Highlights',
        thumbnailUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=225&fit=crop',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Best football moments this season.',
        channelId: channel1._id,
        uploader: user1._id,
        category: 'Sports',
        views: 12000,
        likes: 890,
        dislikes: 34,
        duration: 720,
        uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Comedy Sketches',
        thumbnailUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=225&fit=crop',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        description: 'Hilarious comedy sketches.',
        channelId: channel2._id,
        uploader: user2._id,
        category: 'Entertainment',
        views: 18000,
        likes: 1400,
        dislikes: 56,
        duration: 600,
        uploadDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      }
    ];

    const createdVideos = await Video.insertMany(videos);

    await Channel.findByIdAndUpdate(channel1._id, {
      $push: { videos: { $each: [createdVideos[0]._id, createdVideos[1]._id, createdVideos[4]._id] } }
    });

    await Channel.findByIdAndUpdate(channel2._id, {
      $push: { videos: { $each: [createdVideos[2]._id, createdVideos[3]._id, createdVideos[5]._id] } }
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
