import express from 'express';
import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/task.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import path from 'path';

dotenv.config();


const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend','dist', 'index.html'));
    });
};

app.listen(PORT, () => {
    console.log('Server is running on port 5001');
    connectDB();
});