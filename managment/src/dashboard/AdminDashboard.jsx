import React, { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { columns } from "../utils/userhelper"
import axios from "axios"

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [userLoading, setUserLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setUserLoading(true)
      try {
        const token = localStorage.getItem("token")
        console.log("TOKEN :", token)

        const response = await axios.get(
          "http://localhost:4000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        console.log(response.data)

        
        const data = response.data.map(user => ({
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt:user.createdAt
        }))

        setUsers(data)

      } catch (error) {
        console.log(error.response?.data || error)
        alert("error")
      } finally {
        setUserLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <>
    
      {userLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Admin Dashboard</h2>
          <div>
                    <input type="rechercher" 
                    placeholder='rechercher' 
                   />
                    
                </div>
                <button>ajouter </button>
          <DataTable
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            striped
          />
        </div>
      )}
    </>
  )
}

export default AdminDashboard
