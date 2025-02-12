// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hostelName: { type: String, required: true },
  floor: { type: Number, required: true },
  room: { type: Number, required: true },
  bed: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  parentDetails: { type: String, required: true },
  registerNumber: { type: String },
  passedOutYear: { type: Number },
  bookingDate: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Booking', bookingSchema);
