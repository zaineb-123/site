import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Login from "./login/Login";
import AdminDashboard from"./dashboard/AdminDashboard";
import Register from "./register/Register";
import Adduser from './users/Adduser';
import Edituser from './users/Edituser';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/add-user" element={<Adduser/>}></Route>
        <Route path="/admin-dashboard/edit/:id" element={<Edituser/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;