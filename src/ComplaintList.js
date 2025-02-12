import React, { useState, useEffect } from 'react';
import './ComplaintList.css'; // You can add styles for cards here

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch complaints data when the component is mounted
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/api/complaints');
        const data = await response.json();

        if (data.success) {
          setComplaints(data.complaints);  // Set the fetched complaints to the state
        } else {
          setError('Failed to fetch complaints');
        }
      } catch (error) {
        setError('An error occurred while fetching complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []); // Empty dependency array means this will run only once after the component mounts

  return (
    <div className="complaint-list-container">
      <h2>Complaints List</h2>

      {loading && <p>Loading complaints...</p>}
      {error && <p>{error}</p>}

      {complaints.length === 0 ? (
        <p>No complaints available</p>
      ) : (
        <div className="complaints-cards-container">
          {complaints.map((complaint, index) => (
            <div key={index} className="complaint-card">
              <h3>{complaint.studentName}</h3>
              <p><strong>Hostel Name:</strong> {complaint.hostelName}</p>
              <p><strong>Room Number:</strong> {complaint.roomNumber}</p>
              <p><strong>Problem Description:</strong> {complaint.problemDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;
