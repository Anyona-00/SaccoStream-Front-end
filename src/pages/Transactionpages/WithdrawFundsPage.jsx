import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/HomeComponents/Header';

const WithdrawFundsPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        withdrawalMethod: '',
        phoneNumber: '',
        walletAddress: '',
        stablecoinType: 'USDT'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Dummy account balance - replace with actual data
    const accountBalance = 50000;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseFloat(formData.amount) > accountBalance) {
            setMessage('Insufficient balance');
            return;
        }
        setShowConfirmation(true);
    };

    const confirmWithdrawal = async () => {
        setLoading(true);
        setShowConfirmation(false);
        // Add your withdrawal processing logic here
        setLoading(false);
        setMessage('Withdrawal initiated successfully!');
        setTimeout(() => navigate('/dashboard'), 2000);
    };

    return (
        <div className="p-6 bg-custom-gradient2 min-h-screen">
            <Header />
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-primary my-8">Withdraw Funds</h1>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-primary text-dark-grey rounded hover:bg-primary-dark"
                    >
                        Back to Dashboard
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Withdrawal Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Withdrawal Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Available Balance</label>
                                    <div className="w-full border rounded px-3 py-2 bg-gray-50">
                                        KES {accountBalance.toLocaleString()}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Amount (KES)</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                        min="1"
                                        max={accountBalance}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Withdrawal Method</label>
                                    <select
                                        name="withdrawalMethod"
                                        value={formData.withdrawalMethod}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    >
                                        <option value="">Select Withdrawal Method</option>
                                        <option value="mpesa">M-PESA</option>
                                        <option value="stablecoin">Stablecoin</option>
                                    </select>
                                </div>

                                {formData.withdrawalMethod === 'mpesa' && (
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">M-PESA Number</label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2"
                                            placeholder="254700000000"
                                            required={formData.withdrawalMethod === 'mpesa'}
                                        />
                                    </div>
                                )}

                                {formData.withdrawalMethod === 'stablecoin' && (
                                    <>
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Stablecoin Type</label>
                                            <select
                                                name="stablecoinType"
                                                value={formData.stablecoinType}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                                required
                                            >
                                                <option value="USDT">USDT</option>
                                                <option value="USDC">USDC</option>
                                                <option value="DAI">DAI</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Wallet Address</label>
                                            <input
                                                type="text"
                                                name="walletAddress"
                                                value={formData.walletAddress}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                                placeholder="Enter your wallet address"
                                                required={formData.withdrawalMethod === 'stablecoin'}
                                            />
                                        </div>
                                    </>
                                )}

                                <button
                                    type="submit"
                                    className={`w-full bg-navy-blue text-white py-3 rounded-lg text-lg font-semibold mt-6 
                                    ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"}`}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Request Withdrawal"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Information and Fees Panel */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Withdrawal Information</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-lg mb-2">Transaction Fees</h3>
                                {formData.withdrawalMethod === 'mpesa' ? (
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span>M-PESA Withdrawal Fee:</span>
                                            <span className="font-medium">KES 30.00</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span>Processing Time:</span>
                                            <span className="font-medium">Instant</span>
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Note: Standard M-PESA transaction limits apply.
                                        </p>
                                    </div>
                                ) : formData.withdrawalMethod === 'stablecoin' ? (
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span>Network Fee:</span>
                                            <span className="font-medium">Variable (Gas fees apply)</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span>Processing Time:</span>
                                            <span className="font-medium">10-30 minutes</span>
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Note: Network congestion may affect processing time and fees.
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center">
                                        Select a withdrawal method to view fees
                                    </p>
                                )}
                            </div>

                            {/* Recent Withdrawals */}
                            <div className="mt-6">
                                <h3 className="font-medium text-lg mb-2">Recent Withdrawals</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-2 text-left">Date</th>
                                                <th className="px-4 py-2 text-left">Amount</th>
                                                <th className="px-4 py-2 text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-t">
                                                <td className="px-4 py-2">2024-03-15</td>
                                                <td className="px-4 py-2">KES 5,000</td>
                                                <td className="px-4 py-2">
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                        Completed
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="border-t">
                                                <td className="px-4 py-2">2024-03-10</td>
                                                <td className="px-4 py-2">KES 10,000</td>
                                                <td className="px-4 py-2">
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                        Completed
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className={`mt-4 p-4 rounded-lg text-center ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {message}
                    </div>
                )}

                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h3 className="text-xl font-semibold mb-4">Confirm Withdrawal</h3>
                            <div className="space-y-3">
                                <p className="flex justify-between border-b pb-2">
                                    <span>Amount:</span>
                                    <span className="font-medium">KES {parseFloat(formData.amount).toLocaleString()}</span>
                                </p>
                                <p className="flex justify-between border-b pb-2">
                                    <span>Method:</span>
                                    <span className="font-medium">
                                        {formData.withdrawalMethod === 'mpesa' ? 'M-PESA' : formData.stablecoinType}
                                    </span>
                                </p>
                                <p className="flex justify-between border-b pb-2">
                                    <span>Destination:</span>
                                    <span className="font-medium">
                                        {formData.withdrawalMethod === 'mpesa'
                                            ? formData.phoneNumber
                                            : `${formData.walletAddress.substring(0, 6)}...${formData.walletAddress.substring(38)}`}
                                    </span>
                                </p>
                                <p className="flex justify-between border-b pb-2">
                                    <span>Fee:</span>
                                    <span className="font-medium">
                                        {formData.withdrawalMethod === 'mpesa' ? 'KES 30.00' : 'Variable (Gas fees apply)'}
                                    </span>
                                </p>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmWithdrawal}
                                    className="px-4 py-2 bg-navy-blue text-white rounded hover:bg-primary-dark"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WithdrawFundsPage;