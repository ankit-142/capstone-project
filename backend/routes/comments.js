import express from 'express';
import { addComment, updateComment, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/:videoId/comments', protect, addComment);
router.put('/:videoId/comments/:commentId', protect, updateComment);
router.delete('/:videoId/comments/:commentId', protect, deleteComment);

export default router;
