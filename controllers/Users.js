const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const Product = require("../models/Product");
const { response } = require("express");

const register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
    const userToken = jwt.sign(payload, JWT_SECRET);
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 60480000000000),
    };
    console.log("JWT TOKEN", userToken);
    res
      .status(201)
      .cookie("userToken", userToken, options)
      .json({ success: true, user: payload });
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
};
async function isEmailValid(email) {
  return emailValidator.validate(email);
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDocument = await User.findOne({ email }).populate('history', 'productName categoryName classificationPhoto photos countryOrigin allergens description minerals comment ingredients brand ');;

    if (!userDocument)
      return res.json({
        success: false,
        message: "email / password does not match!",
      });

    const isPasswordValid = await bcrypt.compare(
      password,
      userDocument.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const payload = {
      _id: userDocument._id,
      name: userDocument.name,
      email: userDocument.email,
    };
    const userToken = jwt.sign(payload, JWT_SECRET);
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 60480000000000),
    };
    console.log("JWT TOKEN", userToken);
    res
      .cookie("userToken", userToken, options)
      .json({ success: true, user: payload });
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
}; 
/* const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDocument = await User.findOne({ email }).populate('history', 'productName'); // Assuming you have a 'product' field in your User model that references the Product model

    if (!userDocument)
      return res.json({
        success: false,
        message: "email / password does not match!",
      });

    const isPasswordValid = await bcrypt.compare(
      password,
      userDocument.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const payload = {
      _id: userDocument._id,
      name: userDocument.name,
      email: userDocument.email,
      productName: userDocument.productName, // Access the product name property
    };
    const userToken = jwt.sign(payload, JWT_SECRET);
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 60480000000000),
    };
    console.log("JWT TOKEN", userToken);
    res
      .cookie("userToken", userToken, options)
      .json({ success: true, user: payload });
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
}; */

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "You have Successfully Logged Out!" });
};

/*  const getLoggedInUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.user._id }).select(
      "-password"
    );
    res.json(currentUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};  */
const getLoggedInUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.user._id })
      .select("-password")
      .populate('history', 'productName categoryName classificationPhoto photos countryOrigin allergens description minerals comment ingredients brand'); 
      res.json(currentUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

/* 
const getHistoryUser = async (req, res) => {
  try {
    const getHisUser = await Product.find();
    res.json(getHisUser);
  } catch (error) {
    console.log(error.message);
  }
}; */

/* const updateUserHistory = async (req, res) => {
  try {
 
    const updatedHistory = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!updatedHistory) {
      res.status(404).json({ message: 'There is no history'});
    }
    res.json(updatedHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */
const updateUserHistory = async (userId, productId) => {
 try{
  const userUpdatedHistory = await User.findOneAndUpdate( 
    { _id: userId }, // the query condition to match the document
    { $push: { history: productId } }, // the update operation to push the new element
    { new: true }, // options to return the updated document
  
  );
  

 }catch (error) {
 console.log(error.message);
 }

}
module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
  
  updateUserHistory,
};
