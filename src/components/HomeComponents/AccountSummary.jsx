import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeButton from './HomeButton';

const AccountSummary = () => {
    const [summaryData, setSummaryData] = useState({
        totalSavings: '0.00',
        loanBalance: '0.00',
        walletBalance: '0.00',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccountSummary = async () => {
            try {
                const response = await axios.get('/api/user/account-summary');
                if (response.data.success) {
                    setSummaryData({
                        totalSavings: response.data.data.totalSavings,
                        loanBalance: response.data.data.loanBalance,
                        walletBalance: response.data.data.walletBalance,
                    });
                }
            } catch (error) {
                console.error('Error fetching account summary:', error);
            }
        };
        fetchAccountSummary();
    }, []);

    return (
        <div className="bg-transparent p-6 sm:shadow-md sm:bg-custom-gradient2 rounded-md w-full lg:w-4/5 mx-auto flex flex-col gap-10">
            <h2 className="text-2xl font-bold mb-4">Account Summary</h2>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                    <div>
                        <h3 className="text-gray-500">Total Savings</h3>
                        <p className="text-xl font-semibold">KSH {summaryData.totalSavings}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Loan Balance</h3>
                        <p className="text-xl font-semibold">KSH {summaryData.loanBalance}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Balance in Wallet</h3>
                        <p className="text-xl font-semibold">KSH {summaryData.walletBalance}</p>
                    </div>
                </div>


                <div className="flex flex-col  sm:items-center max-sm:gap-8 max-sm:mt-16  lg:w-1/3 gap-4 lg:gap-6 lg:mt-0">
                    <div className="flex gap-4">
                        <HomeButton
                            bgColorClass="bg-transparent"
                            textColorClass="text-navy-blue"
                            buttonText="Withdraw Funds"
                            onClick={() => navigate('/withdraw')}
                        />
                        <HomeButton
                            bgColorClass="bg-transparent"
                            textColorClass="text-navy-blue"
                            buttonText="Transfer Funds"
                            onClick={() => navigate('/comingsoon')}
                        />
                    </div>

                    <HomeButton
                        bgColorClass="bg-navy-blue"
                        textColorClass="text-white"
                        buttonText="Deposit Funds"
                        onClick={() => navigate('/deposit')}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountSummary;
