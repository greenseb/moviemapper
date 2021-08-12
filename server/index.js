const express = require('express');
const cors = require('cors');
const router = require('./router');
require('dotenv').config();

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(router)

app.listen(PORT, (e) => {
  if (e) console.log(e);
  console.log(`Server is running on http://localhost:${PORT}!!🚀`)
})

