import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SavingsTracker = () => {
    const [savingsData, setSavingsData] = useState([]);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(3);
    const [visibleIndex, setVisibleIndex] = useState(3);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/savingsdashboard');
    };


    // Dummy data for testing
    const dummySavingsData = [
        { month: 'Jan', amount: 8000 },
        { month: 'Feb', amount: 2000 },
        { month: 'Mar', amount: 5000 },
        { month: 'Apr', amount: 2500 }, // Current month
        { month: 'May', amount: 100 },
        { month: 'Jun', amount: 100 },
    ]

    useEffect(() => {
        // Simulate fetching data from the backend
        const fetchSavingsData = async () => {
            try {

                // const response = await axios.get('https://your-backend.com/api/savings/monthly');
                // setSavingsData(response.data);

                // For now, use dummy data
                setSavingsData(dummySavingsData);
            } catch (error) {
                console.error("Error fetching savings data:", error);
            }
        };

        fetchSavingsData();
    }, []);

    //app to track current month
    const placeholderData = [
        { month: 'Jan', amount: 0 },
        { month: 'Feb', amount: 0 },
        { month: 'Mar', amount: 0 },
        { month: 'Apr', amount: 0 },
        { month: 'May', amount: 0 },
        { month: 'Jun', amount: 0 },
    ];

    const displayData = savingsData.length > 0 ? savingsData : placeholderData;

    const handleBarClick = (index) => {
        // Toggle visibility of the amount for the clicked month only
        setVisibleIndex((prevIndex) => (prevIndex === index ? -1 : index));
    };

    return (
        <div className="w-full  p-4 bg-custom-gradient2 shadow-lg rounded-md max-sm:mt-12" onClick={handleClick}>
            <h2 className="text-lg font-semibold mb-4">Savings Tracker</h2>
            <div className="flex justify-between items-end h-48">
                {displayData.map((monthData, index) => (
                    <div key={index} className="flex flex-col items-center">
                        {/* Show amount only for the visible month index */}
                        {visibleIndex === index && (
                            <span className="text-sm font-medium mb-1">
                                KSH {monthData.amount.toFixed(2)}
                            </span>
                        )}
                        <div
                            onClick={() => handleBarClick(index)}
                            style={{ height: `${savingsData.length > 0 ? monthData.amount / 100 : 10}px` }}
                            className={`w-8 cursor-pointer rounded-t-md ${index === currentMonthIndex ? 'bg-sp-green' : 'bg-gray-300'}
                                        ${visibleIndex === index && 'bg-teal-500'}`}
                        ></div>
                        <span className="text-xs mt-2">{monthData.month}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavingsTracker;
