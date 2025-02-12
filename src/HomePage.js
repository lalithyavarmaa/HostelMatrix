import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './homePage.css';

const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (token && username && email) {
      setIsLoggedIn(true);
      setUserData({ username, email });
    }
  }, []);

  const toggleLoginDropdown = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserData({ username: '', email: '' });
    navigate('/');
  };

  const handleStartNowClick = () => {
    if (isLoggedIn) {
      navigate('/hostels');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <h1>Hostel Matrix</h1>
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            {isLoggedIn ? (
              <li className="profile-item" onClick={toggleLoginDropdown}>
                <a href="#">Profile</a>
                {isLoginOpen && (
                  <div className="profile-dropdown">
                    <ul>
                      <li>Username: {userData.username || 'Loading...'}</li>
                      <li>Email: {userData.email || 'Loading...'}</li>
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li className="login-item" onClick={toggleLoginDropdown}>
                <a href="#">Login</a>
                {isLoginOpen && (
                  <div className="login-dropdown">
                    <ul>
                      <li><Link to="/adminLogin">Admin Login</Link></li>
                      <li><Link to="/login">User Login</Link></li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Find your next perfect place with ease</h2>
          <p>Hostel Matrix will help you find your home fast, easy, and comfortable.</p>
          <button className="cta-btn" onClick={handleStartNowClick}>Let's start now ...</button>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <p>Our hostel provides a safe and comfortable environment for students at the college. Located within the campus, we offer affordable rooms with modern amenities.</p>
      </section>

      <section id="services" className="services">
        <h2>Services</h2>
        <div className="service-cards">
          <div className="card">
            <h3>24/7 Security</h3>
            <p>Safe and secure accommodation with CCTV surveillance and guards around the clock.</p>
          </div>
          <div className="card">
            <h3>Free Wi-Fi</h3>
            <p>Stay connected with high-speed internet available throughout the hostel.</p>
          </div>
          <div className="card">
            <h3>Comfortable Rooms</h3>
            <p>Spacious rooms with all the necessary amenities for your comfort.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>If you have any queries or want to book your stay, feel free to contact us!</p>
        <p>9989244077</p>
        <p>lalithyavarma@gmail.com</p>
        {/* <button className="cta-btn">Get In Touch</button> */}
      </section>

      <footer className="footer">
        <p>&copy; 2024 Hostel Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
