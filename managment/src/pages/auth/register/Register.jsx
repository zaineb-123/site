import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { register } from '../../../services/auth/register'
import './Register.css'
import Button from '../../../components/Button'


import { validateEmail,validatePassword,validateUsername } from '../../../validation/AuthValidation'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user")
    const [errors,setErrors]=useState({username:"",email:"",password:"",server:""})
    const navigate = useNavigate()
    
    const registerMutation = useMutation({
        mutationFn: ({ email, password, username, role }) => 
            register(username, email, password,role),
        
        onSuccess: (data) => {
            console.log('Registration successful:', data)
            navigate("/Login")
        },
        
        onError: (error) => {
            console.error('Registration failed:', error)
            setErrors(prev => ({ ...prev, server: error.response?.data?.msg || "Registration failed" }))
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const usernameError=validateUsername(username)
        const emailError= validateEmail(email)
        const passwordError=validatePassword(password)



        setErrors({username:usernameError,email:emailError,password:passwordError,server:""})
        if (usernameError|| emailError|| passwordError)return
        registerMutation.mutate({ email, password, username, role })
    }

    return (
        <div className='register-container page-animate'>
            <div className='register-wrapper'>
                <div className='register-desc'>
                    <h2>Welcome Back!</h2>
                    <p>Enter your personal details to use all of site features</p>
                    <Link to="/Login">
                        <Button variant='outline'>SIGN IN</Button>
                    </Link>
                </div>

                <div className='register-form-container'>
                    <div className='register-form-box'>
                        <h2>Create your Account</h2>
                        <form className='register-form' onSubmit={handleSubmit}>
                            <div>
                                <input 
                                    type="text"
                                    className='register-input'
                                    placeholder='your name'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={registerMutation.isPending}
                                    
                                />
                                {errors.username && <p className='error-text'>{errors.username}</p>}
                            </div>

                            <div>
                                <input 
                                    
                                    className='register-input'
                                    placeholder='your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={registerMutation.isPending}
                                    
                                />
                                {errors.email && <p className='error-text'>{errors.email}</p>}
                            </div>

                            

                            <div>
                                <input 
                                    type="password"
                                    className='register-input'
                                    placeholder='your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={registerMutation.isPending}
                                    
                                />
                                {errors.password && <p className='error-text'>{errors.password}</p>}
                            </div>
                           


                            {registerMutation.isError && (
                                <div className='error-message'>
                                    {registerMutation.error?.response?.data?.msg || 
                                     'Registration failed. Please try again.'}
                                </div>
                            )}

                            <Button 
                                type='submit' 
                                loading={registerMutation.isPending}
                            >
                                {registerMutation.isPending ? 'REGISTERING...' : 'REGISTER'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register