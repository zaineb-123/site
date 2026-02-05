import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns } from "./taskhelper";
import AddTaskIcon from "../components/icons/AddTaskIcon";


const fetchUserById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:4000/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

const TaskDashboard = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
console.log(data)
  const usersArray = data ? [data] : [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="user-dashboard">
      <div className="dashboard-actionss">
        <Link to={`/add-task-user/${id}`} className="add-btn-link">
          <button className="add-btn">
            <AddTaskIcon/> ADD Task
          </button>
        </Link>
      </div>

      <div className="table-container">
        <DataTable columns={columns} data={usersArray} pagination highlightOnHover striped />
      </div>
    </div>
  );
};

export default TaskDashboard;
