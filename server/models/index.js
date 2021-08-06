const mongoose = require('mongoose');
require('dotenv').config();

if(process.env.NODE_ENV === 'test') {
  mongoose.connect(process.env.DB_CONNECT_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  }).then(() => {
    console.log('Test database is connected!📍')
  })
  .catch((e) => console.log(e));
} else {
  mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  }).then(() => {
    console.log('Prod database is connected!📍')
  })
  .catch((e) => console.log(e));
}

module.exports = mongoose;

