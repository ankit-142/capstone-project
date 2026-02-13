import Video from '../models/Video.js';

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const video = await Video.findById(req.params.videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const comment = {
      userId: req.user._id,
      text,
      timestamp: new Date()
    };

    video.comments.push(comment);
    await video.save();

    const populatedVideo = await Video.findById(req.params.videoId)
      .populate('comments.userId', 'username avatar');

    res.status(201).json(populatedVideo.comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const video = await Video.findById(req.params.videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const comment = video.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    comment.text = text;
    await video.save();

    const populatedVideo = await Video.findById(req.params.videoId)
      .populate('comments.userId', 'username avatar');

    res.json(populatedVideo.comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const comment = video.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    comment.deleteOne();
    await video.save();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
