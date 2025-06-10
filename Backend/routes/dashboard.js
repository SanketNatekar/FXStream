const express = require('express');
const router = express.Router();
const { protect, isAdmin, isUser } = require('../middleware/auth');

// Accessible by logged-in users
router.get('/profile', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.role}, this is your profile.` });
});

// Only admin can access
router.get('/admin-data', protect, isAdmin, (req, res) => {
  res.json({ message: 'Admin-only data' });
});

// Only user can access
router.get('/user-data', protect, isUser, (req, res) => {
  res.json({ message: 'User-only data' });
});

module.exports = router;
