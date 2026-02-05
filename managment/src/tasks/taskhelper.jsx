import { useNavigate } from "react-router-dom";
import axios from "axios";

const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d)) return "-";
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
};

const daysLeft = (startDate, endDate) => {
  if (!startDate || !endDate) return "-";
  const diffDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? `${diffDays} days` : "Expired";
};

export const columns = [
  {
    name: "Departement",
    selector: (row) => row.task?.departement || "-",
    sortable: true,
  },
  {
    name: "Task",
    selector: (row) => row.task?.task || "-",
  },
  {
    name: "Start Date",
    selector: (row) => formatDate(row.task?.startDate),
  },
  {
    name: "End Date",
    selector: (row) => formatDate(row.task?.endDate),
  },
  {
    name: "Days Left",
    selector: (row) => daysLeft(row.task?.startDate, row.task?.endDate),
  },

  {
    name:"Status",
    selector: (row)=> row.task?.status,
    sortable: true,
    cell:(row)=>(
      <span className={`role-badge ${row.task?.status}`}>{row?.task.status}</span>
    )
  },
  {
    name: "Action",
    cell: (row) => <UserButtons user={row} />,
  },
];

export const UserButtons = ({ user }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-task-user/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/users/${id}/task`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task deleted successfully");
      // Optionnel : reload la page ou redirige
      navigate(0); // rafraîchit la page
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
          handleEdit(user._id);
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
          handleDelete(user._id);
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