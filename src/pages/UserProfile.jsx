import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userData, setUserData] = useState({
        personalInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            idNumber: ''
        },
        password: {
            current: '',
            new: '',
            confirm: ''
        }
    });

    // Dummy data - replace with API call
    const dummyData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+254712345678',
        idNumber: '12345678'
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // const response = await fetch('/api/auth/profile');
                // const data = await response.json();
                setTimeout(() => {
                    setUserData(prev => ({
                        ...prev,
                        personalInfo: dummyData
                    }));
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSave = () => {
        setSaving(true);
        // Simulate saving process
        setTimeout(() => {
            setSaving(false);
            alert('User data saved!');
        }, 1000);
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-6 text-navy-blue text-center">Personal Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            value={userData.personalInfo.firstName}
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                            }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            value={userData.personalInfo.lastName}
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                            }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            value={userData.personalInfo.email}
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, email: e.target.value }
                            }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            value={userData.personalInfo.phoneNumber}
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, phoneNumber: e.target.value }
                            }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ID Number</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            value={userData.personalInfo.idNumber}
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, idNumber: e.target.value }
                            }))}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-6 text-navy-blue text-center">Change Password</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            value={userData.password.current}
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                password: { ...prev.password, current: e.target.value }
                            }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            value={userData.password.new}
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                password: { ...prev.password, new: e.target.value }
                            }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            value={userData.password.confirm}
                            onChange={(e) => setUserData(prev => ({
                                ...prev,
                                password: { ...prev.password, confirm: e.target.value }
                            }))}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition-all duration-300"
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
