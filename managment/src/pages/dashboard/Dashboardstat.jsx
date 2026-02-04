import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./dashboardstat.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUser, FaArrowRight, FaTrash, FaCheck, FaHome } from "react-icons/fa";
import TrashIcon from "../../components/icons/TrashIcon";
import AdminIcon from "../../components/icons/AdminIcon";
import UserIcon from "../../components/icons/UserIcon";
import TotalUserIcon from "../../components/icons/TotalUserIcon";

const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("no token found");
  const res = await axios.get("http://localhost:4000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const Dashboardstat = () => {
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleClick = () => {
    console.log("Button clicked!");
  };

  const adminCount = users.filter((u) => u.role === "admin").length; // calcul le nb filtrer de condition role=admin
  const userCount = users.filter((u) => u.role === "user").length; // calcul le nb filtrer de condition role=user
  const totalCount = users.length; //nb total

  // graphique
  const pieData = {
    labels: ["Admins", "Users"], // nom de categorie
    datasets: [
      // donne a affficher
      {
        label: "Le nombre est",
        data: [adminCount, userCount], // rep
        backgroundColor: ["#7c3aed", "#eaafc8"],
        borderWidth: 1,
      },
    ],
  };

  // 3 derniers utilisateur
  const lastUsers = [...users].reverse().slice(0, 3);

  return (
    <>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card admin-card">
            <h3>{adminCount}</h3>
            <p>
              Admins <AdminIcon />
            </p>
          </div>
          <div className="stat-card user-card">
            <h3>{userCount}</h3>
            <p>
              {" "}
              Users <UserIcon></UserIcon>{" "}
            </p>
          </div>
          <div className="stat-card total-card">
            <h3>{totalCount}</h3>
            <p>
              Total Users <TotalUserIcon />
            </p>
          </div>
        </div>

        <div className="dashboard-extra">
          <div className="chart-container">
            <h3>Répartition des rôles</h3>
            <Pie data={pieData} />
          </div>

          <div className="latest-users">
            <h3>Derniers utilisateurs</h3>
            <ul>
              {lastUsers.map((u) => (
                <li key={u._id}>
                  {u.username} -{" "}
                  <span className={`role-badge ${u.role}`}>{u.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardstat;
