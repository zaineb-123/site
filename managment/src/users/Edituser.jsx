import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {useParams,Link, Navigate} from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Edituser = () => {
    const {id}=useParams()
    const [users,setUsers]=useState(
        {
            username:"",
            email:"",
            password:"",
            role:"",
        }
    )
    const [userLoading, setUserLoading] = useState(false)
    const navigate= useNavigate()


    useEffect(() => {
    const fetchUsers = async () => {
      setUserLoading(true)
      try {
        const token = localStorage.getItem("token")
        console.log("TOKEN :", token)

        const response = await axios.get(
          `http://localhost:4000/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response) {
            setUsers(response.data)
         
        };

      } catch (error) {
        console.log(error.response?.data || error)
        alert("error")
      } finally {
        setUserLoading(false)
      }
    }

    fetchUsers()
  }, [id]);
 
  const handlechange=(e)=>{
    const {name,value}=e.target;
    setUsers({...users,[name]:value})
  }
  const handleSubmit= async (e)=>{
    
            e.preventDefault()
            try{
            const response= await axios.put(`http://localhost:4000/api/users/${id}`,
                {username:users.username,
                    email:users.email,
                    role:users.role
                },
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data){
                navigate("/admin-dashboard");
            }
        }catch (error){
            if(error.response && !error.response.data.sucess){
                alert(error.response.data.error)
            }
        }
        }
  return (
    <>{userLoading? <div>Loading...</div>:
        <div>
            <h2>Edit user</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text"
                    placeholder='your name'
                    name='username'
                    value={users.username}
                    onChange={handlechange} 
                    
                 
                    />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email"
                    placeholder='your email' 
                    name='email'
                    onChange={handlechange} 
                    value={users.email}
                   
                    />
                </div>

                <div>
                    <label htmlFor="role">role</label>
                    <select  name='role' onChange={handlechange} value={users.role}>
                        <option value="admin" >admin</option>
                        <option value="user" >user</option>
                    </select>
                </div>
                
                <button>Edit</button>
               
                    
              


            </form>
            <Link to="/admin-dashboard">
                    <button>Cancel</button>
                    </Link>
        </div>
        }</>
    )
}

export default Edituser