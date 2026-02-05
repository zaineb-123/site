import React from 'react'
import Switch from "@mui/material/Switch";
import StatusToggle from '../components/StatusToggle';



const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d)) return "-";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};
const daysLeft = (startDate, endDate) => {
  if (!startDate || !endDate) return "-";

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) return "-";

  const diffTime = end - start; // en millisecondes
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 0 ? `${diffDays} days` : "Expired";
};

 const updateTaskStatus = async ({ userId, status }) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:4000/api/users/${userId}/task/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update status");
  }

  return res.json();
};

export const columns=[
    {
    name: "departement",
    selector: (row) => row.task?.departement,
    sortable: true,
  },

  {
    name: "task",
    selector: (row) => row.task?.task,
  },

  

  {
    name:"start Date",
    selector:(row)=>formatDate(row.task?.startDate),
  },

  {
    name:"end Date",
    selector:(row)=>formatDate(row.task?.endDate),
  },


  {
    name:"days left",
    selector:(row)=>daysLeft(row.task?.startDate, row.task?.endDate),
  },
 {
  name: "task status",
  cell: (row) => {
    const [localStatus, setLocalStatus] = React.useState(row.task?.status || 1);

    const handleStatusChange = async (newStatus) => {
      const previousStatus = localStatus;
      setLocalStatus(newStatus);

      const statusMap = {
        1: "not started",
        2: "In progress",
        3: "Completed",
      };

      try {
        await updateTaskStatus({ userId: row._id, status: statusMap[newStatus] });
      } catch (err) {
        console.error("Status update failed", err);
        setLocalStatus(previousStatus);
      }
    };

    return (
      <StatusToggle
        value={localStatus}
        variant="pill"
        size="sm"
        showTooltip
        onChange={handleStatusChange}
      />
    );
  },
}




  
]