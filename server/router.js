const router = require('express').Router();

const { userRegister, getRegisteredUsers, userLogin } = require('./controllers/users');
const { addPin, getPin } = require('./controllers/pin');

router.get('/routes/pins', getPin);
router.post('/routes/pins', addPin);

router.get('/routes/users/register', getRegisteredUsers);
router.post('/routes/users/register', userRegister);
router.post('/routes/users/login', userLogin);

module.exports = router;