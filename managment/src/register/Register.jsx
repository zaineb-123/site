    import React from 'react'
    import {Link } from 'react-router-dom'
    import { useState } from 'react'
    import axios from 'axios'
    import { useNavigate } from 'react-router-dom'
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
            
        }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handlesubmit}>
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text"
                    placeholder='your name'
                    name='username'
                    onChange={(e)=> setusername(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email"
                    placeholder='your email' 
                    name='email'
                    onChange={(e)=> setEmail(e.target.value)} 
                    />
                </div>

                <div>
                    <label htmlFor="role">role</label>
                    <select  name='role' onChange={(e)=> setRole(e.target.value)}>
                        <option value="admin" >admin</option>
                        <option value="user" >user</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="text"
                    placeholder='your password'
                    name='password' 
                    onChange={(e)=> setPassword(e.target.value)} 
                    />
                </div>
                <button>register</button>
                <button>
                    <Link to="/Login">login</Link>
                </button>


            </form>
        </div>
    )
    }

    export default Register