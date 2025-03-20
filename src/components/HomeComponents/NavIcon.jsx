import React from 'react';

const NavIcon = ({ IconComponent, label }) => (
    <div className="flex flex-col items-center">
        <IconComponent className="h-6 w-6 mb-1" />
        <span className="text-xs">{label}</span>
    </div>
);

export default NavIcon;
