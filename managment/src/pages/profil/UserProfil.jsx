import React, { useEffect, useState } from "react"
import "./myprofil.css"
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'


const fetchUserProfile=async()=>{
  const token=localStorage.getItem("token")
  const res=await fetch("http://localhost:4000/api/users/me", {headers:{
    Authorization:`Bearer ${token}`}
  
})
if (!res.ok){
  throw new Error("Erreur chargement profil");
  
}
 return res.json()
}

const updateuserprofile=async({userId,formData})=>{
    const token=localStorage.getItem("token")
   const res= await fetch(`http://localhost:4000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })
        if (!res.ok){
  throw new Error("Erreur chargement profil");
  
}
 return res.json()

}


const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({})
  const queryClient=useQueryClient()


  const{data:user}=useQuery({
    queryKey:['userProfile'],
    queryFn:fetchUserProfile,
   onSuccess:(data)=>setEditedData({
  id:data._id,
  username:data.username||"",
  email:data.email||"",
  role:data.role||"",
  profil:data.profil||""

})
  })

  const mutation=useMutation({
    mutationFn:updateuserprofile,
    onSuccess:(data)=>{
      queryClient.setQueryData(['userProfile'],data
      
      
        
        

      )
      setIsEditing(false)
    }
  })

  

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData({ 
      username:user.username,
      email:user.email,
      role:user.role,
      profil:user.profil
     })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData({ 
      username:user.username,
      email:user.email,
      role:user.role,
      profil:user.profil
    })
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
    
      const formData = new FormData()

      formData.append("username", editedData.username)
      formData.append("email", editedData.email)
      formData.append("role", editedData.role)

      if (editedData.profil instanceof File) {
        formData.append("profil", editedData.profil)
      }
      mutation.mutate({
        userId:user._id,
        formData
      })  }
  console.log(user)

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
                     disabled={mutation.isPending}
                  />
                </label>
              )}
            </div>
          </div>

          <h1 className="username">{user?.username}</h1>
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
                disabled={mutation.isPending}
              />
            ) : (
              <div className="readonly">{user?.username}</div>
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
                disabled={mutation.isPending}
              />
            ) : (
              <div className="readonly">{user?.email}</div>
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
                disabled={mutation.isPending}
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            ) : (
              <div className="readonly">{user?.role}</div>
       
            )}
          </div>

          <div className="form-actions">
            {!isEditing ? (
              <Button variant="primary" onClick={handleEdit}>Modifier</Button>
            ) : (
              <>
                <button onClick={handleSave} disabled={mutation.isPending}>Sauvegarder</button>
                <button onClick={handleCancel} disabled={mutation.isPending}>Annuler</button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default MyProfile


















