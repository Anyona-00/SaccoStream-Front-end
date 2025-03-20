import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfilePhoto from '../../Assets/Homepage/Profilephoto1.svg'; // Assuming this is the default profile photo

import HomeButton from '../HomeComponents/HomeButton';

const GuarantorList = () => {
    const [guarantors, setGuarantors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching data by setting dummy data
        const fetchGuarantors = async () => {
            try {
                // Uncomment the following line to fetch actual data
                // const response = await axios.get('https://your-backend.com/api/guarantors/recent?limit=5');
                // setGuarantors(response.data);

                // Dummy data for testing with existing guarantors
                const dummyGuarantors = [
                    { id: 1, name: "John Doe", amount: 5000, status: "Active" },
                    { id: 2, name: "Jane Smith", amount: 8000, status: "Inactive" },
                    { id: 3, name: "Michael Johnson", amount: 12000, status: "Active" },
                    { id: 4, name: "Sarah Lee", amount: 4000, status: "Inactive" },
                    { id: 5, name: "David Brown", amount: 10000, status: "Active" },
                ];
                setGuarantors(dummyGuarantors);
            } catch (error) {
                console.error("Error fetching guarantors:", error);
            }
        };

        fetchGuarantors();
    }, []);

    // Placeholder data in case there are no guarantors
    const placeholderData = Array(5).fill({
        name: "Guarantor Name",
        amount: 0,
        status: "Status",
    });

    const displayData = guarantors.length > 0 ? guarantors : placeholderData;

    const getStatusBadgeColor = (status) => {
        return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"; // Green for Active, Red for Inactive
    };

    return (
        <div className="w-full max-sm:mt-24 max-sm:mx-auto p-4 bg-white shadow-lg rounded-md sm:-mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Guarantors List</h2>
                <button
                    onClick={() => navigate('/guarantordashboard')}
                    className="text-white text-sm font-semibold bg-navy-blue p-1 rounded-lg hover:underline"
                >
                    View All
                </button>
            </div>

            {/* Display the five guarantors or placeholder if no guarantors */}
            <div className="space-y-4">
                {displayData.map((guarantor, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2"
                    >
                        <img
                            src={ProfilePhoto}
                            alt="Profile Icon"
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="text-sm font-medium">{guarantor.name}</span>
                        <span className="text-sm font-semibold">
                            KSH {guarantor.amount.toFixed(2)}
                        </span>
                        <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full w-20 text-center ${getStatusBadgeColor(
                                guarantor.status
                            )}`}
                        >
                            {guarantor.status}
                        </span>
                    </div>
                ))}
            </div>


            <div className="mt-6 space-x-4 flex justify-around">

                <HomeButton
                    bgColorClass="bg-Transparent"
                    textColorClass="text-navy-blue"
                    buttonText="New Guarantor"
                    onClick={() => navigate('/comingsoon')}
                />

                <HomeButton
                    bgColorClass="bg-warning-orange"
                    textColorClass="text-navy-blue"
                    buttonText="Revoke Guarantee"
                    onClick={() => navigate('/comingsoon')}
                />

            </div>
        </div>
    );
};

export default GuarantorList;
