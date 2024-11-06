import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
   const navigate = useNavigate()

    // Default credentials (for testing purposes)
    const DEFAULT_USERNAME = 'unicodesadmin';
    const DEFAULT_PASSWORD = 'unic2211'; // Change to your desired default password

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
            // Simulate successful login
            alert('Login successful!'); // Replace with actual navigation
            // Navigate to admin dashboard
            navigate('/dashboard')
        } else {
            setError('Invalid username or password.'); // Show error if credentials are incorrect
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Admin Login</h2>
                {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
