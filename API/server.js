import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dataRoutes from './routes/data.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/data', dataRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => console.log('🚀 Server running on port 5000'));
}).catch(err => console.error('MongoDB Error:', err));
