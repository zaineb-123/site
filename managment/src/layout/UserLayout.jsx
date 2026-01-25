import React from "react"
import { Outlet } from "react-router-dom"
import NavbarUser from "../Navbar/NavbarUser"

const AdminLayout = () => {
  return (
    <>
      <NavbarUser />
      <Outlet />
    </>
  )
}

export default AdminLayout
