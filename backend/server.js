const app = require('express');
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express;

app.use(cors());

const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'dist')));

app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
