import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const { width, height } = useWindowSize();
    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {
            navigate('/homepage');
        }, 5000);


        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-sp-green">
            <Confetti width={width} height={height} />
            <div className="text-center">
                <h1 className="text-5xl font-bold text-blue-800 mb-6">
                    Welcome, Anyona!
                </h1>
                <p className="text-xl text-gray-700">
                    We're glad to have you here. Enjoy your journey!
                </p>
            </div>
        </div>
    );
};

export default WelcomePage;
