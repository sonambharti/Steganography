import { Request, Response } from 'express';
import { encodeLSB, decodeLSB } from '../utils/steganoUtils';
import path from 'path';
import fs from 'fs';

const encodeMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const message = req.body.message;

    if (!file || !message) {
      res.status(400).json({ error: 'Missing image or message' });
      return;
    }

    const outputPath = path.join('uploads', 'encoded-' + file.filename);

    await encodeLSB(file.path, message, outputPath);

    res.json({ message: 'Image encoded successfully', downloadUrl: `/uploads/encoded-${file.filename}` });
  } catch (err) {
    res.status(500).json({ error: 'Encoding failed', detail: err instanceof Error ? err.message : String(err) });
  }
};

const decodeMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'Missing image file' });
      return;
    }

    const hiddenMessage = await decodeLSB(file.path);
    fs.unlinkSync(file.path); // Optional cleanup

    res.json({ message: hiddenMessage });
  } catch (err) {
    res.status(500).json({ error: 'Decoding failed', detail: err instanceof Error ? err.message : String(err) });
  }
};

export { encodeMessage, decodeMessage };
