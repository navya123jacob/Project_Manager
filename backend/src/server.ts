import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Framework/database/connection';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import AuthRoutes from './Framework/routes/AuthRoutes';
import projectRoutes from './Framework/routes/ProjectRoutes';
import todoRoutes from './Framework/routes/TodoRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url} `);
  next();
});

app.get('/', (req, res) => {
  res.send('Todo Manager API');
});

// Use routers
app.use('/api/auth', AuthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
