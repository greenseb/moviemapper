const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const Pin = require('../models/pin');
const mongoose = require('mongoose');
require('dotenv').config();

describe('Pins testing', () => {
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
    await Pin.deleteMany();
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should create a pin', async () => {

    const pin = {
      username: "Frank",
      title: "St.John, Bla bla",
      description: "YAYYYYYYYY",
      rating: "4",
      latitude: "20.6919",
      longitude: "-72.8804"
  }

    const res = await request.post('/routes/pins/').send(pin)
    const getPin = await Pin.findOne({title: "St.John, Bla bla"})
    expect(getPin.title).toBe(pin.title)
  })

  it('should get all pin', async () => {

    const pin = {
      username: "Frank",
      title: "St.John, Bla bla",
      description: "YAYYYYYYYY",
      rating: "4",
      latitude: "20.6919",
      longitude: "-72.8804"
    }

    const res = await request.post('/routes/pins/').send(pin)
    const getPin = await Pin.find()
    expect(getPin.title).toBe(res.title)
  })
})