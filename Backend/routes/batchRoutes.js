const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
  getRegisteredUsers //fetching the registered users
} = require('../controllers/batchController');

//const { getRegisteredUsers } = require('../controllers/batchController');

// Admin Routes (Protected)
router.post('/', protect, isAdmin, createBatch);
router.get('/', protect, isAdmin, getAllBatches);
router.get('/:id', protect, isAdmin, getBatchById);
router.put('/:id', protect, isAdmin, updateBatch);
router.delete('/:id', protect, isAdmin, deleteBatch);

//fetch the registered user for course
router.get('/registered-users/:id', protect, getRegisteredUsers);


module.exports = router;
