const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['applied', 'interviewing', 'offer', 'rejected', 'withdrawn'],
      default: 'applied',
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Applications', applicationSchema);
