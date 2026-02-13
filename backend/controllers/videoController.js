import Video from '../models/Video.js';
import Channel from '../models/Channel.js';

export const createVideo = async (req, res) => {
  try {
    const video = await Video.create({
      ...req.body,
      uploader: req.user._id
    });

    await Channel.findByIdAndUpdate(req.body.channelId, {
      $push: { videos: video._id }
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const videos = await Video.find(query)
      .populate('channelId', 'channelName')
      .populate('uploader', 'username')
      .sort({ uploadDate: -1 });

    res.json(videos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('channelId', 'channelName channelBanner subscribers')
      .populate('uploader', 'username avatar')
      .populate('comments.userId', 'username avatar');

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.views += 1;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Channel.findByIdAndUpdate(video.channelId, {
      $pull: { videos: video._id }
    });

    await Video.findByIdAndDelete(req.params.id);

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const alreadyLiked = video.likedBy.includes(req.user._id);
    const alreadyDisliked = video.dislikedBy.includes(req.user._id);

    if (alreadyLiked) {
      video.likes -= 1;
      video.likedBy = video.likedBy.filter(id => id.toString() !== req.user._id.toString());
    } else {
      video.likes += 1;
      video.likedBy.push(req.user._id);
      
      if (alreadyDisliked) {
        video.dislikes -= 1;
        video.dislikedBy = video.dislikedBy.filter(id => id.toString() !== req.user._id.toString());
      }
    }

    await video.save();
    res.json({ likes: video.likes, dislikes: video.dislikes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const alreadyDisliked = video.dislikedBy.includes(req.user._id);
    const alreadyLiked = video.likedBy.includes(req.user._id);

    if (alreadyDisliked) {
      video.dislikes -= 1;
      video.dislikedBy = video.dislikedBy.filter(id => id.toString() !== req.user._id.toString());
    } else {
      video.dislikes += 1;
      video.dislikedBy.push(req.user._id);
      
      if (alreadyLiked) {
        video.likes -= 1;
        video.likedBy = video.likedBy.filter(id => id.toString() !== req.user._id.toString());
      }
    }

    await video.save();
    res.json({ likes: video.likes, dislikes: video.dislikes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
