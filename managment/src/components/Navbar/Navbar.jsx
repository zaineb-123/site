      import React, { useEffect, useState } from "react"
      import { useNavigate } from "react-router-dom"
      import "./Navbar.css"
      import { useQuery } from "@tanstack/react-query"

      import MenuIcon from "@mui/icons-material/Menu"
      import DashboardIcon from "@mui/icons-material/Dashboard"
      import PeopleIcon from "@mui/icons-material/People"
      import PersonIcon from "@mui/icons-material/Person"
      import LogoutIcon from "@mui/icons-material/Logout"
      import Button from "../button"


      const fetchUserProfile = async () => {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("no tokenfound")

        const res = await fetch("http://192.168.1.141:4000/api/users/me", {
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


        const handleLogout = () => {
          localStorage.clear()
          navigate("/login")
        }

        

        return (
          <>
              <nav className="navbar">
                  <Button
                  variant="transparent"  icon={ <MenuIcon /> }
           
            onClick={() => setOpenMenu(prev => !prev)}
                 >
         
        </Button>


              
              
              {user && (
        <div className="user-section">
          <span style={{whiteSpace:"nowrap"}}>Hello {user.username}</span>

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
        <button onClick={() => navigate("/dashboardstat")}>
          <DashboardIcon />
          <span>Dashboard</span>
        </button>

        <button onClick={() => navigate("/admin-dashboard")}>
          <PeopleIcon />
          <span>Users</span>
        </button>

        <button onClick={() => navigate("/myprofil")}>
          <PersonIcon />
          <span>My profile</span>
        </button>

        
      </aside>

          </>
        )
      }

      export default Navbar
