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
    trim: true
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  // ✅ OTP used for Login / Signup (NOT for forgot password → separate model used for that)
  otp: String,
  otpExpiry: Date,

  // ✅ New fields (all optional)
  address: {
    type: String,
    trim: true
  },

  aadharCardNo: {
    type: String,
    trim: true
  },

  aadharImgUrl: {
    type: String,
    trim: true
  },

  panCardNo: {
    type: String,
    trim: true
  },

  panImgUrl: {
    type: String,
    trim: true
  },

  registered: {
    type: Boolean,
    default: false
  },
  
  enrolledBatches: {
  type: [String], // or [mongoose.Schema.Types.ObjectId] if referencing Batch model
  default: []
},


  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔒 Automatically hash password before saving
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

// ✅ Method to compare entered password with hashed password → used for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
