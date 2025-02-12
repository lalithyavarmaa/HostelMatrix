import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgot.css'; // Ensure this file is correctly linked

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the email to your backend for processing
        // For now, we will simulate sending an email
        if (email) {
            setMessage('If this email is registered, you will receive a password reset link.');
        } else {
            setMessage('Please enter a valid email.');
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Submit</button>
                <div className="message">{message}</div>
            </form>
        </div>
    );
};

export default ForgotPassword;
