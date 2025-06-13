const Batch = require('../Models/Batch');

// @desc    Get all batches (public)
// @route   GET /api/public-batches
exports.getPublicBatches = async (req, res) => {
  try {
    const batches = await Batch.find({}, '-registeredUsers'); // hide registered users
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching batches', error });
  }
};

// @desc    Get single batch by ID (public)
// @route   GET /api/public-batches/:id
exports.getPublicBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).select('-registeredUsers');
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching batch', error });
  }
};
