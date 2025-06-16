const express = require('express');
const router = express.Router();
const { protect, isAdmin, isUser } = require('../middleware/auth');
const {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
  getRegisteredUsers, //fetching the registered users
  enrollInBatch
} = require('../controllers/batchController');

//const { getRegisteredUsers } = require('../controllers/batchController');

// Admin Routes (Protected)
router.post('/', protect, isAdmin, createBatch);
router.get('/', protect, isAdmin, getAllBatches);
router.get('/:id', protect, isAdmin, getBatchById);
router.put('/:id', protect, isAdmin, updateBatch);
router.delete('/:id', protect, isAdmin, deleteBatch);
// Enroll a user into a batch (user route)
router.post('/enroll/:id', protect,isUser, enrollInBatch);
//fetch the registered user for course
router.get('/registered-users/:id', protect, getRegisteredUsers);


module.exports = router;
