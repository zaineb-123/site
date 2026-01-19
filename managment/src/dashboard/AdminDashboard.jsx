import React, { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { columns,UserButtons } from "../utils/userhelper"
import axios from "axios"
import {data, Link } from 'react-router-dom'


const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [userLoading, setUserLoading] = useState(false)
  const [FilterUsers,setFilterUsers]=useState([])
  const onUserDelete=async(id)=>{
    const data=await userfilter(user=>
      user_id!==id,
      setUsers(data)
    )
  }

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
          _id:user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt:user.createdAt,
          action:<UserButtons _id={user._id} onUserDelete={onUserDelete}/>
          
        }))

        setUsers(data);
        setFilterUsers(data)

      } catch (error) {
        console.log(error.response?.data || error)
        alert("error")
      } finally {
        setUserLoading(false)
      }
    }

    fetchUsers()
  }, [])
   const handlefilter =(e)=>{
    const value=e.target.value.toLowerCase()
    const records =users.filter((users)=>
      users.username.toLowerCase().includes(value),
     
    )
     setFilterUsers(records)
 
   }
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
                    onChange={handlefilter}
                   />
                    
                </div>
                <Link to="/add-user">
                <button>ajouter </button>
                </Link>
                
          <DataTable
            columns={columns}
            data={FilterUsers}
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
