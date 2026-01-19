    import React, { useState } from 'react'
    import axios from 'axios'
    import { useNavigate,Link } from 'react-router-dom'
    import './Login.css'
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
            <div className='login-container page-animate'>
                <div className='login-wrapper'>
                    <div className='login-description'>
                        <h2>Hello Friend ! </h2>
                        <p>Register Now to discover all of site features </p>
                        <Link to="/Register">
                        <button className='login-desc-btn'>register</button></Link>
                    </div>
                
                <div className='login-form-container'>
                    <div className='login-form-box'>
                    <h2>Sign In</h2>
                    <form  className='login-form'onSubmit={handleSubmit}>
                    <div>
                        <label className='text'>Email</label>
                        <input type="email" 
                        className='login-input'
                        placeholder='Enter Email' 
                        onChange={(e)=>setEmail(e.target.value)} required/>
                        
                    </div>
                    <div>
                        <label className='text'>Password</label>
                        <input type="password" className='login-input' placeholder='*****' 
                        onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                    <button type='submit' className='submit-btn' >SIGN IN</button>
                    
                    
                        
                    
                    
                </form>
                    </div>
                </div>
            </div>
                
            </div>
            
    )
    }

    export default Login





