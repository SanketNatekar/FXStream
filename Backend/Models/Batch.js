const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
    trim: true
  },

  startDate: {
    type: Date,
    required: true
  },

  duration: {
    type: String, // e.g., "4 weeks", "2 months"
    required: true
  },

  totalSlots: {
    type: Number,
    required: true,
    min: 1
  },

  filledSlots: {
    type: Number,
    default: 0,
    min: 0
  },

  mode: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },

  language: {
    type: String,
    enum: ['Hindi', 'Marathi', 'English'],
    required: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  registeredUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  thumbnail: {
    type: String, // URL to image (Cloudinary, etc.)
    required: false
  },

  description: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Batch', batchSchema);