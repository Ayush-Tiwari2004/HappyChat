import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CreateUser } from '../Logion&Signup/CreateUser';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [showAddNewUserPopup, setShowAddNewUserPopup] = useState(false);
    const togglePopup = () => {
        setShowAddNewUserPopup(!showAddNewUserPopup);
    }
    return (
        <>
            <section className='sticky top-0 left-0 '>
                <div className="flex justify-end w-full px-4 py-2 bg-white dark:bg-gray-800 md:px-5 shadow-sm shadow-zinc-200">
                    <div className="flex gap-8 items-center">
                        <div className='flex gap-4'>
                            <NavLink to='/login'>
                            <button className='px-4 py-1.5 bg-blue-500 rounded-lg'>Login</button>
                            </NavLink>
                            <NavLink to='/signup'>
                            <button className='px-4 py-1.5 bg-gray-500 rounded-lg'>Signup</button>
                            </NavLink>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button
                                onClick={togglePopup}
                                className="bg-blue-600 text-xl p-2 rounded-md">
                                <FaPlus className='text-white' />
                            </button>
                            <IoMdNotificationsOutline className='dark:text-white text-gray-500 text-2xl' />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-gray-600 dark:text-white text-right">
                                <p className='font-semibold'>Ayush Tiwari</p>
                                <p className='text-sm'>Typing...</p>
                            </div>
                            <img src="/default.png" className='h-10 w-10 rounded-md object-cover' alt="User Avatar" />
                        </div>
                    </div>
                </div>
            </section>
            <CreateUser
                show={showAddNewUserPopup}
                onClose={() => setShowAddNewUserPopup(false)}
            />
        </>
    )
}

export default Header
