const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../Models/User');
const ForgotPasswordToken = require('../Models/ForgotPasswordToken');
const generateOTP = require('../utils/generateOTP');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();


// ➔ SEND OTP for Login/Signup
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const otp = generateOTP();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    await sendEmail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ success: true, message: 'OTP sent to email.' });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    res.status(500).json({ success: false, message: 'Error sending OTP.' });
  }
});

// ➔ VERIFY OTP for Login/Signup
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({ success: false, message: 'Error verifying OTP.' });
  }
});


// ➔ SEND OTP FORGOT PASSWORD
router.post('/forgot-password/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    await ForgotPasswordToken.deleteMany({ userId: user._id });

    await ForgotPasswordToken.create({ userId: user._id, otp: hashedOTP });

    await sendEmail(email, 'Reset Password OTP', `Your OTP for password reset is ${otp}.`);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ➔ VERIFY OTP FORGOT PASSWORD
router.post('/forgot-password/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = await ForgotPasswordToken.findOne({ userId: user._id });
    if (!token) return res.status(400).json({ message: 'OTP expired or not found' });

    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    if (token.otp !== hashedOTP) return res.status(400).json({ message: 'Invalid OTP' });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ➔ RESET PASSWORD
router.post('/forgot-password/reset', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = await ForgotPasswordToken.findOne({ userId: user._id });
    if (!token) return res.status(400).json({ message: 'OTP expired or not found' });

    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
    if (token.otp !== hashedOTP) return res.status(400).json({ message: 'Invalid OTP' });

    user.password = newPassword;
    await user.save();

    await ForgotPasswordToken.deleteMany({ userId: user._id });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
