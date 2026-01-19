    import React from 'react'
    import {Link } from 'react-router-dom'
    import { useState } from 'react'
    import axios from 'axios'
    import { useNavigate } from 'react-router-dom'
    import './Register.css'
    const Register = () => {
        const [username, setusername]=useState("")
        const [email, setEmail]=useState("")
        const [password,setPassword]=useState("")
        const [role,setRole]=useState("admin")
        const navigate=useNavigate()
        const handlesubmit =(e)=>{
            e.preventDefault()
            axios.post('http://localhost:4000/api/auth/register',{username,email,password,role})
            .then(result=> {console.log(result)
            navigate('/Login')
            })
            .catch(error=>console.log(error));
            alert('Error during registration please try again')
            
        }
    return (
        <div className='register-container page-animate'>
            <div className='register-wrapper'>
                <div className='register-desc'>
                    <h2>Welcome Back!</h2>
                    <p>Enter your personal details to use all of site features</p>
                    
                    <Link to="/Login"><button className='register-desc-btn'>SIGN IN</button></Link>
               
                </div>
            <div className='register-form-container'>
                <div className='register-form-box'>
                <h2>Create your Account</h2>
                <form  className='register-form'onSubmit={handlesubmit}>
                <div>
                    
                    <input type="text"
                    className='register-input'
                    placeholder='your name'
                    name='username'
                    onChange={(e)=> setusername(e.target.value)} 
                    />
                </div>
                <div>
                   
                    <input type="email"
                    className='register-input'
                    placeholder='your email' 
                    name='email'
                    onChange={(e)=> setEmail(e.target.value)} 
                    />
                </div>

                <div className='select-wrapper'>
                   
                    <select   className='register-select'name='role' onChange={(e)=> setRole(e.target.value)}>
                        <option value="admin" >admin</option>
                        <option  value="user" >user</option>
                    </select>
                </div>
                <div>
                   
                    <input type="text"
                    className='register-input'
                    placeholder='your password'
                    name='password' 
                    onChange={(e)=> setPassword(e.target.value)} 
                    />
                </div>
                <button type='submit' className='register-btn'>register</button>
                


            </form>
                </div>
            </div>
            
            
        </div>
         </div>
    )
    }

    export default Register;