import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/accommodations', accommodationRoutes);
app.use('/booking', bookingRoutes);
app.use('/cities', cityRoutes);
app.use('/reviews', reviewRoutes);

// Handle OPTIONS request
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
