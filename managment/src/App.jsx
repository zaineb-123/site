
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Adduser from "./users/Adduser";
import Edituser from "./users/Edituser";
import MyProfil from "./pages/profil/MyProfil";
import Dashboardstat from "./pages/dashboard/Dashboardstat";
import UserProfil from "./pages/profil/UserProfil";

import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import  AddTask  from "./tasks/AddTask";

import ProtectedRoute from "./components/ProtectedRoute";
import EditTask from "./tasks/EditTask";
import UserDashboard from "./pages/dashboard/UserDashboard";
import TaskDashboard from "./tasks/taskDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* route public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* seuls les admins */}
        <Route
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-user" element={<Adduser />} />
          <Route path="/admin-dashboard/edit/:id" element={<Edituser />} />
          <Route path="/dashboardstat" element={<Dashboardstat />} />
          <Route path="/myprofil" element={<MyProfil />} />
          <Route path="/add-task-user/:id" element={<AddTask />} />
            <Route path="/edit-task-user/:id/:taskId" element={<EditTask />} />
             <Route path="/task-dashboard/:id" element={<TaskDashboard/>} />
        </Route>

        {/* User  */}
        <Route
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/myuserprofil" element={<UserProfil />} />
          <Route path="/user-dashboard" element={<UserDashboard/>}/>
        </Route>

        {/* redirige auto vers /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* route inconnues  */}
        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
