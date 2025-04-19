import express from 'express';
import multer from 'multer';
import { encodeMessage, decodeMessage } from '../controllers/steganoController';

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage });
const upload = multer({ storage: multer.memoryStorage() });
router.post('/encode', upload.single('image'), encodeMessage);
router.post('/decode', upload.single('image'), decodeMessage);

export default router;
