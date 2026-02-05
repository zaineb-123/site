import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { columns } from '../../utils/helper';
import DataTable from "react-data-table-component";

const fetchMyTasks = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:4000/api/users/me/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

const UserDashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: fetchMyTasks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

 const tasksArray = data?.tasks?.map(t => ({
  ...t,
  userId: data.userId   // ✅ maintenant défini
})) || [];

  return (
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
  );
};

export default UserDashboard;
