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

  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 0 ? `${diffDays} days` : "Expired";
};

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

  if (!res.ok) {
    throw new Error("Failed to update status");
  }

  return res.json();
};


export const columns = [
  {
    name: "departement",
    selector: (row) => row?.departement,
    sortable: true,
  },
  {
    name: "task",
    selector: (row) => row?.task,
  },
  {
    name: "start Date",
    selector: (row) => formatDate(row?.startDate),
  },
  {
    name: "end Date",
    selector: (row) => formatDate(row?.endDate),
  },
  {
    name: "days left",
    selector: (row) => daysLeft(row?.startDate, row?.endDate),
  },
  {
    name: "task status",
    cell: (row) => {
      // Check if task exists first
      if (!row?.task) return <span>-</span>;

      const [localStatus, setLocalStatus] = React.useState(row?.status || 1);

      const handleStatusChange = async (newStatus) => {
        const previousStatus = localStatus;
        setLocalStatus(newStatus);

        try {
         await updateTaskStatus({
  userId: row.userId,   
  taskId: row._id,     
  status: newStatus
});
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
];