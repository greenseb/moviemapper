const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const pinRoute = require('./routes/pin');
const userRoute = require('./routes/users');
require('dotenv').config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

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

app.listen(process.env.PORT, (e) => {
  if (e) console.log(e);
  console.log(`Server is running on http://localhost:${PORT}!!🚀`);
});
