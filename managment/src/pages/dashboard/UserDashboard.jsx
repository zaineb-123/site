import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { columns } from '../../utils/helper';
import DataTable from "react-data-table-component";
const fetchUsers = async () => {
    const token=localStorage.getItem("token");
    const res = await fetch("http://localhost:4000/api/users/me",{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
    return res.json();

}


const UserDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUsers,
  });

      const usersArray = data ? [data] : [];
  return (
      <div className="table-container">
        <DataTable
          columns={columns}
          data={usersArray}
          pagination
          highlightOnHover
          striped
        />
      </div>
  )
}

export default UserDashboard