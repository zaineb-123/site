import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddTask.css"

const EditTask = () => {
const { id, taskId } = useParams();
  const navigate = useNavigate();

  const [userLoading, setUserLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    task: "",
    startDate: "",
    endDate: "",
  });

 

useEffect(() => {
  const fetchTask = async () => {
    setUserLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:4000/api/users/${id}/task/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTaskData({
        task: res.data.task || "",
        startDate: res.data.startDate || "",
        endDate: res.data.endDate || "",
      });
    } catch (err) {
      alert("Task not found");
    } finally {
      setUserLoading(false);
    }
  };

  fetchTask();
}, [id, taskId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
  `http://localhost:4000/api/users/${id}/task/${taskId}`,
  taskData,
  { headers: { Authorization: `Bearer ${token}` } }
);
      navigate(`/task-dashboard/${id}`);
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la mise à jour de la tâche");
    }
  };

  return userLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="task-page page-animate">
      <div className="task-wrapper">
        <div className="task-info-panel">
          <h1 className="task-title">Edit Task</h1>
          <p className="task-description">
            Modify the details of the selected task.
          </p>
        </div>

        <div className="task-form-panel">
          <div className="task-form-box">
            <h2 className="task-form-title">Task Details</h2>
            <form className="task-form" onSubmit={handleSubmit}>
             

              <label>Task</label>
              <input
                className="task-input"
                type="text"
                name="task"
                placeholder="Task description"
                value={taskData.task}
                onChange={handleChange}
                required
              />

              <div className="task-dates">
                <div>
                  <label>Start Date</label>
                  <input
                    className="task-input"
                    type="date"
                    name="startDate"
                    value={taskData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                    className="task-input"
                    type="date"
                    name="endDate"
                    value={taskData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="task-btn-group">
                <button type="submit" className="task-submit-btn">
                  Edit Task
                </button>
                <Link to={`/task-dashboard/${id}`}>
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

export default EditTask;
