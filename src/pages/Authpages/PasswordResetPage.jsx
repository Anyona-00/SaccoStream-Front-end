import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormWrapper from "../../components/AuthComponents/AuthFormWrapper";

import InputField from '../../components/AuthComponents/InputField';
import Button from '../../components/AuthComponents/Button';

const PasswordResetPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 8 characters long and contain both letters and numbers');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setErrorMessage('');
        setSuccessMessage('Your password has been reset successfully');

        setTimeout(() => {
            navigate('/welcome');
        }, 2000);

        // Uncomment this section to make an actual API request
        /*
        try {
            const response = await axios.post('https://api.example.com/reset-password', {
                password,
                token: 'secure-token-from-email'
            });

            if (response.status === 200) {
                setSuccessMessage('Your password has been reset successfully');
                setErrorMessage('');
                setTimeout(() => navigate('/welcome'), 2000);
            } else {
                setErrorMessage('There was an error resetting your password. Please try again.');
            }
        } catch (error) {
            setErrorMessage('There was an error processing your request. Please try again later.');
        }
        */
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <AuthFormWrapper title="Reset Password">
                <form onSubmit={handlePasswordReset} className="mt-32">
                    <div className="relative mb-8">
                        <InputField
                            labelText="New Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your new password"
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

                    <div className="relative mb-8">
                        <InputField
                            labelText="Confirm Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm your new password"
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

                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                    <Button type="submit" >
                        Reset Password
                    </Button>
                </form>
            </AuthFormWrapper>
        </div>
    );
};

export default PasswordResetPage;
