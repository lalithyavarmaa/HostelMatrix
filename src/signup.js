
import React, { useState } from 'react';
import './signup.css';
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    // State variables
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Handle password visibility toggle
    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Data to send to the backend
        const data = {
            uname,
            email,
            password,
            confirmPassword,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/signup', data); // Adjust URL if needed
            if (response.data.success) {
                alert('Signup successful!');
                window.location.href = '/login'; // Redirect to login page
            } else {
                alert('Signup failed: ' + response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                console.error('There was an error with the signup request:', error);
                alert('An unknown error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>

                {/* Username Input */}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        required
                    />
                    <FaUser className="input-icon" />
                </div>

                {/* Email Input */}
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email Id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaEnvelope className="input-icon" />
                </div>

                {/* Password Input */}
                <div className="input-box">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-field"
                        required
                    />
                    <span
                        className="eye-icon1"
                        onClick={() => togglePasswordVisibility('password')}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Confirm Password Input */}
                <div className="input-box">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="password-field"
                        required
                    />
                    <span
                        className="eye-icon2"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn">
                    Sign Up
                </button>
            </form>

            <br />
            <div className="center-container">
                <p>
                    Already have an account? <Link to="/login" className="black-link">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;

