import axios from "axios";

export const login = async (email, password) => {
  const response = await axios.post(
    "http://localhost:4000/api/auth/login",
    { email, password },
    { withCredentials: true },
  );

  console.log("Login response:", response.data);

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", response.data.role);
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: response.data.username,
      role: response.data.role,
    }),
  );

  return response.data;
};
