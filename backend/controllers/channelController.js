import Channel from '../models/Channel.js';
import User from '../models/User.js';

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    const channelExists = await Channel.findOne({ channelName });
    if (channelExists) {
      return res.status(400).json({ message: 'Channel name already exists' });
    }

    const channel = await Channel.create({
      channelName,
      description,
      channelBanner,
      owner: req.user._id
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { channels: channel._id }
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate('owner', 'username avatar')
      .populate('videos');
    
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.json(channel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ owner: req.user._id });
    res.json(channels);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedChannel = await Channel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedChannel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
