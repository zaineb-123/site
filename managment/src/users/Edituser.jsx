import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {useParams,Link, Navigate} from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './Edituser.css'


const Edituser = () => {
  const [profil,setProfil]=useState("")
    const {id}=useParams()
    const [users,setUsers]=useState(
        {
            username:"",
            email:"",
            password:"",
            role:"",
            profil:""
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
          `http://192.168.1.141:4000/api/users/${id}`,
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
            const formData=new FormData();
            formData.append("username",users.username);
            formData.append("email",users.email);
            formData.append("role",users.role);
            if(profil){
               formData.append("profil",profil);
            }
            const token=localStorage.getItem("token");
            const response= await axios.put(`http://192.168.1.141:4000/api/users/${id}`,formData,
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.success){
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
      <>
        <div>
          <h2 className='nom'></h2>
          <div className='adduser-container page-animate'>
            <div className='adduser-wrapper'>
              <div className='adduser-desc'>
                <div className='icon'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160
                  " fill="currentColor"  viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                </div>
                <h2>Edit user</h2>
              
              </div>
              <div className='adduser-form-container'>
                <div className='adduser-form-box'>
                  
                  <form  className='adduser-form' onSubmit={handleSubmit}>
                   
                      {users.profil&&(
                        <div className='user-info'>
                      
                      <img src={`http://localhost:4000/${users.profil}`} alt="profil" className='user-img' />
                      <span className='user-name'>{users.username}</span>
                      </div>
                    )}
                    
                    <div>
                    <label  className='text'>Your photo</label>
                    <input  className='adduser-input' type="file" name='image' placeholder='upload image' accept='image/*' onChange={(e)=>setProfil(e.target.files[0])}/>

                </div>
                <div>
                    <label  className='text' htmlFor="username">username</label>
                    <input type="text"
                    className='adduser-input'
                    placeholder='your name'
                    name='username'
                    value={users.username}
                    onChange={handlechange} 
                    
                 
                    />
                </div>
                <div>
                    <label className='text' htmlFor="email">email</label>
                    <input type="email"
                    className='adduser-input'
                    placeholder='your email' 
                    name='email'
                    onChange={handlechange} 
                    value={users.email}
                   
                    />
                </div>

                <div>
                    <label className='text' htmlFor="role">role</label>
                    <select className='adduser-input' name='role' onChange={handlechange} value={users.role}>
                        <option value="admin" >admin</option>
                        <option value="user" >user</option>
                    </select>
                </div>
                
                <button className='submitt-btn'>Edit</button>
               
                    
              


            </form>
            <Link to="/admin-dashboard">
                    <button className='cancel-btn'>Cancel</button>
                    </Link>
        </div>

                </div>
              </div>

            </div>

          </div>
            
            
        </>
        }</>
    )
}

export default Edituser