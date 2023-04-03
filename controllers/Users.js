const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
    const userToken = jwt.sign(payload, JWT_SECRET);
    const options = { httpOnly: true, expires: new Date(Date.now() + 9000000) };
    console.log('JWT TOKEN', userToken);
    res.status(201).cookie('userToken', userToken, options).json({success: true, user: payload });
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
};
async function isEmailValid(email) {
  return emailValidator.validate(email)
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDocument = await User.findOne({ email });
    
    if (!userDocument) 
      return res.json({
        success: false,
        message: 'email / password does not match!',
      });

    const isPasswordValid = await bcrypt.compare(password, userDocument.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Password' });
    }
    const payload = {
      _id: userDocument._id,
      name: userDocument.name,
      email: userDocument.email,
    };
    const userToken = jwt.sign(payload, JWT_SECRET);
    const options = { httpOnly: true, expires: new Date(Date.now() + 9000000) };
    console.log('JWT TOKEN', userToken);
    res.cookie('userToken', userToken, options).json({ success: true, user: payload });
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
};



const logout = (req, res) => {
  res.clearCookie('userToken');
  res.json({ message: 'You have Successfully Logged Out!' });
};
const getLoggedInUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.user._id }).select('-password');
    res.json(currentUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
};
