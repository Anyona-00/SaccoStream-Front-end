import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../../components/HomeComponents/Header';

const LoanDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loan, setLoan] = useState(null);

    // Dummy data for testing (replace with your API call)
    const dummyLoan = {
        id: 1,
        name: "Emergency Medical Loan",
        amount: 50000,
        status: "active",
        description: "Loan for medical procedures",
        dateIssued: "2024-01-15",
        dueDate: "2024-07-15",
        duration: 6,
        repaymentPlan: "Monthly",
        interestRate: "15%",
        totalRepayable: 57500,
        monthlyPayment: 9583,
        nextPaymentDate: "2024-04-15",
        remainingBalance: 38332
    };

    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setLoan(dummyLoan);
        }, 1000);

        // Original API call 
        /*
        const fetchLoanDetails = async () => {
            try {
                const response = await axios.get(`/api/loans/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setLoan(response.data);
            } catch (error) {
                console.error("Error fetching loan details:", error);
            }
        };
        fetchLoanDetails();
        */
    }, [id]);

    const isPastDue = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        return due < today;
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
                    <h1 className="text-3xl font-bold text-primary my-8">{loan.name}</h1>
                    <button
                        onClick={() => navigate('/loansdashboard')}
                        className="px-4 py-2 bg-primary text-dark-grey rounded hover:bg-primary-dark"
                    >
                        Back to Loans Dashboard
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Loan Overview</h2>
                        <div className="space-y-3">
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Loan Amount:</span>
                                <span>KES {loan.amount.toLocaleString()}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Status:</span>
                                <span className={`${loan.status === "active" ? "text-green-600" : "text-red-600"} font-medium`}>
                                    {loan.status.toUpperCase()}
                                </span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Issue Date:</span>
                                <span>{formatDate(loan.dateIssued)}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Due Date:</span>
                                <span className={isPastDue(loan.dueDate) ? 'text-red-600' : 'text-green-600'}>
                                    {formatDate(loan.dueDate)}
                                </span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Duration:</span>
                                <span>{loan.duration} months</span>
                            </p>
                        </div>
                    </div>


                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Payment Details</h2>
                        <div className="space-y-3">
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Repayment Plan:</span>
                                <span>{loan.repaymentPlan}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Interest Rate:</span>
                                <span>{loan.interestRate}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Total Repayable:</span>
                                <span>KES {loan.totalRepayable.toLocaleString()}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Monthly Payment:</span>
                                <span>KES {loan.monthlyPayment.toLocaleString()}</span>
                            </p>
                            <p className="flex justify-between text-gray-700 py-2 border-b">
                                <span className="font-medium">Next Payment:</span>
                                <span>{formatDate(loan.nextPaymentDate)}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-primary">Loan Description</h2>
                    <p className="text-gray-700">{loan.description}</p>
                </div>
            </div>
        </div>
    );
};

export default LoanDetails;