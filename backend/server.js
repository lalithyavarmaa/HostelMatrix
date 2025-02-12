const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import the auth routes
const hostelRoutes = require('./routes/hostel');
const bookingRoutes = require('./routes/booking');
const complaintRoutes = require('./routes/complaint');

const multer = require('multer');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});
const upload = multer({ storage });

// Middleware
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({ origin: '*' }));


// MongoDB Connection
// In your server.js
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hostel-booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected Successfully');
  console.log('Connection URL:', process.env.MONGO_URI || 'mongodb://localhost:27017/hostel-booking');
})
.catch((err) => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Routes
app.use('/api', authRoutes); // All routes under /api will use authRoutes
app.use('/api/hostels', hostelRoutes);
app.use('/api/booking', bookingRoutes); // Booking routes
app.use('/api/complaints',complaintRoutes); // Complaint routes

// Basic Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Hostel Booking API');
});

// Handle 404 Errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
