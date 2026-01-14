import React, { useState } from 'react'
import axios from 'axios'
const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try {
           const response=await axios.post("http://localhost:4000/login",{email,password});
           console.log(response)
           if(response.data.user.role==="admin"){
            navigate('/admin-dashboard')
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
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    placeholder='Enter Email' 
                    onChange={(e)=>setEmail(e.target.value)}/>
                    
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='*****' 
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button>Login</button>
            </form>
        </div>
        
  )
}

export default Login