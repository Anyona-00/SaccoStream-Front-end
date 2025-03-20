import React, { useState, useEffect } from 'react';
import Logo from '../../Assets/logo.svg';
import NotificationIcon from '../../Assets/Homepage/notification.svg';
import ProfilePhoto from '../../Assets/Homepage/Profilephoto1.svg';
import ExpandArrow from '../../Assets/Homepage/ExpandArrow.svg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
    const [profileImage, setProfileImage] = useState(ProfilePhoto);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const navigate = useNavigate(); // Utilize useNavigate hook

    useEffect(() => {

        const fetchHeaderData = async () => {
            try {

                const profileResponse = await axios.get('/api/user/profile');
                if (profileResponse.data.success) {
                    setProfileImage(profileResponse.data.data.profileImageUrl);
                }


                const notificationsResponse = await axios.get('/api/user/notifications/unread');
                if (notificationsResponse.data.success) {
                    setUnreadNotifications(notificationsResponse.data.data.unreadCount);
                }
            } catch (error) {
                console.error('Error fetching header data:', error);
            }
        };


        fetchHeaderData();
    }, []);

    const handleNotificationClick = () => {
        navigate('/comingsoon'); // Navigate to coming soon page
    };

    const handleProfileClick = () => {
        navigate('/comingsoon'); // Navigate to coming soon page
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-transparent shadow-md">
            <div className="flex items-center gap-2">
                <img src={Logo} alt="SaccoStream Logo" className="w-10 h-10" />
                <h1 className="text-xl font-bold text-gray-800">SaccoStream</h1>
            </div>

            <div className="flex items-center gap-4">

                <button className="flex items-center justify-center bg-white h-10 w-10 rounded-full relative" onClick={handleNotificationClick}>
                    <img src={NotificationIcon} alt="Notifications" className="w-6 h-6" />
                    {unreadNotifications > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                            {unreadNotifications}
                        </span>
                    )}
                </button>


                <div className='bg-white w-16 rounded-2xl shadow-xl shadow-sp-green flex justify-between items-center sm:w-24 ' onClick={handleProfileClick}>
                    <button className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-gray-300" >
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </button>
                    <img
                        src={ExpandArrow}
                        alt="Expand"
                        className="w-4 h-4 sm:pr-2 sm:w-6 sm:h-6 "
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;