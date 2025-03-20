import React from 'react'
import Header from '../../components/HomeComponents/Header'
import AccountSummary from '../../components/HomeComponents/AccountSummary'
import NavColumn from '../../components/HomeComponents/NavColumn'
import LoanCard from '../../components/HomeComponents/LoanCard'
import SavingsTracker from '../../components/HomeComponents/SavingsTracker'
import GuarantorList from '../../components/HomeComponents/GuarantorList'
import SaccoOffering from '../../components/HomeComponents/SaccoOffering'

const Homepage = () => {
    return (
        <div className=" bg-light-grey sm:bg-custom-gradient flex flex-col gap-16  ">
            <Header />
            <NavColumn />
            <AccountSummary />
            <div className="sm:flex sm:w-4/5 lg:w-4/5 sm:mx-auto ">

                <div className="sm:w-2/3 sm:flex sm:flex-col">
                    <div className="sm:flex sm:flex-row gap-4 mb-16">
                        <LoanCard />
                        <SavingsTracker />
                    </div>
                    <SaccoOffering />
                </div>


                <div className="sm:w-1/3 p-4">
                    <GuarantorList />
                </div>
            </div>

        </div>
    )
}

export default Homepage