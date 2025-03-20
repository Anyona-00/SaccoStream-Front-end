
import React from 'react';

const Button = ({ children, onClick, type = "button", ...props }) => (
    <button
        type={type}
        className="w-full p-2 bg-navy-blue text-white font-bold rounded-2xl hover:bg-sky-blue"
        onClick={onClick}
        {...props}
    >
        {children}
    </button>
);

export default Button;
