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
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/accommodations', accommodationRoutes);
app.use('/booking', bookingRoutes);
app.use('/cities', cityRoutes);
app.use('/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
