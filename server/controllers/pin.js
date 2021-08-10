const Pin = require('../models/pin');

exports.addPin = async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (e) {
    res.status(500).json(e)
  }
};

exports.getPin = async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (e) {
    res.status(500).json(e)
  }
};

exports.removePin = async (req, res) => {
  try {
    await Pin.deleteOne({_id: req.body._id})
    res.send().status(204)
  } catch (e) {
    res.status(500).json(e)
  }
}
