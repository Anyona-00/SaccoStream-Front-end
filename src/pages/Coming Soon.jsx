import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComingSoonPage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/homepage');
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-light-grey text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Coming Soon</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
                We're working hard to bring you this feature. Stay tuned!
            </p>
            <div className="mt-8">
                <button
                    onClick={handleNavigate}
                    className="px-6 py-3 bg-navy-blue text-white rounded-lg shadow-md hover:bg-blue-600"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ComingSoonPage;