import React, { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { columns,UserButtons } from "../utils/userhelper"
import axios from "axios"
import {data, Link } from 'react-router-dom'
import './AdminDashboard.css'
import Navbar from "../Navbar/Navbar"




const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [userLoading, setUserLoading] = useState(false)
  const [FilterUsers,setFilterUsers]=useState([])
  const onUserDelete=async(id)=>{
    
      setUsers(prev => prev.filter(user => user._id !== id))
    
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
          profil:user.profil,
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
  useEffect(()=>{
    setFilterUsers(users)
  },[users])
   const handlefilter =(e)=>{
    const value=e.target.value.toLowerCase()      // recuper le text saisi 
    const records =users.filter((users)=>        
      users.username.toLowerCase().includes(value),       // filtre selon username
     
    )
     setFilterUsers(records)
   }
  return(
    userLoading ? (
      <p> Loading users... </p>
    ):(
      <>
      <Navbar/>
      <div className="dashboard-header">
     <h2 className="dashboard-title"></h2>
      
      </div>
      <div className="dashboard-actions">
      <div className="search">
        <svg  className='icon-search'xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
        <input type="rechercher" 
                    placeholder='rechercher' 
                    onChange={handlefilter}
                    className="search-input"
                   />
                    

      </div>
      <Link to="/add-user" className="add-btn-link">
                <button className="add-btn"> 
                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
</svg>  ADD User
                 </button>
                </Link>
      </div>
      <div className="table-container">
      <DataTable
            columns={columns}
            data={FilterUsers}
            pagination
            highlightOnHover
            striped
          />
      </div>
      
      </>
    )
    )
  
}

export default AdminDashboard
