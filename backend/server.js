import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const port = process.env.PORT || 5000;

const host = process.env.BDC_HOST || 'localhost';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(port, host, () => {
  console.log(`Server listening on port ${port}`);
});
