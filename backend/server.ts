import express from 'express';
import cors from 'cors';
import steganoRoutes from './routes/steganoRoutes';
import path from 'path';
import fs from 'fs';

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors({
        origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
        methods: "GET,POST,PUT,DELETE,PATCH,OPTION",
        credentials: true,
    }
));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api/stegano', steganoRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
