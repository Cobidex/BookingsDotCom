const express = require('express');
const userRoutes = require('./routes/userRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cityRoutes = require('./routes/cityRoutes');



const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/accommodations', accommodationRoutes);
app.use('/booking', bookingRoutes);
app.use('/cities', cityRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
