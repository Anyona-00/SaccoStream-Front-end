import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanCard = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  // Dummy data for testing with existing loans
  const dummyLoans = [
    {
      id: 1,
      name: "Personal Loan",
      status: "active",
      amount: 2500,
    },
    {
      id: 2,
      name: "Business Loan",
      status: "overdue",
      amount: 5000,
    },
    {
      id: 3,
      name: "Subaru Loan",
      status: "active",
      amount: 1000,
    },
  ];

  useEffect(() => {
    // Simulate fetching data by setting dummy data
    setLoans(dummyLoans);
  }, []);

  const getStatusBadgeColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-warning-orange text-orange-700';
  };

  return (
    <div className="w-full max-sm:mt-24 max-sm:h-1/4 max-sm:mx-auto p-4 bg-custom-gradient shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold">Current Loans</h2>
        <button
          onClick={() => navigate('/loansdashboard')}
          className="text-white text-sm font-semibold bg-navy-blue px-3 py-1 rounded-lg hover:underline"
        >
          View All
        </button>
      </div>


      <div className="space-y-4">
        {loans.length > 0 ? (
          loans.map((loan, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <span className="text-sm font-medium">{loan.name}</span>
              <span
                className={`flex items-center justify-center px-2 py-1 text-xs font-semibold w-20 h-8 rounded ${getStatusBadgeColor(
                  loan.status
                )}`}
              >
                {loan.status}
              </span>
              <span className="text-sm font-semibold">
                KSH {loan.amount.toFixed(2)}
              </span>
            </div>
          ))
        ) : (

          Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2 text-gray-400"
              >
                <div className="h-8 w-8 rounded-full border border-gray-300 bg-gray-100"></div>
                <span className="text-sm font-medium">Loan Name</span>
                <span className="flex items-center justify-center w-20 h-8 text-xs font-semibold bg-gray-200 rounded">
                  Status
                </span>
                <span className="text-sm font-semibold">KSH 0.00</span>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default LoanCard;
