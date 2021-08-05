const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const pinRoute = require('./routes/pin');
const userRoute = require('./routes/users');
require('dotenv').config();
const PORT = 3001;
const DB_URL = 'mongodb://localhost:27017/';
const DB_NAME = 'moviemapper';
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(`${DB_URL}${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database is connected!📍');
  })
  .catch((e) => console.log(e));

app.use('/routes/pins', pinRoute);
app.use('/routes/users', userRoute);

app.listen(PORT, (e) => {
  if (e) console.log(e);
  console.log(`Server is running on http://localhost:${PORT}!!🚀`);
});
