import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthFormWrapper from "../../components/AuthComponents/AuthFormWrapper";
import InputField from '../../components/AuthComponents/InputField';
import Button from '../../components/AuthComponents/Button';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignUp = async (e) => {
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

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        // Clear error message if everything is valid
        setErrorMessage('');

        try {
            // Send a POST request to the backend signup API
            const response = await axios.post('http://localhost:3000/api/auth/signup', {
                username,
                email,
                password,
            });


            if (response.status === 201) {
                // Redirect to OTP verification page after successful signup
                navigate('/otp-verification');
            } else {
                setErrorMessage('Signup failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('User already exists or invalid input.');
            } else {
                setErrorMessage('Server error. Please try again later.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <AuthFormWrapper title="Sign Up">
                <form onSubmit={handleSignUp} className="mt-12">
                    <InputField
                        labelText="Username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <div className='mt-8'>
                        <InputField
                            labelText="Email Address"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-8 relative">
                        <InputField
                            labelText="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-3 flex items-center mt-6"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    <div className="mt-8 relative">
                        <InputField
                            labelText="Confirm Password"
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-3 flex items-center mt-6"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                    )}

                    <div className="mt-16">
                        <Button type="submit">
                            Sign Up
                        </Button>
                    </div>

                    <p className="mt-6 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-dark-grey hover:underline">
                            Log In
                        </Link>
                    </p>
                </form>
            </AuthFormWrapper>
        </div>
    );
};

export default SignUpPage;

// nest

