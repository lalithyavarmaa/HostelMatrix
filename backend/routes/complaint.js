const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint'); // Go one directory up to access the models folder

// POST endpoint to save complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find(); // Fetch all complaints
    res.status(200).json({ success: true, complaints }); // Send complaints as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch complaints' });
  }
});

module.exports = router;
router.post('/', async (req, res) => {  // Use relative path, don't add /api here
  try {
    const { studentName, hostelName, roomNumber, problemDescription } = req.body;

    if (!studentName || !hostelName || !roomNumber || !problemDescription) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create a new complaint document
    const complaint = new Complaint({
      studentName,
      hostelName,
      roomNumber,
      problemDescription
    });

    // Save the complaint to the database
    await complaint.save();
    res.status(201).json({ success: true, message: 'Complaint filed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to file complaint.' });
  }
});

module.exports = router;
