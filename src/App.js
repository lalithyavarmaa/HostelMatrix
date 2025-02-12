import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';
import ForgotPassword from './forgot';
import Admin from './admin';
import HostelCards from './hostelCards';
import HomePage from './HomePage';
import AdminLogin from './adminLogin';
import ComplaintForm from './ComplaintForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route renders Login */}
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hostels" element={<HostelCards />} />
        <Route path="/complaints" element={<ComplaintForm />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
