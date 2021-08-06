const router = require('express').Router();

const { userRegister, getRegisteredUser, userLogin } = require('./controllers/users');
const { addPin, getPin } = require('./controllers/pin');

router.get('/routes/pins', getPin);
router.post('/routes/pins', addPin);

router.get('/routes/users/register', getRegisteredUser);
router.post('/routes/users/register', userRegister);
router.post('/routes/users/login', userLogin);

module.exports = router;