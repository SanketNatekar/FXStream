const mongoose = require('mongoose');

const forgotPasswordTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // Expires in 5 minutes (auto-delete)
  }
});

module.exports = mongoose.model('ForgotPasswordToken', forgotPasswordTokenSchema);
