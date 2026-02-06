import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./dashboardstat.css";
import AdminIcon from "../../components/icons/AdminIcon";
import UserIcon from "../../components/icons/UserIcon";
import TotalUserIcon from "../../components/icons/TotalUserIcon";
import GroupsIcon from '@mui/icons-material/Groups'; 

// fetch users
const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const res = await axios.get("http://localhost:4000/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// fetch tasks for logged in user
const fetchTasks = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const res = await axios.get("http://localhost:4000/api/admin/tasks/tasks/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.tasks; // tableau de toutes les tâches
};
const Dashboardstat = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Stats utilisateurs
  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;
  const departementCount = users.filter((u) => u.departement).length;
  const totalCount = users.length;

  // Pie chart roles
  const pieData = {
    labels: ["Admins", "Users"],
    datasets: [
      {
        label: "Nombre",
        data: [adminCount, userCount],
        backgroundColor: ["#7c3aed", "#eaafc8"],
        borderWidth: 1,
      },
    ],
  };

  // Latest users
  const lastUsers = [...users].reverse().slice(0, 3);

  // Normaliser les status des tâches
  const normalizedTasks = tasks.map((t) => ({
    ...t,
    status: t.status === "completed" ? 3 : t.status,
  }));

  // Compter total vs complétées
  const totalTasks = normalizedTasks.length;
  const completedTasks = normalizedTasks.filter((t) => t.status === 3).length;

  // Line chart (ou bar chart) pour total vs complétées
  const barData = {
    labels: ["Tâches assignées", "Tâches complétées"],
    datasets: [
      {
        label: "Tâches",
        data: [totalTasks, completedTasks],
        backgroundColor: ["#7c3aed", "#22c55e"],
        borderColor: ["#7c3aed", "#22c55e"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-stats">
        <div className="stat-card admin-card">
          <h3>{adminCount}</h3>
          <p>Admins <AdminIcon /></p>
        </div>
        <div className="stat-card user-card">
          <h3>{userCount}</h3>
          <p>Users <UserIcon /></p>
        </div>
        <div className="stat-card total-card">
          <h3>{totalCount}</h3>
          <p>Total Users <TotalUserIcon /></p>
        </div>
        <div className="stat-card total-card">
          <h3>{departementCount}</h3>
         <p style={{ display: 'flex', alignItems: 'center', gap: '5px', transform: 'translateX(60px)'}}>
  Départements
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    fill="currentColor" 
    className="bi bi-collection" 
    viewBox="0 0 16 16"
  >
    <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z"/>
  </svg>
</p>

        </div>
      </div>

      <div className="dashboard-extra">
        {/* Pie chart roles */}
        <div className="chart-container">
          <h3>Répartition des rôles</h3>
          <Pie data={pieData} />
        </div>

        {/* Bar chart total vs completed */}
        <div className="chart-container">
          <h3>Tâches assignées vs complétées</h3>
          <Bar data={barData} />
        </div>

        {/* Latest users */}
        <div className="latest-users">
          <h3>Derniers utilisateurs</h3>
          <ul>
            {lastUsers.map((u) => (
              <li key={u._id}>
                {u.username} - <span className={`role-badge ${u.role}`}>{u.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboardstat;
