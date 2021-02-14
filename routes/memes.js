import express from 'express';

import { getMemes, getMeme, createMeme, updateMeme, likeMeme, deleteMeme } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getMemes);
router.post('/', createMeme);
router.get('/:id', getMeme);
router.patch('/:id', updateMeme);
router.delete('/:id', deleteMeme);
router.patch('/:id/likeMeme', likeMeme);

export default router;