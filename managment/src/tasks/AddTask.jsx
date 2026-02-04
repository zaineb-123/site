import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./AddTask.css";

const AddTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departement, setDepartement] = useState("");
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
 



  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async (taskData) => {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/api/users/${id}/task`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Task added successfully:", data);
      queryClient.invalidateQueries(["users"]);
      navigate("/admin-dashboard");
    },
    onError: (error) => {
      console.error("Failed to add task:", error);
      alert(error.response?.data?.msg || "Failed to add task");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      departement,
      task,
      startDate,
      endDate,
      status,
    };

    addMutation.mutate(taskData);
  };

  return (
    <div className="task-page page-animate">
      <div className="task-wrapper">
        <div className="task-info-panel ">
          <h1 className="task-title">Add Task</h1>
          <p className="task-description">
            Assign a new task to the selected user.
            <br />
          </p>
        </div>

        <div className="task-form-panel">
          <div className="task-form-box">
            <h2 className="task-form-title">Task Details</h2>
            <form className="task-form" onSubmit={handleSubmit}>
              <label>Departement</label>
              <select
                className="task-input"
                value={departement}
                onChange={(e) => setDepartement(e.target.value)}
                required
              >
                <option value="">Select departement</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
              </select>

              <label>Task</label>
              <input
                className="task-input"
                type="text"
                placeholder="Task description"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />

              <div className="task-dates">
                <div>
                  <label>Start Date</label>
                  <input
                    className="task-input"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                    className="task-input"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="task-btn-group">
                <button className="task-submit-btn" type="submit">
                  Add Task
                </button>
                <Link to="/admin-dashboard">
                  <button type="button" className="task-cancel-btn">
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
