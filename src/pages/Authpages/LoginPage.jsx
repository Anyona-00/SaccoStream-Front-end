import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthFormWrapper from "../../components/AuthComponents/AuthFormWrapper";
import InputField from '../../components/AuthComponents/InputField';
import Button from '../../components/AuthComponents/Button';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Frontend validation for email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return emailRegex.test(email);
    };

    // Frontend validation for password strength
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, letters, and numbers
        return passwordRegex.test(password);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 8 characters long and contain both letters and numbers');
            return;
        }

        // Clear error message before proceeding
        setErrorMessage('');

        try {
            // Send login request to the backend API
            const response = await axios.post('http://localhost:3000/api/login', {
                email,
                password
            });

            if (response.status === 200) {
                // If login is successful, extract token from the response
                const { token } = response.data;  // Assuming the token is in the response
                localStorage.setItem('token', token);  // Store JWT token in local storage

                // Redirect to the welcome page after successful login
                navigate('/welcome');
            } else {
                setErrorMessage('Login failed. Please check your credentials.');
            }
        }
        catch (error) {
            if (error.response) {
                console.error('Response error:', error.response.data);
                setErrorMessage(error.response.data.message || 'Unexpected error');
            } else if (error.request) {
                console.error('Request error:', error.request);
                setErrorMessage('No response received from server');
            } else {
                console.error('Error:', error.message);
                setErrorMessage('Error occurred: ' + error.message);
            }
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <AuthFormWrapper title="Login">
                <form onSubmit={handleLogin} className='mt-24'>
                    <InputField
                        labelText="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="mt-8 relative">
                        <InputField
                            labelText="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        >
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 flex items-center mt-6"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </InputField>
                    </div>

                    <p className="mt-2 mb-4 text-right">
                        <Link to="/forgot-password" className="text-dark-grey hover:underline">
                            Forgot Password?
                        </Link>
                    </p>

                    {/* Display error message if any */}
                    {errorMessage && (
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                    )}

                    <div className='mt-16'>
                        <Button type="submit">Login</Button>
                    </div>

                    <p className="mt-6 text-center">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-dark-grey hover:underline">
                            Sign Up
                        </Link>
                    </p>

                </form>
            </AuthFormWrapper>
        </div>
    );
};

export default LoginPage;
