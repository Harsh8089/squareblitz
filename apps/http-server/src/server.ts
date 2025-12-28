import gameRouter from './routes/game.route.js';
import userRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRouter);
app.use('/api/game', gameRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server activated on port ${PORT}`);
});
