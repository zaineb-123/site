import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./login/Login"
import Register from "./register/Register"

import AdminDashboard from "./dashboard/AdminDashboard"
import Adduser from './users/Adduser'
import Edituser from './users/Edituser'
import MyProfil from './users/MyProfil'
import Dashboardstat from './dashboard/Dashboardstat'
import UserProfil from './users/UserProfil'

import AdminLayout from "./layout/AdminLayout"
import UserLayout from "./layout/UserLayout"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route element={<AdminLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-user" element={<Adduser />} />
          <Route path="/admin-dashboard/edit/:id" element={<Edituser />} />
          <Route path="/myprofil" element={<MyProfil />} />
          <Route path="/dashboardstat" element={<Dashboardstat />} />
        </Route>

        <Route element={<UserLayout/>}>
        <Route path="/myuserprofil" element={<UserProfil />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
