import React from 'react';

const OfferingCard = ({ offering }) => {
    const { title, description, amount, icon } = offering;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <div className="text-4xl">{icon}</div>
            <h3 className="text-lg font-semibold mt-2">{title}</h3>

            <span className="text-md font-semibold mt-2">KSH {amount.toFixed(2)}</span>

            {/* Learn More button */}
            <button className="mt-4 px-4 py-2 bg-sky-blue text-white rounded-lg hover:bg-sky-blue-dark">
                Learn More
            </button>
        </div>
    );
};

export default OfferingCard;
