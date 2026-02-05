import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns } from "./taskhelper";
import AddTaskIcon from "../components/icons/AddTaskIcon";

// Fetch des tâches de l'utilisateur
const fetchUserById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:4000/api/users/${id}/task`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user tasks");
  return res.json();
};

const TaskDashboard = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });

  // Préparer le tableau de tâches et ajouter userId à chaque tâche
  const tasksArray = data?.tasks?.map(t => ({
  _id: t._id,
  departement: t.departement,
  task: t.task,
  startDate: t.startDate,
  endDate: t.endDate,
  status: t.status,
  userId: id, // 👈 IMPORTANT pour Edit/Delete
})) || [];


  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="user-dashboard">
      <div className="dashboard-actions">
        <Link to={`/add-task-user/${id}`} className="add-btn-link">
          <button className="add-btn">
            <AddTaskIcon /> ADD Task
          </button>
        </Link>
      </div>

      <div className="table-container">
        <DataTable
          columns={columns}
          data={tasksArray}
          keyField="_id"
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default TaskDashboard;
