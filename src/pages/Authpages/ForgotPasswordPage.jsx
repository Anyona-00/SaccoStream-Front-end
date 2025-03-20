import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthFormWrapper from "../../components/AuthComponents/AuthFormWrapper";

import InputField from '../../components/AuthComponents/InputField';
import Button from '../../components/AuthComponents/Button';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        // Validate email
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        // Clear error message if validation is successful
        setErrorMessage('');
        setSuccessMessage('Password reset link has been sent to your email');

        // Redirect after 5 seconds (simulated delay)
        setTimeout(() => {
            navigate('/reset-password');
        }, 5000);

        /*
        // Uncomment to make the actual API call
        try {
            const response = await axios.post('https://api.example.com/forgot-password', { email });
            if (response.status === 200) {
                setSuccessMessage('Password reset link has been sent to your email');
                setErrorMessage('');
                
                setTimeout(() => {
                    navigate('/password-reset');
                }, 5000);
            } else {
                setErrorMessage('Email not found');
            }
        } catch (error) {
            setErrorMessage('There was an error processing your request. Please try again later.');
        }
        */
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <AuthFormWrapper title="Forgot Password">
                <form onSubmit={handleForgotPassword}>
                    {/* Email Input */}
                    <div className='mt-32'><InputField
                        labelText="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    {/* Error Message */}
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                    {/* Success Message */}
                    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                    {/* Submit Button */}
                    <div className="mt-10">
                        <Button type="submit">
                            Send Reset Link
                        </Button>
                    </div>
                </form>

                {/* Link back to login */}
                <p className="mt-6 text-center text-dark-grey hover:underline">
                    Go back to <Link to="/login">Login</Link>
                </p>
            </AuthFormWrapper>
        </div>
    );
};

export default ForgotPasswordPage;
