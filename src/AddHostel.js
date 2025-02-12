import React, { useState } from 'react';
import './AddHostel.css';
import axios from 'axios';

function AddHostel() {
  const [hostelName, setHostelName] = useState('');
  const [numOfFloors, setNumOfFloors] = useState('');
  const [roomsPerFloor, setRoomsPerFloor] = useState('');
  const [bedsPerRoom, setBedsPerRoom] = useState('');
  const [isAC, setIsAC] = useState(false);
  const [isNonAC, setIsNonAC] = useState(false);
  const [laundryService, setLaundryService] = useState('no');
  const [hostelImage, setHostelImage] = useState(null);
  const [roomImage, setRoomImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('hostelName', hostelName);
    formData.append('numOfFloors', numOfFloors);
    formData.append('roomsPerFloor', roomsPerFloor);
    formData.append('bedsPerRoom', bedsPerRoom);
    formData.append('isAC', isAC);
    formData.append('isNonAC', isNonAC);
    formData.append('laundryService', laundryService);
    formData.append('hostelImage', hostelImage);
    formData.append('roomImage', roomImage);
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/hostels/add-hostel',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status === 201) {
        alert('Hostel added successfully!');
        setHostelName('');
        setNumOfFloors('');
        setRoomsPerFloor('');
        setBedsPerRoom('');
        setIsAC(false);
        setIsNonAC(false);
        setLaundryService('no');
        setHostelImage(null);
        setRoomImage(null);
      }
    } catch (error) {
      console.error('Error adding hostel:', error);
      alert('Failed to add hostel. Please try again.');
    }
  };
  

  return (
    <div className="add-hostel">
      <h2>Add New Hostel</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Hostel Name</label>
          <input
            type="text"
            value={hostelName}
            onChange={(e) => setHostelName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Floors</label>
          <input
            type="number"
            value={numOfFloors}
            onChange={(e) => setNumOfFloors(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Rooms per Floor</label>
          <input
            type="number"
            value={roomsPerFloor}
            onChange={(e) => setRoomsPerFloor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Beds per Room</label>
          <input
            type="number"
            value={bedsPerRoom}
            onChange={(e) => setBedsPerRoom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>AC</label>
          <input
            type="checkbox"
            checked={isAC}
            onChange={(e) => setIsAC(e.target.checked)}
          />
        </div>
        <div>
          <label>Non-AC</label>
          <input
            type="checkbox"
            checked={isNonAC}
            onChange={(e) => setIsNonAC(e.target.checked)}
          />
        </div>
        <div>
          <label>Laundry Service</label>
          <select
            value={laundryService}
            onChange={(e) => setLaundryService(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Hostel Image</label>
          <input
            type="file"
            onChange={(e) => setHostelImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <div>
          <label>Room Image</label>
          <input
            type="file"
            onChange={(e) => setRoomImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <div>
          <button type="submit">Add Hostel</button>
        </div>
      </form>
    </div>
  );
}

export default AddHostel;
