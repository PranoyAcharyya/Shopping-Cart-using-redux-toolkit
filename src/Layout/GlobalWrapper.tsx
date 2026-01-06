import React from 'react'
import PrimarySearchAppBar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const GlobalWrapper = () => {
  return (
    <>
        <PrimarySearchAppBar/>
        <Outlet/>
    </>
  )
}

export default GlobalWrapper