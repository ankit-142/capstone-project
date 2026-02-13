import express from 'express';
import { createChannel, getChannel, getUserChannels, updateChannel } from '../controllers/channelController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createChannel);
router.get('/my-channels', protect, getUserChannels);
router.get('/:id', getChannel);
router.put('/:id', protect, updateChannel);

export default router;
