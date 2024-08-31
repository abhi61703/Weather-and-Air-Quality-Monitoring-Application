import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use an environment variable for the API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [registerData, setRegisterData] = useState({
        name: '',
        location: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, loginData);
            localStorage.setItem('token', response.data.token); // Store token
            const { locationRequired } = response.data; // Assuming backend returns this
            if (locationRequired) {
                navigate('/location');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during login');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, registerData);
            localStorage.setItem('token', response.data.token); // Store token
    
            // Check if the user needs to provide location or not
            const userResponse = await axios.get(`${API_URL}/api/auth/user`, {
                headers: { Authorization: `Bearer ${response.data.token}` }
            });
    
            if (userResponse.data.location) {
                // If location is already set, redirect to community page
                window.location.href = '/community';
            } else {
                // If location is not set, redirect to location page
                window.location.href = '/location';
            }
        } catch (err) {
            console.error('Registration Error:', err.response); // Log the complete error response
            setError(err.response?.data?.message || 'An error occurred during registration');
        }
    };
    

    const handleGoogleAuth = () => {
        window.location.href = `http://localhost:8081/login/oauth2/google`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                {/* Login Form */}
                {isLogin ? (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleLoginChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                                Login
                            </button>
                        </form>
                    </div>
                ) : (
                    // Register Form
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={registerData.location}
                                    onChange={handleRegisterChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
                                Register
                            </button>
                        </form>
                    </div>
                )}

                {/* Google Auth Button */}
                <button
                    onClick={handleGoogleAuth}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                    {isLogin ? 'Login with Google' : 'Sign Up with Google'}
                </button>

                {/* Toggle between Login and Register */}
                <div className="text-center mt-4">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 underline"
                    >
                        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default AuthPage;
