import api from "../../api/api"; 

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", response.data.role);
  localStorage.setItem(
    "user",
    JSON.stringify({ username: response.data.username, role: response.data.role })
  );

  return response.data;
};
