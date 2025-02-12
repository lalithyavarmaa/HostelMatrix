const mongoose = require('mongoose'); // Import mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose); 

const hostelSchema = new mongoose.Schema({
  hostelName: { type: String, required: true },
  numOfFloors: { type: Number, required: true },
  roomsPerFloor: { type: Number, required: true },
  bedsPerRoom: { type: Number, required: true },
  isAC: { type: Boolean, default: false },
  isNonAC: { type: Boolean, default: false },
  laundryService: { type: String, enum: ['yes', 'no'], default: 'no' },
  hostelImage: { type: String, required: true },
  roomImage: { type: String, required: true },
}, { timestamps: true });

hostelSchema.plugin(AutoIncrement, { inc_field: 'hostel_id' });
const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
