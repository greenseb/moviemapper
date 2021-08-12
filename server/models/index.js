const mongoose = require('mongoose');
require('dotenv').config();

function connectDb (url) {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  }).then(() => {
    console.log('Database is connected!📍')
  })
  .catch((e) => console.log(e));
}

if(process.env.NODE_ENV === 'test') {
  connectDb(process.env.DB_CONNECT_TEST)
  console.log(`Connected to test db`)
} else {
  connectDb(process.env.DB_CONNECT)
  console.log(`Connected to prod db`)
}

module.exports = mongoose;

