import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../../components/HomeComponents/Header';

const RepayLoan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loan, setLoan] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('mpesa');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Dummy data for testing (replace with your API call)
    const dummyLoan = {
        id: 1,
        name: "Emergency Medical Loan",
        remainingBalance: 38332,
        monthlyPayment: 9583,
        nextPaymentDate: "2024-04-15",
        status: "active",
        paymentHistory: [
            { date: "2024-03-15", amount: 9583, method: "mpesa", status: "completed" },
            { date: "2024-02-15", amount: 9583, method: "mpesa", status: "completed" }
        ]
    };

    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setLoan(dummyLoan);
            setPaymentAmount(dummyLoan.monthlyPayment.toString());
        }, 1000);

        // Original API call
        /*
        const fetchLoanDetails = async () => {
            try {
                const response = await axios.get(`/api/loans/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setLoan(response.data);
                setPaymentAmount(response.data.monthlyPayment.toString());
            } catch (error) {
                console.error("Error fetching loan details:", error);
                setMessage("Error loading loan details");
            }
        };
        fetchLoanDetails();
        */
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmPayment = async () => {
        setLoading(true);
        setShowConfirmation(false);

        try {
            const response = await axios.post(
                `/api/loans/${id}/repayment`,
                {
                    amount: parseFloat(paymentAmount),
                    method: paymentMethod
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setMessage("Payment successful!");
            setTimeout(() => navigate('/loansdashboard'), 2000);
        } catch (error) {
            console.error("Error making payment:", error);
            setMessage("Payment failed. Please try again.");
        }
        setLoading(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!loan) {
        return <div className="flex justify-center items-center h-screen text-dark-grey text-2xl">Loading...</div>;
    }

    return (
        <div className="p-6 bg-custom-gradient2 min-h-screen">
            <Header />
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-primary my-8">Repay Loan</h1>
                    <button
                        onClick={() => navigate('/loansdashboard')}
                        className="px-4 py-2 bg-primary text-dark-grey rounded hover:bg-primary-dark"
                    >
                        Back to Loans Dashboard
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Loan Overview */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Loan Overview</h2>
                        <div className="space-y-3">
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Loan Name:</span>
                                <span>{loan.name}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Remaining Balance:</span>
                                <span>KES {loan.remainingBalance.toLocaleString()}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Monthly Payment:</span>
                                <span>KES {loan.monthlyPayment.toLocaleString()}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Next Payment Date:</span>
                                <span>{formatDate(loan.nextPaymentDate)}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Status:</span>
                                <span className={`${loan.status === "active" ? "text-green-600" : "text-red-600"} font-medium`}>
                                    {loan.status.toUpperCase()}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md ">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Make Payment</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4 ">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Payment Amount (KES)</label>
                                    <input
                                        type="number"
                                        value={paymentAmount}
                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                        min="1"
                                        max={loan.remainingBalance}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    >
                                        <option value="mpesa">M-PESA</option>
                                        <option value="bank">Stable Coins</option>
                                        <option value="cash">Cash</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className={`w-1/2 mx-20 bg-navy-blue  text-white py-3 rounded-lg text-lg font-semibold mt-6 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Make Payment"}
                                </button>
                                {message && (
                                    <p className={`mt-4 text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {message}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Payment History */}
                    <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Payment History</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left">Date</th>
                                        <th className="px-4 py-2 text-left">Amount</th>
                                        <th className="px-4 py-2 text-left">Method</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loan.paymentHistory.map((payment, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="px-4 py-2">{formatDate(payment.date)}</td>
                                            <td className="px-4 py-2">KES {payment.amount.toLocaleString()}</td>
                                            <td className="px-4 py-2 capitalize">{payment.method}</td>
                                            <td className="px-4 py-2 capitalize">
                                                <span className={`px-2 py-1 rounded-full text-sm ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h3 className="text-xl text-dark-grey font-semibold mb-4">Confirm Payment</h3>
                            <p className="mb-4">Are you sure you want to make a payment of KES {parseFloat(paymentAmount).toLocaleString()} via {paymentMethod.toUpperCase()}?</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="px-4 py-2  bg-navy-blue  text-white rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmPayment}
                                    className="px-4 py-2  bg-navy-blue  text-white rounded hover:bg-primary-dark"
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

export default RepayLoan;