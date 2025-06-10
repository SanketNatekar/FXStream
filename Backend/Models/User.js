const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  
  password: {
    type: String,
    required: true,
    minlength: 6
  },

  phone: {
    type: String,
    required: false,
    trim: true
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔒 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Method to compare password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
