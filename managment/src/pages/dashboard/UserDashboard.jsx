import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import StatusToggle from "../../components/StatusToggle"
import "./AdminDashboard.css"; // ton CSS existant

const fetchMyTasks = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:4000/api/users/me/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

const fetchMe = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:4000/api/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

// Format date helper
const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d)) return "-";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

// Days left helper
const daysLeft = (startDate, endDate) => {
  if (!startDate || !endDate) return "-";
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start) || isNaN(end)) return "-";
  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? `${diffDays} days` : "Expired";
};

// API call to update status
const updateTaskStatus = async ({ userId, taskId, status }) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:4000/api/users/${userId}/task/${taskId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
};

const UserDashboard = () => {
  const { data: taskData, isLoading, isError, error } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: fetchMyTasks,
  });

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const [tasksArray, setTasksArray] = useState([]);

  // Initialiser le tableau avec user info
  useEffect(() => {
    if (taskData && me) {
      const tasks = taskData.tasks.map((t) => ({
        ...t,
        userId: me._id,
        departement: me.departement || "-",
      }));
      setTasksArray(tasks);
    }
  }, [taskData, me]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Colonnes avec StatusToggle
  const columns = [
    { name: "departement", selector: (row) => row.departement, sortable: true },
    { name: "task", selector: (row) => row.task },
    { name: "start Date", selector: (row) => formatDate(row.startDate) },
    { name: "end Date", selector: (row) => formatDate(row.endDate) },
    { name: "days left", selector: (row) => daysLeft(row.startDate, row.endDate) },
    {
      name: "task status",
      cell: (row) => (
        <StatusToggle
          value={row.status}
          variant="pill"
          size="sm"
          showTooltip
          onChange={async (newStatus) => {
            // Mise à jour immédiate
            setTasksArray((prev) =>
              prev.map((task) =>
                task._id === row._id ? { ...task, status: newStatus } : task
              )
            );
            // Appel API
            try {
              await updateTaskStatus({
                userId: row.userId,
                taskId: row._id,
                status: newStatus,
              });
            } catch (err) {
              console.error("Status update failed", err);
              // Revert en cas d'erreur
              setTasksArray((prev) =>
                prev.map((task) =>
                  task._id === row._id ? { ...task, status: row.status } : task
                )
              );
            }
          }}
        />
      ),
    },
  ];

  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={tasksArray}
        keyField="_id"
        pagination
        highlightOnHover
        striped
        conditionalRowStyles={[
          { when: (row) => row.status === 1, style: { backgroundColor: "#d3d3d3", color: "#000" } },
          { when: (row) => row.status === 2, style: { backgroundColor: "#FFD8A8", color: "#000" } },
          { when: (row) => row.status === 3, style: { backgroundColor: "#A8E6CF", color: "#000" } },
        ]}
      />
    </div>
  );
};

export default UserDashboard;
