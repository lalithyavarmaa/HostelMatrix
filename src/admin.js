import React, { useState } from 'react';
import './admin.css';

// Import Components
import AddHostel from './AddHostel';
import ManageHostels from './ManageHostels';
import StudentDetails from './StudentDetails';
import Analysis from './Analysis';
import ComplaintList from './ComplaintList';

function Admin() {
  // Set default page to 'analysis'
  const [currentPage, setCurrentPage] = useState('manage-hostels');

  const loadPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="Admin">
      <header className="header">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="dashboard-container">
        <div className="button-panel">
          <button onClick={() => loadPage('add-hostel')}>Add Hostel</button>
          <button onClick={() => loadPage('manage-hostels')}>Manage Hostels</button>
          <button onClick={() => loadPage('student-details')}>Student Details</button>
          <button onClick={() => loadPage('analysis')}>Analysis</button>
          <button onClick={() => loadPage('viewcomplaints')}>View Complaints</button>
        </div>

        <div className="content-panel">
          {/* Render the page content based on the currentPage state */}
          {currentPage === 'add-hostel' && <AddHostel />}
          {currentPage === 'manage-hostels' && <ManageHostels />}
          {currentPage === 'student-details' && <StudentDetails />}
          {currentPage === 'analysis' && <Analysis />}
          {currentPage === 'viewcomplaints' && <ComplaintList />}
        </div>
      </div>
    </div>
  );
}

export default Admin;
