// routes/booking.js
const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// routes/booking.js
router.post('/booking', async (req, res) => {
  try {
    // Log the received data
    console.log('Received booking request:', req.body);

    // Validate required fields
    const requiredFields = ['hostelName', 'floor', 'room', 'bed', 'username', 'email', 'phone', 'address', 'parentDetails'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    
    console.log('Booking saved successfully:', savedBooking);
    res.status(201).json({ message: 'Booking successful!' });
    
  } catch (error) {
    console.error('Detailed booking error:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: error.message 
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'This bed is already booked' 
      });
    }

    res.status(500).json({ 
      message: 'Error booking hostel', 
      details: error.message 
    });
  }
});
module.exports = router;
