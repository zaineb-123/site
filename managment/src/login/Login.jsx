import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
     const Navigate= useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try {
           const response=await axios.post("http://localhost:4000/api/auth/login",{email,password});
           localStorage.setItem("token", response.data.token)
            localStorage.setItem("role", response.data.role)
           console.log(response)
           if(response.data.role==="admin"){
            Navigate('/admin-dashboard')
           }
        } catch (error) {
            console.log(error)
        }

    };

  return (
        <div>
            <h2>Se connecter</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" 
                    placeholder='Enter Email' 
                    onChange={(e)=>setEmail(e.target.value)}/>
                    
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder='*****' 
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type='submit'>Login</button>
                <button>
                    <Link to="/Register">register</Link>
                </button>
                
            </form>
        </div>
        
  )
}

export default Login





