const express = require('express');
const router = express.Router();
const { getPublicBatches, getPublicBatchById } = require('../controllers/publicBatchController');

// Public access routes (no auth required)
router.get('/', getPublicBatches);         // GET all available batches
router.get('/:id', getPublicBatchById);    // GET single batch by ID

module.exports = router;
