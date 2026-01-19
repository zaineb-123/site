import React from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

export const columns = [
  {
    name: "Username",
    selector: row => row.username,
    sortable: true
  },
  {
    name: "Email",
    selector: row => row.email,
    sortable: true
  },
  {
    name: "Role",
    selector: row => row.role,
    sortable: true
  },


  {
    name:"Joined Date",
    selector: row=> row.createdAt,
    sortable:true

  },


  {
    name:"Action",
    selector:(row)=>row.action
  },
  ]
  export const UserButtons=({_id,onUserDelete})=>{
    const navigate=useNavigate()
    
    
    const handledelete = async (e)=>{
      const confirmation=window.confirm("delete!!!")
      if (confirmation){
        e.preventDefault()
            try{
            const response= await axios.delete(`http://localhost:4000/api/users/${_id}`,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response){
                onUserDelete(_id)
            }
        }catch (error){
            if(error.response && !error.response.data.sucess){
                alert(error.response.data.error)
            }
        }
        }
      }
    
            
    return(
      <div>
        <button
        onClick={()=> navigate(`/admin-dashboard/edit/${_id}`)}
        >Edit</button>
         <button
         onClick={(handledelete)}>Delete</button>

      </div>
      
    )
  }

