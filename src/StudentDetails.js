import React, { useState, useEffect } from 'react';
import './studentDetails.css';

const StudentDetails = () => {
  const [bookings, setBookings] = useState([]); // State for bookings
  const [selectedBooking, setSelectedBooking] = useState(null); // State for selected booking (modal)
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // Fetch bookings from the server
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/booking');
        const data = await response.json();
        console.log('API Response:', data); // Add this log
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
  
    fetchBookings();
  }, []);

  // Open modal with selected booking
  const openModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className="student-details">
      <h2>Student Details</h2>
      <table className="details-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Register Number</th>
            <th>Hostel Booked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {bookings.map((booking) => (
  <tr key={booking._id}>
    <td>{booking.username}</td>
    <td>{booking.registerNumber || 'NIL'}</td>
    <td>{booking.hostelName}</td>
    <td>
      <button onClick={() => openModal(booking)}>More Details</button>
    </td>
  </tr>
))}

        </tbody>
      </table>

      {/* Modal for displaying booking details */}
      {showModal && selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h3>Booking Details</h3>
            <p><strong>Username:</strong> {selectedBooking.username}</p>
            <p><strong>Email:</strong> {selectedBooking.email}</p>
            <p><strong>Phone:</strong> {selectedBooking.phone}</p>
            <p><strong>Address:</strong> {selectedBooking.address}</p>
            <p><strong>Parent Details:</strong> {selectedBooking.parentDetails}</p>
            <p><strong>Register Number:</strong> {selectedBooking.registerNumber || 'NIL'}</p>
            <p><strong>Passed Out Year:</strong> {selectedBooking.passedOutYear}</p>
            <p><strong>Hostel Name:</strong> {selectedBooking.hostelName}</p>
            <p><strong>Floor:</strong> {selectedBooking.floor}</p>
            <p><strong>Room:</strong> {selectedBooking.room}</p>
            <p><strong>Bed:</strong> {selectedBooking.bed}</p>
            <p><strong>Booking Date:</strong> {new Date(selectedBooking.bookingDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
