const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
    trim: true
  },
  studentImageData: {
    type: Buffer, // Store image as buffer
  },
  imageUrl: {
    type: String, // For URL-based uploads
  },
  resultPosterData: {  // ADD THIS NEW FIELD
    type: Buffer, // Store result poster image
  },
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  rank: {
    type: Number,
    required: true,
    min: 1
  },
  totalStudents: {
    type: Number,
    required: true,
    min: 1
  },
  marks:{
    type:String,
    required: true,
  },
  uploadType: {
    type: String,
    enum: ['file', 'url'],
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Virtual to convert buffer to base64 for frontend
resultSchema.virtual('studentImageDataBase64').get(function() {
  if (this.studentImageData) {
    return `data:image/jpeg;base64,${this.studentImageData.toString('base64')}`;
  }
  return null;
});

// Ensure virtual fields are serialized
resultSchema.set('toJSON', { virtuals: true });
resultSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Result', resultSchema);