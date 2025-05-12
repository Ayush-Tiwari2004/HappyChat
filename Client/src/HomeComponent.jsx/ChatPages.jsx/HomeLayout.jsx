import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeHeader from './HomeHeader'

const HomeLayout = () => {
  return (
    <div>
      <HomeHeader />
      <Outlet />
    </div>
  )
}

export default HomeLayout