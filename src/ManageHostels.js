import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageHostels.css';

function ManageHostels() {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null); // For storing the hostel to edit
  const [formData, setFormData] = useState({
    hostelName: '',
    numOfFloors: '',
    roomsPerFloor: '',
    bedsPerRoom: '',
    isAC: false,
    isNonAC: false,
    laundryService: 'no',
    hostelImage: null,
    roomImage: null
  });

  // Fetch hostels when the component is mounted
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hostels');
        setHostels(response.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  // Handle delete
  const handleDelete = async (hostelId) => {
    try {
      await axios.delete(`http://localhost:5000/api/hostels/${hostelId}`);
      setHostels(hostels.filter(hostel => hostel._id !== hostelId));
    } catch (error) {
      console.error('Error deleting hostel:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (hostel) => {
    setSelectedHostel(hostel);
    setFormData({
      hostelName: hostel.hostelName,
      numOfFloors: hostel.numOfFloors,
      roomsPerFloor: hostel.roomsPerFloor,
      bedsPerRoom: hostel.bedsPerRoom,
      isAC: hostel.isAC,
      isNonAC: hostel.isNonAC,
      laundryService: hostel.laundryService,
      hostelImage: hostel.hostelImage,
      roomImage: hostel.roomImage
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/hostels/${selectedHostel._id}`,
        formData
      );
      const updatedHostels = hostels.map(hostel =>
        hostel._id === selectedHostel._id ? response.data : hostel
      );
      setHostels(updatedHostels);
      setSelectedHostel(null); // Close the edit form
    } catch (error) {
      console.error('Error updating hostel:', error);
    }
  };

  return (
    <div className="manage-hostels">
      <h2>Manage Hostels</h2>
      
      {/* Displaying hostel cards */}
      <div className="hostels-list">
        {hostels.map((hostel) => (
          <div className="hostel-card" key={hostel._id}>
            <img src={`http://localhost:5000/${hostel.hostelImage}`} alt={hostel.hostelName} />
            <div className="hostel-info">
              <h3>{hostel.hostelName}</h3>
              <p>Vacancies: {hostel.numOfFloors * hostel.roomsPerFloor * hostel.bedsPerRoom}</p>
              <button onClick={() => handleEdit(hostel)}>Edit</button>
              <button onClick={() => handleDelete(hostel._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Hostel Form */}
      {selectedHostel && (
        <div className="edit-form">
          <h3>Edit Hostel</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Hostel Name</label>
              <input
                type="text"
                name="hostelName"
                value={formData.hostelName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Number of Floors</label>
              <input
                type="number"
                name="numOfFloors"
                value={formData.numOfFloors}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Number of Rooms per Floor</label>
              <input
                type="number"
                name="roomsPerFloor"
                value={formData.roomsPerFloor}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Number of Beds per Room</label>
              <input
                type="number"
                name="bedsPerRoom"
                value={formData.bedsPerRoom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>AC</label>
              <input
                type="checkbox"
                name="isAC"
                checked={formData.isAC}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Non-AC</label>
              <input
                type="checkbox"
                name="isNonAC"
                checked={formData.isNonAC}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Laundry Service</label>
              <select
                name="laundryService"
                value={formData.laundryService}
                onChange={handleInputChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button type="submit">Update Hostel</button>
            <button type="button" onClick={() => setSelectedHostel(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManageHostels;
