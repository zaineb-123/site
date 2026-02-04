
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Adduser.css";
import add from "../assets/add-user.svg";
import { useMutation } from "@tanstack/react-query";

const adduser = async (FormData) => {
  const response = await axios.post(
    "http://localhost:4000/api/auth/add",
    FormData,
  );

  return response.data;
};

const Adduser = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [profil, setProfil] = useState("");
  const navigate = useNavigate();

  const addMutation = useMutation({
    mutationFn: adduser,

    onSuccess: (data) => {
      console.log("add successful", data);
      navigate("/admin-dashboard");
    },

    onError: (error) => {
      console.log("add failed ", error);
      alert(error.response?.data?.msg || "add failed");
    },
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("profil", profil);

    addMutation.mutate(formData);
  };
  return (
    <>
      <div className="adduser-container page-animate">
        <div className="adduser-wrapper">
          <div className="adduser-desc">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="160"
                fill="currentColor"
                className="bi bi-person-fill-add"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
              </svg>
            </div>

            <p>Add new users to your dashboard</p>
          </div>
          <div className="adduser-form-container">
            <div className="adduser-form-box">
              <h2>Add New User</h2>
              <form className="adduser-form" onSubmit={handlesubmit}>
                <div>
                  <label className="text" htmlFor="username">
                    username
                  </label>
                  <input
                    type="text"
                    placeholder="your name"
                    name="username"
                    className="adduser-input"
                    onChange={(e) => setusername(e.target.value)}
                    disabled={addMutation.isPending}
                  />
                </div>
                <div>
                  <label className="text" htmlFor="email">
                    email
                  </label>
                  <input
                    type="email"
                    placeholder="your email"
                    name="email"
                    className="adduser-input"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={addMutation.isPending}
                  />
                </div>

                <div>
                  <label className="text" htmlFor="role">
                    role
                  </label>
                  <select
                    className="adduser-input"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                    disabled={addMutation.isPending}
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                </div>
                <div>
                  <label className="text" htmlFor="password">
                    password
                  </label>
                  <input
                    type="text"
                    placeholder="your password"
                    name="password"
                    className="adduser-input"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={addMutation.isPending}
                  />
                </div>

                <div>
                  <label className="text">Your photo</label>
                  <input
                    className="adduser-input"
                    type="file"
                    name="profil"
                    placeholder="upload image"
                    accept="image/*"
                    onChange={(e) => setProfil(e.target.files[0])}
                    disabled={addMutation.isPending}
                  />
                </div>

                {addMutation.isError && (
                  <div className="error-message">
                    {addMutation.error?.response?.data?.msg ||
                      "add failed. Please try again."}
                  </div>
                )}
                <div className="btn-group">
                  <button
                    className="submitt-btn"
                    disabled={addMutation.isPending}
                  >
                    {" "}
                    {addMutation.isPending ? "adding..." : "add"}
                  </button>

                  <Link to="/admin-dashboard">
                    <button className="cancel-btn">Cancel</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adduser;
