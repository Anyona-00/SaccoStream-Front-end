import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from '../../components/HomeComponents/Header';

const LoansDashboard = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const dummyLoans = [
        {
            id: 1,
            name: "Emergency Medical Loan",
            amount: 50000,
            status: "active",
            description: "Loan for medical procedures",
            dateIssued: "2024-01-15",
            dueDate: "2025-07-15",
        },
        {
            id: 2,
            name: "Hospital Bill Payment",
            amount: 75000,
            status: "pending",
            description: "Coverage for hospital stay",
            dateIssued: "2024-02-01",
            dueDate: "2024-08-01"
        },
        {
            id: 3,
            name: "Dental Procedure Loan",
            amount: 25000,
            status: "active",
            description: "Dental surgery coverage",
            dateIssued: "2024-03-10",
            dueDate: "2024-12-10"
        },
        {
            id: 4,
            name: "Maternity Care Loan",
            amount: 100000,
            status: "active",
            description: "Maternity and delivery expenses",
            dateIssued: "2024-02-20",
            dueDate: "2024-12-20"
        },
        {
            id: 5,
            name: "Chronic Care Loan",
            amount: 150000,
            status: "pending",
            description: "Long-term treatment support",
            dateIssued: "2024-01-30",
            dueDate: "2024-07-30"
        }
    ];

    const isPastDue = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        return due < today;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setLoans(dummyLoans);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-dark-grey text-2xl">Loading...</div>;
    }

    return (
        <div className="p-6 bg-custom-gradient2 min-h-screen">
            <Header />
            <div className="flex justify-between items-center my-8">
                <h1 className="text-2xl font-bold text-primary">Loans Dashboard</h1>
                <div className="space-x-4 m-4">
                    <button
                        onClick={() => navigate('/requestloan')}
                        className="bg-navy-blue text-white px-4 py-2 rounded shadow-md hover:bg-primary-dark"
                    >
                        Request Loan
                    </button>
                    <button
                        onClick={() => navigate('/repayloan')}
                        className="bg-navy-blue text-white px-4 py-2 rounded shadow-md hover:bg-secondary-dark"
                    >
                        Repay Loan
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {loans.map((loan) => (
                    <div
                        key={loan.id}
                        className="p-4 bg-white shadow-md rounded-lg border-l-4"
                        style={{
                            borderColor: loan.status === "active" ? "#4CAF50" : "#FF5252",
                        }}
                    >
                        <h2 className="text-lg font-semibold">{loan.name}</h2>
                        <p className="text-gray-600">Amount: KES {loan.amount}</p>
                        <p
                            className={`mt-2 font-medium text-sm ${loan.status === "active" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {loan.status.toUpperCase()}
                        </p>
                        <p
                            className={`mt-2 text-sm ${isPastDue(loan.dueDate) ? "text-red-600" : "text-green-600"
                                }`}
                        >
                            Due Date: {formatDate(loan.dueDate)}
                        </p>
                        <Link
                            to={`/loandetails`}
                            className="mt-4 inline-block bg-primary text-dark-grey px-4 py-2 rounded hover:bg-primary-dark"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoansDashboard;
