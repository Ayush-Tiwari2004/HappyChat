import React from 'react'
import sidebarData from '../API/NavigationData.json'
import { NavLink } from 'react-router-dom'
import { BiSolidMessageDetail } from 'react-icons/bi'
import { IoCallSharp } from 'react-icons/io5'
import { FaHeart } from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io'
import { Darkmode } from './Darkmode'

const Footer = () => {
  const sidebarIcon = {
    BiSolidMessageDetail: <BiSolidMessageDetail />,
    IoCallSharp: <IoCallSharp />,
    FaHeart: <FaHeart />,
    IoMdSettings: <IoMdSettings />,
  }
  return (
    <div className='flex justify-between items-center bg-white shadow-2xl shadow-gray-900 dark:bg-gray-700 px-4 py-1.5'>
      {
        sidebarData.map((item) => (
          <NavLink to={item.sidebarUrl} key={item.id}>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 h-11 w-11 grid place-content-center rounded-2xl">
              <div className='text-2xl dark:text-white'>{sidebarIcon[item.icon]}</div>
              {/* <p className='text-sm leading-tight pt-1'>{item.menuTitle}</p> */}
            </div>
          </NavLink>
        ))
      }
      <div className="dark:hover:bg-gray-600 hover:bg-gray-200 h-11 w-11 grid place-content-center rounded-2xl">
      <Darkmode className="text-gray-800 dark:text-white text-2xl"/>
      </div>
    </div>
  )
}

export default Footer
