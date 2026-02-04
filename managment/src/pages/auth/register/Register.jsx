import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { register } from '../../../services/auth/register'
import './Register.css'
import Button from '../../../components/Button'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("admin")
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
            alert(error.response?.data?.msg || "Registration failed")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
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
                                    required
                                />
                            </div>

                            <div>
                                <input 
                                    type="email"
                                    className='register-input'
                                    placeholder='your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={registerMutation.isPending}
                                    required
                                />
                            </div>

                            <div className='select-wrapper'>
                                <select 
                                    className='register-select'
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    disabled={registerMutation.isPending}
                                >
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                                </select>
                            </div>

                            <div>
                                <input 
                                    type="password"
                                    className='register-input'
                                    placeholder='your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={registerMutation.isPending}
                                    required
                                />
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