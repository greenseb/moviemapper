const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const User = require('../models/user');
const mongoose = require('mongoose');
require('dotenv').config();

describe('Users testing', () => {
  const app = express();
  app.use(express.json())
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = process.env.DB_CONNECT_TEST
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  beforeEach(async () => {
    await jest.setTimeout(60000);
  });

  afterEach(async () => {
    await User.deleteMany();
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should register users', async () => {

    const user = {
      username: "David",
      email: "david@david.me",
      password: "david"
    }

    const res = await request.post('/routes/users/register', ).send(user)
    const getUser = await User.findOne({username: "David"})
    expect(getUser.username).toBe(user.username)
  })

  it('should login users', async () => {

    const user = {
      username: "David",
      email: "david@david.me",
      password: "david"
    }

    const reg = await request.post('/routes/users/register', ).send(user)
    const res = await request.post('/routes/users/login', ).send(user)
    expect(reg.username).toBe(res.username)
  })
})