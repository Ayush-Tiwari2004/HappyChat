import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import { ContactList } from "../pages/ChatMessages/ContactList"
import { useState, useEffect } from 'react';
import CallsList from "../pages/ChatCalls/CallsList";

export const AppLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isUserChatOpen = location.pathname.includes('/profile/');
    
    // URL के आधार पर initial state सेट करें
    const [activeList, setActiveList] = useState(
        location.pathname.includes('/profile/calls') ? 'calls' : 'contacts'
    );
    
    const handleContactsClick = () => {
        setActiveList('contacts');
        navigate('/profile');
    };

    const handleCallsClick = () => {
        setActiveList('calls');
        navigate('/profile/calls');
    };
    
    // URL बदलने पर activeList अपडेट करें
    useEffect(() => {
        if (location.pathname.includes('/profile/calls')) {
            setActiveList('calls');
        } else {
            setActiveList('contacts');
        }
    }, [location.pathname]);
    
    return (
        <>
            <div className="">
                <div className="flex">
                    <div className="hidden md:block">
                        <Sidebar 
                          onContactsClick={handleContactsClick}
                          onCallsClick={handleCallsClick}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-gray-800 w-full">
                        <div className={`${isUserChatOpen ? 'hidden md:block' : 'block'}`}>
                            {activeList === 'contacts' ? (
                                <ContactList />
                            ) : (
                                <CallsList />
                            )}
                        </div>
                        <div className={`w-full flex-col ${isUserChatOpen ? 'block' : 'hidden md:block'}`}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}