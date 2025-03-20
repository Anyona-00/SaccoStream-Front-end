import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthFormWrapper from "../../components/AuthComponents/AuthFormWrapper";

import InputField from '../../components/AuthComponents/InputField';
import Button from '../../components/AuthComponents/Button';

const OtpVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Function to validate the OTP (assuming it's 6 digits for this example)
    const validateOtp = (otp) => {
        const otpRegex = /^[0-9]{6}$/; // Ensures OTP is 6 digits
        return otpRegex.test(otp);
    };

    // Function to handle OTP submission
    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        // Validate OTP
        if (!validateOtp(otp)) {
            setErrorMessage('Please enter a valid 6-digit OTP');
            return;
        }

        // Clear error message if OTP is valid
        setErrorMessage('');
        setSuccessMessage('OTP verified successfully! Redirecting...');

        // Simulated API call delay
        setTimeout(() => {
            navigate('/welcome');
        }, 2000);

        // Uncomment the following block to integrate with your actual API
        /*
        try {
            const response = await axios.post('https://api.example.com/verify-otp', {
                otp,
                userId: localStorage.getItem('userId'), // Assuming userId is stored in localStorage after signup
            });

            if (response.status === 200) {
                setSuccessMessage('OTP verified successfully!');
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/welcome'); // Redirect to welcome screen after successful OTP verification
                }, 2000);
            } else {
                setErrorMessage('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Server error. Please try again later.');
        }
        */
    };

    // Function to resend the OTP
    const handleResendOtp = async () => {
        // Uncomment and implement the actual API call as needed
        /*
        try {
            const response = await axios.post('https://api.example.com/resend-otp', {
                userId: localStorage.getItem('userId'), // Assuming userId is stored in localStorage after signup
            });

            if (response.status === 200) {
                setSuccessMessage('OTP has been resent successfully.');
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to resend OTP. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Server error. Please try again later.');
        }
        */

        // For now, we'll simulate a successful resend
        setSuccessMessage('OTP has been resent successfully.');
        setErrorMessage('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <AuthFormWrapper title="OTP Verification">
                <form onSubmit={handleOtpSubmit} className="mt-24">
                    {/* OTP Input */}
                    <InputField
                        labelText="Enter OTP"
                        name="otp"
                        type="text"
                        placeholder="Enter your 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />

                    {/* Error Message */}
                    {errorMessage && (
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <p className="text-green-500 mb-4">{successMessage}</p>
                    )}

                    {/* Submit Button */}
                    <div className="mt-6">
                        <Button type="submit">
                            Verify OTP
                        </Button>
                    </div>
                </form>

                {/* Resend OTP Link */}
                <p className="mt-6 text-center">

                    <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-dark-grey hover:underline"
                    >
                        Resend OTP
                    </button>
                </p>

                {/* Link back to login */}
                <p className="mt-4 text-center">
                    Want to change your email?{' '}
                    <Link to="/login" className="text-warning-orange hover:underline">
                        Go back to Login
                    </Link>
                </p>
            </AuthFormWrapper>
        </div>
    );
};

export default OtpVerificationPage;
