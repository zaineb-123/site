import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import './dashboardstat.css';
import {useQuery,useQueryClient} from'@tanstack/react-query'
import Button from "../../components/button";



const fetchUsers= async ()=>{
  const token = localStorage.getItem("token")
  if (!token) throw new Error("no token found")
    const res = await axios.get(
          "http://192.168.1.141:4000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        return res.data
}

const Dashboardstat = () => {
  const queryClient=useQueryClient()



  const {data:users=[]}=useQuery({
    queryKey:["users"],
    queryFn:fetchUsers,
  })

 

  const adminCount = users.filter(u => u.role === "admin").length; // calcul le nb filtrer de condition role=admin
  const userCount = users.filter(u => u.role === "user").length;   // calcul le nb filtrer de condition role=user
  const totalCount = users.length;  //nb total

  // graphique
  const pieData = {
    labels: ["Admins", "Users"],  // nom de categorie 
    datasets: [ // donne a affficher 
      {
        label: "Le nombre est",
        data: [adminCount, userCount],   // rep
        backgroundColor: ["#7c3aed", "#eaafc8"],
        borderWidth: 1,
      },
    ],
  };

  // 3 derniers utilisateur
  const lastUsers = [...users].reverse().slice(0, 3);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>



      {/* <Button
       isDisabled={false}
       value={"active"}
      ></Button>
        <Button
       isDisabled={true}
       value={"-----"}
      ></Button> */}

      <div className="dashboard-stats">
        <div className="stat-card admin-card">
          <h3>{adminCount}</h3>
          <p>Admins <svg  className="text-icon"xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
</svg></p>
        </div>
        <div className="stat-card user-card">
          <h3>{userCount}</h3>
          <p> Users <svg  className="text-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z"/>
</svg> </p>
        </div>
        <div className="stat-card total-card">
          <h3>{totalCount}</h3>
          <p>Total Users <svg  className="text-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg></p>
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
            {lastUsers.map(u => (
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
