import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../../components/HomeComponents/Header';

const ApplyLoan = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        duration: "",
        description: "",
        repaymentPlan: "Monthly",
        purpose: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "/api/loans",
                formData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setMessage("Loan application successful!");
            setTimeout(() => navigate('/loansdashboard'), 2000);
        } catch (error) {
            console.error("Error applying for loan:", error);
            setMessage("Loan application failed. Please try again.");
        }
        setLoading(false);
    };

    // Calculate estimated repayment details
    const calculateRepayment = () => {
        const amount = parseFloat(formData.amount) || 0;
        const duration = parseInt(formData.duration) || 1;
        const interestRate = 0.15; // 15% interest rate

        const totalInterest = amount * interestRate;
        const totalRepayable = amount + totalInterest;
        const monthlyPayment = totalRepayable / duration;

        return {
            totalRepayable: totalRepayable.toFixed(2),
            monthlyPayment: monthlyPayment.toFixed(2),
            interestRate: "15%"
        };
    };

    const repaymentDetails = calculateRepayment();

    return (
        <div className="p-6 bg-custom-gradient2 min-h-screen">
            <Header />
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-primary my-8">Apply for Loan</h1>
                    <button
                        onClick={() => navigate('/loansdashboard')}
                        className="px-4 py-2 bg-primary text-dark-grey rounded hover:bg-primary-dark"
                    >
                        Back to Loans Dashboard
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Loan Details Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-primary">Loan Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Loan Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
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
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Duration (months)</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Repayment Plan</label>
                                    <select
                                        name="repaymentPlan"
                                        value={formData.repaymentPlan}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    >
                                        <option value="Monthly">Monthly</option>
                                        <option value="Weekly">Weekly</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Repayment Preview Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-primary">Repayment Preview</h2>
                            <div className="space-y-3">
                                <p className="flex justify-between text-gray-700 py-2 border-b">
                                    <span className="font-medium">Interest Rate:</span>
                                    <span>{repaymentDetails.interestRate}</span>
                                </p>
                                <p className="flex justify-between text-gray-700 py-2 border-b">
                                    <span className="font-medium">Total Repayable:</span>
                                    <span>KES {parseFloat(repaymentDetails.totalRepayable).toLocaleString()}</span>
                                </p>
                                <p className="flex justify-between text-gray-700 py-2 border-b">
                                    <span className="font-medium">Monthly Payment:</span>
                                    <span>KES {parseFloat(repaymentDetails.monthlyPayment).toLocaleString()}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Purpose and Description Section */}
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Loan Purpose & Description</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Purpose</label>
                                <input
                                    type="text"
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2 h-32"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`w-full  bg-navy-blue  text-white py-3 rounded-lg text-lg font-semibold ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"}`}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Loan Application"}
                        </button>
                        {message && (
                            <p className={`mt-4 text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyLoan;