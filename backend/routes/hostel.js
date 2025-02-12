const express = require('express');
const multer = require('multer');
const path = require('path');
const Hostel = require('../models/Hostel'); // Import the Hostel model

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// Route to handle form submission
router.post('/add-hostel', upload.fields([
  { name: 'hostelImage', maxCount: 1 },
  { name: 'roomImage', maxCount: 1 }
]), async (req, res) => {
  try {
    // Log the incoming form data
    console.log(req.body);
    console.log(req.files);

    const { hostelName, numOfFloors, roomsPerFloor, bedsPerRoom, isAC, isNonAC, laundryService } = req.body;
    const hostelImage = req.files['hostelImage'] ? req.files['hostelImage'][0].path : null;
    const roomImage = req.files['roomImage'] ? req.files['roomImage'][0].path : null;

    // Validate fields
    if (!hostelName || !numOfFloors || !roomsPerFloor || !bedsPerRoom || !hostelImage || !roomImage) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new hostel document
    const hostel = new Hostel({
      hostelName,
      numOfFloors: Number(numOfFloors),
      roomsPerFloor: Number(roomsPerFloor),
      bedsPerRoom: Number(bedsPerRoom),
      isAC,
      isNonAC,
      laundryService,
      hostelImage,
      roomImage
    });

    // Save to the database
    await hostel.save();

    res.status(201).json({ message: 'Hostel added successfully', hostel });
  } catch (error) {
    console.error('Error saving hostel:', error);
    res.status(500).json({ message: 'Error adding hostel', error });
  }
});
// In hostel.js
router.get('/', async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hostels' });
  }
});
// In hostel.js
router.put('/:id', async (req, res) => {
  try {
    const updatedHostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHostel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hostel', error });
  }
});
// In hostel.js
router.delete('/:id', async (req, res) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Hostel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hostel' });
  }
});


module.exports = router;
