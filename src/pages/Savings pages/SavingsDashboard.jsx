import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';

const SavingsDashboard = () => {
    const [savingsData, setSavingsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dummy data remains the same
    const dummyData = {
        totalSavings: 145000,
        monthlyContribution: 15000,
        totalMembers: 234,
        growthRate: 12.5,
        recentTransactions: [
            { id: 1, date: '2024-03-01', amount: 5000, type: 'deposit', status: 'completed' },
            { id: 2, date: '2024-03-05', amount: 3000, type: 'withdrawal', status: 'pending' },
            { id: 3, date: '2024-03-10', amount: 7500, type: 'deposit', status: 'completed' },
        ],
        savingsTrend: [
            { month: 'Jan', amount: 100000 },
            { month: 'Feb', amount: 120000 },
            { month: 'Mar', amount: 145000 },
        ]
    };

    useEffect(() => {
        setTimeout(() => {
            setSavingsData(dummyData);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6 space-y-6 bg-custom-gradient">
            <h1 className="text-3xl font-bold text-gray-800">Savings Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 bg-white rounded-lg shadow">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Savings</p>
                            <h3 className="text-2xl font-bold">KES {savingsData.totalSavings.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>


                {/* Monthly Contribution Card */}
                <div className="p-6 bg-white rounded-lg shadow">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Monthly Contribution</p>
                            <h3 className="text-2xl font-bold">KES {savingsData.monthlyContribution.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>




                {/* Growth Rate Card */}
                <div className="p-6 bg-white rounded-lg shadow">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <TrendingUp className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Growth Rate</p>
                            <h3 className="text-2xl font-bold">{savingsData.growthRate}%</h3>
                        </div>
                    </div>
                </div>


                <div className="p-6 bg-custom-gradient2 rounded-lg shadow">
                    <button className="w-full py-3 mt-6 bg-navy-blue text-white rounded-lg shadow-md hover:bg-blue-600">
                        Add to Savings
                    </button>
                </div>
            </div>

            {/* Savings Trend Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Savings Trend</h2>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={savingsData.savingsTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                <div className="space-y-4">
                    {savingsData.recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium">{new Date(transaction.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500">Transaction ID: {transaction.id}</p>
                            </div>
                            <div>
                                <span className={`font-bold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                                    {transaction.type === 'deposit' ? '+' : '-'} KES {transaction.amount.toLocaleString()}
                                </span>
                                <span className={`ml-2 px-2 py-1 rounded text-sm ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {transaction.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SavingsDashboard;