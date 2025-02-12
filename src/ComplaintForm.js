import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './complaintForm.css';  // You can add your styles here

const ComplaintForm = () => {
    const [complaintData, setComplaintData] = useState({
      studentName: '',
      hostelName: '',
      roomNumber: '',
      problemDescription: ''
    });
  
    // Initialize the navigate function for redirection
    const navigate = useNavigate();
  
    const handleComplaintChange = (e) => {
      const { name, value } = e.target;
      setComplaintData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleComplaintSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(complaintData),
    });

    const result = await response.json();
    console.log(result);  // Log the response to debug

    if (response.ok && result.success) {
      alert('Complaint filed successfully!');
      navigate('/');  // Redirect to HostelCards page
    } else {
      alert(`Error: ${result.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error submitting complaint:', error);
    alert('Error filing complaint. Please try again.');
  }
};

  
    return (
      <div className="complaint-form-container">
        <h2>File a Complaint</h2>
        <form onSubmit={handleComplaintSubmit}>
          <input
            type="text"
            name="studentName"
            placeholder="Your Name"
            value={complaintData.studentName}
            onChange={handleComplaintChange}
            required
          />
          <input
            type="text"
            name="hostelName"
            placeholder="Hostel Name"
            value={complaintData.hostelName}
            onChange={handleComplaintChange}
            required
          />
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={complaintData.roomNumber}
            onChange={handleComplaintChange}
            required
          />
          <textarea
            name="problemDescription"
            placeholder="Describe the problem"
            value={complaintData.problemDescription}
            onChange={handleComplaintChange}
            required
          />
          <button type="submit">Submit Complaint</button>
        </form>
      </div>
    );
  };
  
  export default ComplaintForm;
  