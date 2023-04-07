const express = require('express');
const router = express.Router();
const { register, login, logout, getLoggedInUser ,updateUser, deleteHistory  } = require('../controllers/Users');
const authenticate = require('../middlewares/auth');
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/loggedin-user', authenticate, getLoggedInUser);
//router.get('/history',  authenticate, getHistoryUser)
//router.put('/:id/history',  authenticate, updateUserHistory);
router.delete("/:id/history/:productId", authenticate, deleteHistory);
router.put('/:id', authenticate, updateUser);
module.exports = router;