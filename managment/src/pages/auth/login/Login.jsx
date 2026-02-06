import  { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import "./Login.css";
import { login } from "../../../services/auth/login";
import Button from "../../../components/Button";
import { validateEmail,validatePassword } from '../../../validation/AuthValidation'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors]=useState({username:"",email:"",password:"",server:""})
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => {
      if (data.role === "admin") {
        navigate("/dashboardstat");
      } else {
        navigate("/user-dashboard");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
            const emailError= validateEmail(email)
            const passwordError=validatePassword(password)
    
    
    
            setErrors({email:emailError,password:passwordError,server:""})
            if ( emailError|| passwordError)return
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="login-container page-animate">
      <div className="login-wrapper">
        <div className="login-description">
          <h2>Hello Friend!</h2>
          <p>Register Now to discover all of site features</p>
          <Link to="/Register">
            <Button variant="outline">register</Button>
          </Link>
        </div>

        <div className="login-form-container">
          <div className="login-form-box">
            <h2>Sign In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <label className="text">Email</label>
                <input
                 
                  className="login-input"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loginMutation.isPending}
                
                />
                 {errors.email && <p className='error-text'>{errors.email}</p>}
              </div>
              <div>
                <label className="text">Password</label>
                <input
                  type="password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loginMutation.isPending}
                 
                />
                 {errors.password && <p className='error-text'>{errors.password}</p>}
              </div>

              {loginMutation.isError && (
                <div className="error-message">
                  {loginMutation.error?.response?.data?.msg ||
                    "Login failed. Please check your credentials."}
                </div>
              )}

              <Button type="submit" loading={loginMutation.isPending}>
                SIGN IN
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
