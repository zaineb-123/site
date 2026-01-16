import React from "react"

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
    sortable: true

  },
  {
    name: "Action",
    cell: () => (
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    )
  }
]
