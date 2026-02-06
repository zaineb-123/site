import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns } from "./taskhelper";
import AddTaskIcon from "../components/icons/AddTaskIcon";

const fetchUserById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:4000/api/users/${id}/task`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user tasks");
  return res.json();
};
const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) throw new Error("no token found");
  const res = await axios.get("http://localhost:4000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


const TaskDashboard = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });

  const {
      data: users = [],
    } = useQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
    });
  
const currentUser = users.find((u) => u._id === id);


  const tasksArray = data?.tasks?.map(t => ({
  _id: t._id,
  task: t.task,
  startDate: t.startDate,
  endDate: t.endDate,
  status: t.status,
  userId: id, 
  departement: currentUser?.departement || "-",
})) || [];


  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="user-dashboard">
      <div className="dashboard-actionss">
        <Link to={`/add-task-user/${id}`} className="add-btn-link">
          <button className="add-btn">
            <AddTaskIcon /> ADD Task
          </button>
        </Link>
      </div>

      <div className="table-container">
        <DataTable
          columns={columns}
          data={tasksArray}{...data}
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
    </div>
  );
};

export default TaskDashboard;
