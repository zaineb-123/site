import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Login from "./login/Login";
import AdminDashboard from"./dashboard/AdminDashboard";
import Register from "./register/Register";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;