const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['campus', 'events', 'sports', 'activities'],
    default: 'campus'
  },
  image: {
    data: Buffer,
    contentType: String,
    size: Number
  },
  imageUrl: {
    type: String,
    default: null
  },
  uploadType: {
    type: String,
    enum: ['file', 'url'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Add index for better performance
gallerySchema.index({ category: 1, isActive: 1 });
gallerySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Gallery', gallerySchema);