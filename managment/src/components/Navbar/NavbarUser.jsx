import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useQuery } from "@tanstack/react-query"
import Button from "../button"

import MenuIcon from "@mui/icons-material/Menu"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"

const fetchUserProfile = async () => {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("no tokenfound")

        const res = await fetch("http://localhost:4000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("erreur")
          return res.json()
        }

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()

  const {data:user,isLoading,isError}=useQuery({
    queryKey:["userProfile"],
    queryFn: fetchUserProfile,
  }
   
  )

  const handleLogout = async () => {
  await fetch("http://localhost:4000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  navigate("/login");
};
  if(isLoading) return(<p>loading...</p>)
  if (isError)return null

  return (
    <>
      <nav className="navbar">
        <button className="menu-btn" onClick={() => setOpenMenu(true)}>
          <MenuIcon />
        </button>

        
        
         {user && (
  <div className="user-section">
    <span>Hello {user.username}</span>

   <Button variant="transparent" icon={<LogoutIcon />} iconPosition="left" onClick={handleLogout}>
            
            <span >Logout</span>
          </Button>
  </div>
)}
      </nav>

    
      {openMenu && (
        <div className="overlay" onClick={() => setOpenMenu(false)} />
      )}

     
      <aside className={`sidebar ${openMenu ? "open" : ""}`}>

  <button onClick={() => navigate("/myprofil")}>
    <PersonIcon />
    <span>My profile</span>
  </button>

  
</aside>

    </>
  )
}

export default Navbar
