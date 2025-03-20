import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/HomeComponents/Header';

const DepositFundsPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        paymentMethod: '',
        walletAddress: '', // For stablecoin deposits
        stablecoinType: 'USDT'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmDeposit = async () => {
        setLoading(true);
        setShowConfirmation(false);
        // Add your deposit processing logic here
        setLoading(false);
        setMessage('Deposit initiated successfully!');
        setTimeout(() => navigate('/dashboard'), 2000);
    };

    return (
        <div className="p-6 bg-custom-gradient2 min-h-screen">
            <Header />
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-primary my-8">Deposit Funds</h1>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-primary text-dark-grey rounded hover:bg-primary-dark"
                    >
                        Back to Dashboard
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Deposit Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Deposit Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
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
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="mpesa">M-PESA</option>
                                        <option value="stablecoin">Stablecoin</option>
                                    </select>
                                </div>

                                {formData.paymentMethod === 'stablecoin' && (
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
                                                required={formData.paymentMethod === 'stablecoin'}
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
                                    {loading ? "Processing..." : "Proceed with Deposit"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Information Panel */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Payment Information</h2>
                        {formData.paymentMethod === 'mpesa' ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium text-lg mb-2">M-PESA Instructions</h3>
                                    <ol className="list-decimal pl-4 space-y-2">
                                        <li>Go to M-PESA on your phone</li>
                                        <li>Select "Pay Bill"</li>
                                        <li>Enter Business Number: <span className="font-medium">247247</span></li>
                                        <li>Enter Account Number: Your Phone Number</li>
                                        <li>Enter Amount: KES {formData.amount || '0'}</li>
                                        <li>Enter your M-PESA PIN</li>
                                        <li>Confirm the transaction</li>
                                    </ol>
                                </div>
                            </div>
                        ) : formData.paymentMethod === 'stablecoin' ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium text-lg mb-2">Stablecoin Deposit Instructions</h3>
                                    <ol className="list-decimal pl-4 space-y-2">
                                        <li>Select your preferred stablecoin</li>
                                        <li>Enter your wallet address</li>
                                        <li>Send the equivalent amount to our address:</li>
                                        <div className="bg-gray-100 p-2 rounded mt-2">
                                            <code className="text-sm break-all">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</code>
                                        </div>
                                        <li>Transaction will be confirmed after network validation</li>
                                    </ol>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-500 text-center py-8">
                                Select a payment method to view instructions
                            </div>
                        )}
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
                            <h3 className="text-xl font-semibold mb-4">Confirm Deposit</h3>
                            <p className="mb-4">
                                Are you sure you want to deposit KES {parseFloat(formData.amount).toLocaleString()}
                                via {formData.paymentMethod === 'mpesa' ? 'M-PESA' : formData.stablecoinType}?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeposit}
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

export default DepositFundsPage;