const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const User = require('../models/user');
const mongoose = require('mongoose');


describe('Users tests', () => {
  const app = express();
  app.use(express.json())
  app.use(router);
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

  it('should get all registered users', async (done) => {

    const res = await request.get()

    done()
  })

})