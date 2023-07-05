const express = require('express');
const routes = require('./routes/index');
const accommodationRoutes = require('./routes/accommodationRoutes');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', routes);
app.use('/accommodations', accommodationRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
