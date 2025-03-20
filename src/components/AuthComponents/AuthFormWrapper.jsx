import React from 'react';
import Logo from '../../Assets/logo.svg';
import AuthImage from '../../Assets/Authentication/bigscreenimage.svg'

const AuthFormWrapper = ({ title, children }) => {
    return (
        <div className="w-full sm:h-3/4 sm:w-3/4 sm:p-8 sm:flex sm:m-auto  gap-4 bg-white">

            <div className="flex flex-col items-center w-full sm:w-1/2 h-screen bg-white">
                <div className="flex flex-col bg-light-grey h-1/4 mt-0 w-full rounded-b-5xl">
                    <div className="flex items-center justify-center mt-14 gap-2">
                        <img src={Logo} alt="SaccoStream Logo" className="w-12 h-12" />
                        <h1 className="text-2xl font-bold text-dark-grey text-center">SaccoStream</h1>
                    </div>
                    <div className="h-12 mt-10">
                        <p className="text-dark-grey text-lg font-semibold text-center mt-8">Empowering SACCOs</p>
                    </div>
                </div>
                <div className="w-5/6">
                    {children}
                </div>
            </div>


            <div className="hidden sm:flex sm:w-1/2 h-screen items-center justify-center sm:mt-0 md:mt-0 lg:mt-0 xl:-mt-11 relative">
                <img src={AuthImage} alt="" className='h-screen mb-10' />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-4xl font-bold space-y-4">
                    <span>Growth</span>
                    <span>&</span>
                    <span>Resilience</span>
                </div>
            </div>
        </div>
    );
};

export default AuthFormWrapper;
