// const express = require('express');
// const router = require('../router');
const supertest = require('supertest');
const User = require('../models/user');
// const mongoose = require('mongoose');

// added comment
describe('Users tests', () => {
  // const app = express();
  // app.use(express.json())
  // app.use(router);
  const request = supertest(app);

  // beforeAll(async () => {
  //   const url = process.env.DB_CONNECT_TEST
  //   await mongoose.connect(url, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   })
  // })

  afterEach(async() => {
    await User.deleteMany();
  })

  it('should register users', async (done) => {
    
    const user = {
      username: "David",
      email: "david@david.me",
      password: "david"
    }

    const res = await request.post('/routes/users/register', ).send({user})

    const username = await User.findOne({user})
    expect(username).toBe(user.username)
    done()
  })

})