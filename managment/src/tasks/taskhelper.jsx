import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Formater les dates
const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d)) return "-";
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
};

// Calculer les jours restants
const daysLeft = (endDate) => {
  if (!endDate) return "-";
  const today = new Date();
  const end = new Date(endDate);
  if (isNaN(end)) return "-";
  const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? `${diffDays} days` : "Expired";
};

// Composant des boutons d'action
export const UserButtons = ({ task, userId }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-task-user/${userId}/${task._id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/users/${userId}/task/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task deleted successfully");
      window.location.reload(); // recharge la page après suppression
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error deleting task");
    }
  };

  return (
    <div className="action-btns">
      <svg
        onClick={(e) => {
          e.stopPropagation();
          handleEdit();
        }}
        className="edit"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
      </svg>

      <svg
        className="delete"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
      </svg>
    </div>
  );
};

// Colonnes du tableau
export const columns = [
  {
    name: "Departement",
    selector: (row) => row?.departement || "-",
    sortable: true,
  },
  {
    name: "Task",
    selector: (row) => row?.task || "-",
  },
  {
    name: "Start Date",
    selector: (row) => formatDate(row?.startDate),
  },
  {
    name: "End Date",
    selector: (row) => formatDate(row?.endDate),
  },
  {
    name: "Days Left",
    selector: (row) => daysLeft(row?.endDate),
  },
  {
    name: "Status",
    selector: (row) => row?.status ?? "-",
    sortable: true,
    cell: (row) => {
      if (!row.task) return <span>-</span>;

      let statusText = "Not Started";
      switch (row.status) {
        case 1:
          statusText = "Not Started";
          break;
        case 2:
          statusText = "In Progress";
          break;
        case 3:
          statusText = "Completed";
          break;
        default:
          statusText = "Not Started";
      }

      return (
        <span className={`status-badge status-${row.status}`}>
          {statusText}
        </span>
      );
    },
  },
  {
    name: "Action",
    cell: (row) => {
      if (!row.task) return <span>-</span>;
      return <UserButtons task={row} userId={row.userId} />;
    },
  },
];
