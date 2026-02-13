import express from 'express';
import { createVideo, getAllVideos, getVideo, updateVideo, deleteVideo, likeVideo, dislikeVideo } from '../controllers/videoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createVideo);
router.get('/', getAllVideos);
router.get('/:id', getVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);
router.post('/:id/like', protect, likeVideo);
router.post('/:id/dislike', protect, dislikeVideo);

export default router;
