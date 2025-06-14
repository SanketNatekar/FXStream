const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllUsers); // GET /api/users

module.exports = router;
