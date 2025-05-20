import React, { useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import sidebarData from '../API/NavigationData.json'
import { FaRegHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { MdChevronLeft } from 'react-icons/md';
import { LuPhone } from "react-icons/lu";
import { SlHome } from "react-icons/sl";
import { ProfilePopup } from './ProfilePopup';

const Sidebar = ({ onContactsClick, onCallsClick }) => {
  const [showSidebarPopup, SetShowSidebarPopup] = useState(false);
  const { authUser } = useSelector(state => state.user);

  const sidebarIcon = {
    BiSolidMessageDetail: <SlHome />,
    IoCallSharp: <LuPhone />,
    FaHeart: <FaRegHeart />,
    IoMdSettings: <IoSettingsOutline />,
  }
  const handleItemClick = (item) => {
    if (item.actionType === 'contacts') {
      return onContactsClick();
    } else if (item.actionType === 'calls') {
      return onCallsClick();
    }
  }
  const handleProfilePopupLink = () => {
    SetShowSidebarPopup(prev => !prev);
  }

  return (
    <section>
      <div className='sticky top-0 left-0 hidden md:flex w-60 h-screen bg-gray-50 dark:bg-gray-800 flex flex-col gap-4'>
        <div className="flex flex-col gap-4 p-4 shadow-md shadow-[#181b1f6f] w-full">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 w-fit">
              <p className='h-3 w-3 rounded-full bg-red-500'></p>
              <p className='h-3 w-3 rounded-full bg-green-500'></p>
              <p className='h-3 w-3 rounded-full bg-yellow-500'></p>
            </div>
            <div className="text-black dark:text-white text-xl">
              <p><span className='text-[#6d00bc]'>H</span>appyChat</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/dum.jpg" className='w-10 h-10 rounded-full' alt="" />
              <p className='text-slate-800 dark:text-white'>{authUser.username}</p>
            </div>
            <div className="relative flex text-xl">
              <MdChevronLeft />
              <MdChevronLeft className='absolute ml-[6px] text-gray-500' />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 space-y-1 text-slate-800 dark:text-white">
          <p className='text-sm ms-3 text-slate-400'>MENU</p>
          {
            sidebarData.map((item) => (
              <div key={item.id} onClick={() => { handleItemClick(item) }} className="">
                <h1 className='py-1 ms-4 text-sm text-slate-400'>{item.others}</h1>
                {item.actionKey === "profilePopupLink" ? (
                  <div onClick={handleProfilePopupLink} className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg cursor-pointer">
                    <div className='text-lg'>{sidebarIcon[item.icon]}</div>
                    <p className='text-sm leading-tight pt-1'>{item.menuTitle}</p>
                  </div>
                ) : (
                  <NavLink to={item.sidebarUrl} key={item.id}>
                    <div className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg">
                      <div className='text-lg'>{sidebarIcon[item.icon]}</div>
                      <p className='text-sm leading-tight pt-1'>{item.menuTitle}</p>
                    </div>
                  </NavLink>
                )}
              </div>
            ))
          }
          {/* <div onClick={handleProfilePopupLink} className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg cursor-pointer">
            <div className='text-lg'><IoSettingsOutline /></div>
            <p className='text-sm leading-tight pt-1'>Profile</p>
          </div> */}
        </div>
      </div>
      <ProfilePopup show={showSidebarPopup} onClose={() => SetShowSidebarPopup(false)} />
    </section>
  )
}

export default Sidebar;