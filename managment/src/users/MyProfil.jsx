import React, { useEffect, useState } from "react"
import "./myprofil.css"

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false)

  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
    profil: ""
  })

  const [editedData, setEditedData] = useState({ ...userData })

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:4000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (res.ok) {
          const user = await res.json()
          const loadedData = {
            id: user._id,
            username: user.username || "",
            email: user.email || "",
            role: user.role || "",
            profil: user.profil || ""
          }
          setUserData(loadedData)
          setEditedData(loadedData)
        }
      } catch (err) {
        console.error("Erreur chargement profil:", err)
      }
    }

    fetchUserProfile()
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData({ ...userData })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData({ ...userData })
  }

  const handleChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditedData({ ...editedData, profil: file })
    }
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")
      const formData = new FormData()

      formData.append("username", editedData.username)
      formData.append("email", editedData.email)
      formData.append("role", editedData.role)

      if (editedData.profil instanceof File) {
        formData.append("profil", editedData.profil)
      }

      const res = await fetch(
        `http://localhost:4000/api/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      )

      if (res.ok) {
        const updatedUser = await res.json()
        setUserData({
          id: updatedUser.updateUser._id,
          username: updatedUser.updateUser.username,
          email: updatedUser.updateUser.email,
          role: updatedUser.updateUser.role,
          profil: updatedUser.updateUser.profil
        })
        setIsEditing(false)
        alert("Profil mis à jour avec succès")
      } else {
        alert("Erreur lors de la mise à jour")
      }
    } catch (err) {
      console.error(err)
      alert("Erreur serveur")
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

   
        <div className="profile-header">
          <div className={`avatar-wrapper ${isEditing ? "editing" : ""}`}>
            <div className="avatar">
              {editedData.profil ? (
                <img
                  src={
                    editedData.profil instanceof File
                      ? URL.createObjectURL(editedData.profil)
                      : `http://localhost:4000/${editedData.profil}`
                  }
                  alt="profil"
                  className="avatar-img"
                />
              ) : (
                <div className="avatar-placeholder"></div>
              )}

              {isEditing && (
                <label className="avatar-overlay">
                  <span className="edit-text">Edit</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>

          <h1 className="username">{userData.username}</h1>
        </div>

      
        <div className="profile-form">

          <div className="form-group">
            <label>Username</label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.username}
                onChange={(e) =>
                  handleChange("username", e.target.value)
                }
              />
            ) : (
              <div className="readonly">{userData.username}</div>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                value={editedData.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
              />
            ) : (
              <div className="readonly">{userData.email}</div>
            )}
          </div>

          <div className="form-group">
            <label>Role</label>
            {isEditing ? (
              <select
                value={editedData.role}
                onChange={(e) =>
                  handleChange("role", e.target.value)
                }
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            ) : (
              <div className="readonly">{userData.role}</div>
            )}
          </div>

          <div className="form-actions">
            {!isEditing ? (
              <button onClick={handleEdit}>Modifier</button>
            ) : (
              <>
                <button onClick={handleSave}>Sauvegarder</button>
                <button onClick={handleCancel}>Annuler</button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default MyProfile
