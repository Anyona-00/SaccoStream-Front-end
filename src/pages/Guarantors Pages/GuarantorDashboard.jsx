import React, { useState, useEffect } from 'react';
import { Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfilePhoto from '../../Assets/Homepage/Profilephoto1.svg'; // Assuming this is the default profile photo

const GuarantorDashboard = () => {
    const navigate = useNavigate();
    const [guarantorData, setGuarantorData] = useState(null);
    const [guarantors, setGuarantors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dummy data - replace with API call
    const dummyData = {
        summary: {
            totalGuarantees: 8,
            pendingRequests: 3,
            activeGuarantees: 4,
            completedGuarantees: 1
        },
        recentRequests: [
            {
                id: 1,
                borrower: "Jane Smith",
                loanAmount: 50000,
                requestDate: "2024-03-01",
                status: "pending",
                guaranteeAmount: 15000
            },
            {
                id: 2,
                borrower: "John Doe",
                loanAmount: 75000,
                requestDate: "2024-02-28",
                status: "active",
                guaranteeAmount: 25000
            }
        ]
    };

    useEffect(() => {
        const fetchGuarantorData = async () => {
            try {
                // Simulated API call
                setTimeout(() => {
                    setGuarantorData(dummyData);
                    setLoading(false);
                }, 1000);

                // Simulate fetching recent guarantors data
                const dummyGuarantors = [
                    { id: 1, name: "John Doe", amount: 5000, status: "Active" },
                    { id: 2, name: "Jane Smith", amount: 8000, status: "Inactive" },
                    { id: 3, name: "Michael Johnson", amount: 12000, status: "Active" },
                    { id: 4, name: "Sarah Lee", amount: 4000, status: "Inactive" },
                    { id: 5, name: "David Brown", amount: 10000, status: "Active" },
                ];
                setGuarantors(dummyGuarantors);
            } catch (error) {
                console.error('Error fetching guarantor data:', error);
                setLoading(false);
            }
        };

        fetchGuarantorData();
    }, []);

    const getStatusBadgeColor = (status) => {
        return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="p-6 space-y-6 bg-custom-gradient">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-dark-grey">Guarantor Dashboard</h1>

            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Guarantees</p>
                            <h3 className="text-2xl font-bold">{guarantorData.summary.totalGuarantees}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white shadow-md rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Requests</p>
                            <h3 className="text-2xl font-bold">{guarantorData.summary.pendingRequests}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white shadow-md rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Guarantees</p>
                            <h3 className="text-2xl font-bold">{guarantorData.summary.activeGuarantees}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white shadow-md rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <AlertCircle className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Completed</p>
                            <h3 className="text-2xl font-bold">{guarantorData.summary.completedGuarantees}</h3>
                        </div>
                    </div>
                </div>
            </div>



            {/* Guarantors List */}
            <div className="p-6 bg-white shadow-md rounded-lg">

                <h1 className="text-3xl font-bold text-dark-grey mb-8">Guarantors List</h1>

                <div className="space-y-4">
                    {guarantors.map((guarantor, index) => (
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
                    <button
                        className="bg-transparent text-navy-blue px-4 py-2 rounded-md border border-navy-blue"
                        onClick={() => navigate('/comingsoon')}
                    >
                        New Guarantor
                    </button>
                    <button
                        className="bg-warning-orange text-navy-blue px-4 py-2 rounded-md"
                        onClick={() => navigate('/comingsoon')}
                    >
                        Revoke Guarantee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuarantorDashboard