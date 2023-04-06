const express = require('express');
const router = express.Router();
const { register, login, logout, getLoggedInUser ,getHistoryUser,updateUserHistory  } = require('../controllers/Users');
const authenticate = require('../middlewares/auth');
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/loggedin-user', authenticate, getLoggedInUser);
//router.get('/history',  authenticate, getHistoryUser)
router.put('/:id/history',  authenticate, updateUserHistory);

module.exports = router;