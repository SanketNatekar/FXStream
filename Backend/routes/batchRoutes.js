const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch
} = require('../controllers/batchController');

// Admin Routes (Protected)
router.post('/', protect, isAdmin, createBatch);
router.get('/', protect, isAdmin, getAllBatches);
router.get('/:id', protect, isAdmin, getBatchById);
router.put('/:id', protect, isAdmin, updateBatch);
router.delete('/:id', protect, isAdmin, deleteBatch);

module.exports = router;
