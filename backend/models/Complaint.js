const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  hostelName: {
    type: String,
    required: true,
    trim: true
  },
  roomNumber: {
    type: String,
    required: true,
    trim: true
  },
  problemDescription: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Complaint model
module.exports = mongoose.model('Complaint', complaintSchema);

