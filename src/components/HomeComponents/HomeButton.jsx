import React from 'react';
import PropTypes from 'prop-types';

const HomeButton = ({ bgColorClass, textColorClass, buttonText, onClick, ...props }) => {
    return (
        <button
            className={`px-4 py-2 rounded-xl border-2 border-navy-blue font-semibold w-full  sm:w-auto ${bgColorClass} ${textColorClass}`}
            onClick={onClick}
            {...props}
        >
            {buttonText}
        </button>
    );
};

HomeButton.propTypes = {
    bgColorClass: PropTypes.string.isRequired,
    textColorClass: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default HomeButton;
