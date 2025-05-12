import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeHeader = () => {
    return (
        <>
            <section className='sticky top-0 left-0 '>
                <div className="flex justify-between w-full px-4 py-1 bg-gray-800 md:px-5 border-b-2 border-slate-700">
                    <div className="">
                        <img src="hc-logo.png" className='h-14' alt="" />
                    </div>
                    <div className="flex gap-8 items-center">
                        <div className="flex gap-4 items-center">
                            <NavLink to="/login">
                                <button className='h-10 px-7 py-2 text-sm bg-white text-slate-800 rounded-[10px]'>Login</button>
                            </NavLink>
                            <NavLink to="/">
                                <button className='h-10 px-7 py-2 text-sm bg-white text-slate-800 rounded-[10px]'>Signup</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeHeader;