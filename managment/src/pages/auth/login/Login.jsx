import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import './Login.css'
import { login } from '../../../services/auth/login'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: ({ email, password }) => login(email, password),
        onSuccess: (data) => {
            if (data.role === "admin") {
                navigate('/dashboardstat')
            } else {
                navigate('/myuserprofil')
            }
        },
        onError: (error) => {
            console.error('Login failed:', error)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        loginMutation.mutate({ email, password })
    }



    return (
        <div className='login-container page-animate'>
            <div className='login-wrapper'>
                <div className='login-description'>
                    <h2>Hello Friend!</h2>
                    <p>Register Now to discover all of site features</p>
                    <Link to="/Register">
                        <button className='login-desc-btn'>register</button>
                    </Link>
                </div>
            
                <div className='login-form-container'>
                    <div className='login-form-box'>
                        <h2>Sign In</h2>
                        <form className='login-form' onSubmit={handleSubmit}>
                            <div>
                                <label className='text'>Email</label>
                                <input 
                                    type="email" 
                                    className='login-input'
                                    placeholder='Enter Email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    disabled={loginMutation.isPending}
                                    required
                                />
                            </div>
                            <div>
                                <label className='text'>Password</label>
                                <input 
                                    type="password" 
                                    className='login-input' 
                                    placeholder='*****' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    disabled={loginMutation.isPending}
                                    required
                                />
                            </div>

                            {loginMutation.isError && (
                                <div className='error-message'>
                                    {loginMutation.error?.response?.data?.msg || 
                                     'Login failed. Please check your credentials.'}
                                </div>
                            )}

                            <button 
                                type='submit' 
                                className='submit-btn'
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? 'SIGNING IN...' : 'SIGN IN'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login