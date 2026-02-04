import  { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, UserButtons } from "../../utils/userhelper";
import axios from "axios";
import { data, Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Navbar from "../..//components/Navbar/Navbar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SearchIcon from "../../components/icons/SearchIcon";
import AddIcon from "../../components/icons/AddIcon";

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

const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`http://localhost:4000/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [filterUsers, setFilterUsers] = useState([]);
  const navigate = useNavigate();
  const handleEDit = (id) => {
    navigate(`/admin-dashboard/edit/${id}`);
  };
  const handleAdd= (id) => {
    navigate(`/add-task-user/${id}`);
  };
 

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      alert(error.response?.data?.error || "Erreur lors de la suppression");
    },
  });

  useEffect(() => {
    if (users.length) {
      setFilterUsers(users);
    }
  }, [users]);

  const handlefilter = (e) => {
    const value = e.target.value.toLowerCase();
    const records = users.filter((users) =>
      users.username.toLowerCase().includes(value),
    );
    setFilterUsers(records);
  };

  const handledelete = (id) => {
    const confirmation = window.confirm("delete!!");
    if (confirmation) {
      deleteMutation.mutate(id);
    }
  };

  const dataactions = filterUsers.map((user) => ({
    ...user,
    onDelete: handledelete,
    onEdit: handleEDit,
    onAdd: handleAdd,
 
  }));

  return isLoading ? (
    <p> Loading users... </p>
  ) : (
    <>
      <Navbar />
      <div className="dashboard-header">
        <h2 className="dashboard-title"></h2>
      </div>
      <div className="dashboard-actions">
        <div className="search">
          <SearchIcon />
          <input
            type="rechercher"
            placeholder="rechercher"
            onChange={handlefilter}
            className="search-input"
          />
        </div>
        <Link to="/add-user" className="add-btn-link">
          <button className="add-btn">
            <AddIcon /> ADD User
          </button>
        </Link>
      </div>
      <div className="table-container">
        <DataTable
          columns={columns}
          data={dataactions}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </>
  );
};

export default AdminDashboard;
