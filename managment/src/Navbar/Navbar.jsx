      import React, { useEffect, useState } from "react"
      import { useNavigate } from "react-router-dom"
      import "./Navbar.css"

      import MenuIcon from "@mui/icons-material/Menu"
      import DashboardIcon from "@mui/icons-material/Dashboard"
      import PeopleIcon from "@mui/icons-material/People"
      import PersonIcon from "@mui/icons-material/Person"
      import LogoutIcon from "@mui/icons-material/Logout"

      const Navbar = () => {
        const [user, setUser] = useState(null)
        const [openMenu, setOpenMenu] = useState(false)
        const navigate = useNavigate()

        useEffect(() => {
          const fetchUserProfile = async () => {
            try {
              const token = localStorage.getItem("token")
              if (!token) return

              const res = await fetch("http://localhost:4000/api/users/me", {
                headers: { Authorization: `Bearer ${token}` },
              })

              if (res.ok) {
                const data = await res.json()
                setUser(data)
              }
            } catch (err) {
              console.error("Erreur profil:", err)
            }
          }

          fetchUserProfile()
        }, [])

        const handleLogout = () => {
          localStorage.clear()
          navigate("/login")
        }

        return (
          <>
              <nav className="navbar">
                  <button
            className="menu-btn"
            onClick={() => setOpenMenu(prev => !prev)}
                 >
          <MenuIcon />
        </button>


              
              
              {user && (
        <div className="user-section">
          <span>Hello {user.username}</span>

          <button className="logout-top" onClick={handleLogout}>
            <LogoutIcon />
            <span className="logout-text">Logout</span>
          </button>
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
