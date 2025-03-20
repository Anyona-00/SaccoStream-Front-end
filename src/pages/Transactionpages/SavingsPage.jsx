// SavingsPage.jsx
import React from 'react';

const SavingsPage = () => {
    const contributions = [
        { id: 1, amount: 2000, date: '2024-11-02' },
        { id: 2, amount: 1000, date: '2024-10-22' },
        { id: 3, amount: 1500, date: '2024-10-12' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center bg-light-grey p-4">
            <h1 className="text-3xl font-semibold mb-6">My Savings</h1>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <div className="text-xl font-bold text-center mb-4">Savings Balance</div>
                <div className="text-3xl font-semibold text-dark-grey text-center mb-6">KSH 5,000.00</div>

                <h2 className="text-lg font-semibold mb-4">Recent Contributions</h2>
                <ul className="space-y-3">
                    {contributions.map(contribution => (
                        <li key={contribution.id} className="flex justify-between items-center border-b pb-2">
                            <span>Contribution</span>
                            <span className="font-semibold">KSH {contribution.amount}</span>
                            <span className="text-sm text-gray-500">{contribution.date}</span>
                        </li>
                    ))}
                </ul>

                <button className="w-full py-3 mt-6 bg-navy-blue text-white rounded-lg shadow-md hover:bg-blue-600">
                    Add to Savings
                </button>
            </div>
        </div>
    );
};

export default SavingsPage;
