import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

const WalletPage = () => {
    const transactions = [
        // dummy data 
        { id: 1, type: 'Deposit', amount: 5000, date: '2024-11-01' },
        { id: 2, type: 'Withdrawal', amount: 3000, date: '2024-10-20' },
        { id: 3, type: 'Deposit', amount: 2000, date: '2024-10-15' },
        { id: 4, type: 'Loan Disbursement', amount: 15000, date: '2024-09-25' },
        { id: 5, type: 'Loan Repayment', amount: 7000, date: '2024-08-30' },
    ];

    const currentBalance = 10000;
    const totalDeposits = transactions
        .filter(tx => tx.type === 'Deposit')
        .reduce((total, tx) => total + tx.amount, 0);
    const totalWithdrawals = transactions
        .filter(tx => tx.type === 'Withdrawal')
        .reduce((total, tx) => total + tx.amount, 0);

    return (
        <div className="min-h-screen bg-custom-gradient p-6 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-navy-blue text-center mb-8">My Wallet</h1>

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                {/* Balance Card */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-center mb-4">Current Balance</h2>
                    <div className="text-4xl font-extrabold text-green-600 text-center mb-6">
                        KSH {currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="flex justify-between">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-700">Total Deposits</h3>
                            <p className="text-green-500 text-xl font-bold">
                                KSH {totalDeposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-700">Total Withdrawals</h3>
                            <p className="text-red-500 text-xl font-bold">
                                KSH {totalWithdrawals.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Transactions Card */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                    <div className="max-h-96 overflow-y-auto">
                        <ul className="space-y-4">
                            {transactions.map(transaction => (
                                <li
                                    key={transaction.id}
                                    className={`flex justify-between items-center p-4 rounded-lg bg-gray-50 border-l-4 ${transaction.type === 'Deposit' ? 'border-green-500' : 'border-red-500'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {transaction.type === 'Deposit' ? (
                                            <ArrowDown className="text-green-500" />
                                        ) : (
                                            <ArrowUp className="text-red-500" />
                                        )}
                                        <div>
                                            <p className="text-lg font-medium">{transaction.type}</p>
                                            <p className="text-sm text-gray-500">{transaction.date}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-bold">
                                        KSH {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="max-w-4xl mx-auto mt-8 flex justify-center gap-6">
                <button className="bg-navy-blue text-white py-3 px-6 rounded-lg shadow hover:bg-navy-blue-dark">
                    Deposit Funds
                </button>
                <button className="bg-navy-blue text-white py-3 px-6 rounded-lg shadow hover:bg-red-700">
                    Withdraw Funds
                </button>
            </div>
        </div>
    );
};

export default WalletPage;
