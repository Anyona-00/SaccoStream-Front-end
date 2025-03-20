import React from 'react';

const InputField = ({ labelText, type, placeholder, children, ...props }) => (
    <div className="flex flex-col w-full">
        {labelText && (
            <label className="mb-1 text-sm font-medium text-dark-grey">
                {labelText}
            </label>
        )}
        <input
            type={type}
            placeholder={placeholder}
            className="w-full p-2 border  bg-light-grey rounded-2xl focus:outline-none focus:border-teal-green"
            {...props}
        />
        {children}
    </div>
);

export default InputField;
