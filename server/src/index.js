import 'dotenv/config'; // ESM-способ загрузки .env (вместо require('dotenv').config())
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { getModels } from './routes/models.js';
import { initCurrencyRate, getRate, topUpBalance } from './constants/constants.js';

await initCurrencyRate();

topUpBalance('cmmgl9c6600006scric69x1ed', 1)

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: { error: 'Слишком много попыток, попробуйте позже' },
});

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.use(cookieParser());

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/chats', authLimiter, chatRoutes);

app.get("/api/models", authLimiter, getModels);

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

console.log(getRate())