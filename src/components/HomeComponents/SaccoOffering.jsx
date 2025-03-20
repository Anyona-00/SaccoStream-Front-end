import React from 'react';
import OfferingCard from './OfferingCard'; // Import OfferingCard component
import HomeButton from '../HomeComponents/HomeButton'; // Reusing HomeButton component for the "Explore More" button

const SaccoOffering = () => {
    // Dummy data for the offerings
    const offerings = [
        { id: 1, title: "30 day Loan", amount: 50000, icon: "💵" },
        { id: 2, title: "Hepa Okoa", amount: 20000, icon: "💰" },
        { id: 3, title: "Mulika Mwizi", amount: 15000, icon: "📈" },
        { id: 4, title: "Wiu Wiu", amount: 10000, icon: "🚑" }
    ];

    return (
        <div className="w-full  mx-auto p-4 sm:pb-1 bg-white shadow-lg rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {offerings.map((offering) => (
                    <OfferingCard key={offering.id} offering={offering} />
                ))}
            </div>

            <div className="flex justify-between items-center mb-4 lg:mb-0 sm:mt-6">
                <h2 className="text-lg font-semibold">Sacco Offerings</h2>

                <HomeButton
                    bgColorClass="bg-navy-blue"
                    textColorClass="text-white"
                    buttonText="Explore More"
                    onClick={() => navigate('/comingsoon')}
                />
            </div>


        </div>
    );
};

export default SaccoOffering;
