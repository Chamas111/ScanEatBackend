const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is Required!'] },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is Required!'],
      validate: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'please provide a correct email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters'],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

// MAKE SURE TO USE function not ()=> with mongoose middleware
userSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords must match!');
  }
  next();
});

userSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 8);
    console.log('HASHED PASSWORD', hashedPassword);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log('ERROR', 'hashing error');
    next(error);
  }
});

const model = mongoose.model('User', userSchema);
module.exports = model;
