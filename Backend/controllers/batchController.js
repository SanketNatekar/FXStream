const Batch = require('../Models/Batch');

// @desc    Create new batch
// @route   POST /api/batches
exports.createBatch = async (req, res) => {
  try {
    const batch = new Batch(req.body);
    await batch.save();
    res.status(201).json(batch);
  } catch (error) {
    res.status(400).json({ message: 'Error creating batch', error });
  }
};

// @desc    Get all batches
// @route   GET /api/batches
exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find().populate('registeredUsers', 'name email');
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching batches', error });
  }
};

// @desc    Get batch by ID
// @route   GET /api/batches/:id
exports.getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).populate('registeredUsers', 'name email');
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching batch', error });
  }
};

// @desc    Update batch
// @route   PUT /api/batches/:id
exports.updateBatch = async (req, res) => {
  try {
    const updated = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Batch not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating batch', error });
  }
};

// @desc    Delete batch
// @route   DELETE /api/batches/:id
exports.deleteBatch = async (req, res) => {
  try {
    const deleted = await Batch.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Batch not found' });
    res.status(200).json({ message: 'Batch deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting batch', error });
  }
};

exports.getRegisteredUsers = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const batch = await Batch.findById(req.params.id).populate('registeredUsers', '-password');
    if (!batch) return res.status(404).json({ message: 'Batch not found' });

    res.json(batch.registeredUsers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};