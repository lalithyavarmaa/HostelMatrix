import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically add global styles
    document.body.classList.add('adminLogin-body');

    // Cleanup styles on component unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Static credentials
    const validUsername = 'admin';
    const validPassword = 'admin';

    if (username === validUsername && password === validPassword) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
