import axios from "axios"
export const register = async (username, email, password, role) => {
  const response = await axios.post(
    "http://192.168.1.141:4000/api/auth/register",
    { username, email, password, role}
  )
  return response.data
}
