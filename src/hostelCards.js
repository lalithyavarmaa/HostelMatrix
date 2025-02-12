import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './hostelCards.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import { useNavigate } from 'react-router-dom';
const HostelCards = () => {
  const navigate = useNavigate();
  const [hostels, setHostels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vacancyView, setVacancyView] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedBed, setSelectedBed] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    username: 'aishu', // Sample user details, replace it with actual user data
    email: 'aishu@gmail.com',
    phone: '',
    address: '',
    parentDetails: '',
    registerNumber: '',
    passedOutYear: ''
  });

  useEffect(() => {
    document.body.classList.add('hostelCards-body');

    const fetchHostels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hostels');
        setHostels(response.data);
        setFilteredHostels(response.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };
    fetchHostels();
  }, []);

  // Filter hostels based on search query
  const filterHostels = (query) => {
    setSearchQuery(query);
    const filtered = hostels.filter((hostel) =>
      hostel.hostelName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHostels(filtered);
  };

  // Show modal with hostel details
  const handleViewDetails = (hostel) => {
    setSelectedHostel(hostel);
    setShowModal(true);
    setVacancyView(false); // Reset vacancy view when details open
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHostel(null);
    setVacancyView(false);
    setSelectedFloor(null);
    setSelectedRoom(null);
    setSelectedBed(null);
  };

  // Toggle vacancy view
  const handleViewVacanciesToggle = () => {
    setVacancyView(!vacancyView);
    setSelectedFloor(null);
    setSelectedRoom(null);
    setSelectedBed(null);
  };

  // Handle Bed Selection
  const handleBedSelection = (floor, room, bed) => {
    setSelectedFloor(floor);
    setSelectedRoom(room);
    setSelectedBed(bed);
    setShowBookingForm(true);
  };

  // Handle Booking Form Submit
  // In your HostelCards.js component
const handleBookingSubmit = async (e) => {
  e.preventDefault();
  
  // Validate form data before submission
  if (!bookingData.phone || !bookingData.address || !bookingData.parentDetails) {
    alert('Please fill in all required fields');
    return;
  }

  const bookingDetails = {
    hostelName: selectedHostel.hostelName,
    floor: selectedFloor,
    room: selectedRoom,
    bed: selectedBed,
    username: bookingData.username,
    email: bookingData.email,
    phone: bookingData.phone,
    address: bookingData.address,
    parentDetails: bookingData.parentDetails,
    registerNumber: bookingData.registerNumber || '',
    passedOutYear: bookingData.passedOutYear || null
  };

  try {
    console.log('Sending booking request:', bookingDetails); // Debug log

    const response = await axios.post('http://localhost:5000/api/booking/booking', bookingDetails);
    
    console.log('Server response:', response); // Debug log

    if (response.status === 201) {
      alert('Booking successful!');
      handleCloseModal();
    }
  } catch (error) {
    console.error('Booking error:', error.response?.data || error.message);
    
    // Show specific error message to user
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.details || 
                        'Error booking hostel. Please try again.';
    
    alert(errorMessage);
  }
};
  
  // Update bed color to grey and room color if necessary
  // Update bed color to grey and room color if necessary
const updateBedAndRoomStatus = () => {
  // Make a copy of the selected hostel to avoid mutating the state directly
  const updatedHostel = { ...selectedHostel };

  // Mark the selected bed as booked (Grey color)
  updatedHostel.floors[selectedFloor - 1].rooms[selectedRoom - 1].beds[selectedBed - 1].isBooked = true;

  // Check if all beds in the room are booked and mark room grey if true
  const isRoomFullyBooked = updatedHostel.floors[selectedFloor - 1].rooms[selectedRoom - 1].beds.every(bed => bed.isBooked);
  if (isRoomFullyBooked) {
    updatedHostel.floors[selectedFloor - 1].rooms[selectedRoom - 1].isBooked = true;
  }

  // Update the hostel state so React re-renders
  setSelectedHostel(updatedHostel);
};
const handleFileComplaint = () => {
  navigate('/complaints');  // Redirect to the ComplaintForm component
};

  return (
    <div className="container">
      {/* Sticky Section */}
      <div className="sticky-section">
        <h1>Hostel Search</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => filterHostels(e.target.value)}
          placeholder="Search for hostels..."
          className="search-bar"
        />
        <button className="file-complaint-btn" onClick={handleFileComplaint}>File a Complaint</button>
      </div>

      {/* Display Hostel Cards */}
      <div className="hostels-list">
        {filteredHostels.map((hostel) => (
          <div key={hostel._id} className="card">
            <img
              src={`http://localhost:5000/${hostel.hostelImage}`}
              alt={hostel.hostelName}
              className="card-img"
            />
            <h3>{hostel.hostelName}</h3>
            <button onClick={() => handleViewDetails(hostel)}>View Details</button>
          </div>
        ))}

        {/* Modal with Hostel Details */}
        {selectedHostel && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={handleCloseModal}>X</button>
              <h4>Hostel Details</h4>
              <div className="hostel-details">
                <div className="availability">
                  <span>Available: </span>
                  <span>
                    {selectedHostel.isAC && selectedHostel.isNonAC
                      ? "Both AC & Non-AC"
                      : selectedHostel.isAC
                      ? "AC"
                      : selectedHostel.isNonAC
                      ? "Non-AC"
                      : "No Availability"}
                  </span>
                </div>
                <div className="laundry-service">
                  <span>Laundry Service: </span>
                  <span>{selectedHostel.laundryService}</span>
                </div>
                <div className="hostel-images">
                  <img
                    src={`http://localhost:5000/${selectedHostel.roomImage}`}
                    alt="Room"
                    className="room-image"
                  />
                </div>
                <div className="hostel-info">
                  <p>Floors: {selectedHostel.numOfFloors}</p>
                  <p>Rooms per Floor: {selectedHostel.roomsPerFloor}</p>
                  <p>Beds per Room: {selectedHostel.bedsPerRoom}</p>
                  <p>
                    Vacancies:{" "}
                    {selectedHostel.numOfFloors *
                      selectedHostel.roomsPerFloor *
                      selectedHostel.bedsPerRoom}
                  </p>
                  <button onClick={handleViewVacanciesToggle}>
                    {vacancyView ? "Hide Vacancies" : "View Vacancies"}
                  </button>
                </div>

                {/* Vacancy View */}
                {vacancyView && (
                  <div className="vacancy-view">
                    {!selectedFloor &&
                      Array.from({ length: selectedHostel.numOfFloors }).map(
                        (_, index) => (
                          <i
                            key={index}
                            className="fas fa-building floor-icon"
                            title={`Floor ${index + 1}`}
                            onClick={() => setSelectedFloor(index + 1)}
                          ></i>
                        )
                      )}
                    {selectedFloor &&
                      !selectedRoom &&
                      Array.from({
                        length: selectedHostel.roomsPerFloor,
                      }).map((_, index) => (
                        <i
                          key={index}
                          className="fas fa-door-closed room-icon"
                          title={`Room ${index + 1}`}
                          onClick={() => setSelectedRoom(index + 1)}
                        ></i>
                      ))}
                    {selectedFloor &&
                      selectedRoom &&
                      Array.from({
                        length: selectedHostel.bedsPerRoom,
                      }).map((_, index) => (
                        <i
                          key={index}
                          className="fas fa-bed bed-icon"
                          title={`Bed ${index + 1}`}
                          onClick={() => handleBedSelection(selectedFloor, selectedRoom, index + 1)}
                        ></i>
                      ))}
                  </div>
                )}

                {/* Booking Form */}
                {showBookingForm && (
                  <div className="booking-form">
                    <h3>Booking Form</h3>
                    <form onSubmit={handleBookingSubmit}>
                      <p><strong>Hostel Name:</strong> {selectedHostel.hostelName}</p>
                      <p><strong>Floor:</strong> {selectedFloor}</p>
                      <p><strong>Room:</strong> {selectedRoom}</p>
                      <p><strong>Bed:</strong> {selectedBed}</p>

                      <label>Phone Number:</label>
                      <input
                        type="text"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        required
                      />

                      <label>Address:</label>
                      <textarea
                        value={bookingData.address}
                        onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                        required
                      />

                      <label>Parent Details:</label>
                      <input
                        type="text"
                        value={bookingData.parentDetails}
                        onChange={(e) => setBookingData({ ...bookingData, parentDetails: e.target.value })}
                        required
                      />

                      <label>Register Number (if applicable):</label>
                      <input
                        type="text"
                        value={bookingData.registerNumber}
                        onChange={(e) => setBookingData({ ...bookingData, registerNumber: e.target.value })}
                      />

                      <label>Passed Out Year:</label>
                      <input
                        type="number"
                        value={bookingData.passedOutYear}
                        onChange={(e) => setBookingData({ ...bookingData, passedOutYear: e.target.value })}
                      />

                      <button type="submit">Confirm Booking</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelCards;
