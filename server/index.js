const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
require('dotenv').config();
const PORT = 3001;
const DB_CONNECT = process.env.DB_CONNECT;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(`${DB_CONNECT}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database is connected!📍')
  })
  .catch((e) => console.log(e));

app.use(router)

app.listen(PORT, (e) => {
  if (e) console.log(e);
  console.log(`Server is running on http://localhost:${PORT}!!🚀`)
})

