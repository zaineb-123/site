import React from 'react'
import Switch from "@mui/material/Switch";
import ThreeWayToggle from '../components/switcher';

const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d)) return "-";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};
const daysLeft = (startDate, endDate) => {
  if (!startDate || !endDate) return "-";

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) return "-";

  const diffTime = end - start; // en millisecondes
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 0 ? `${diffDays} days` : "Expired";
};

export const columns=[
    {
    name: "departement",
    selector: (row) => row.task?.departement,
    sortable: true,
  },

  {
    name: "task",
    selector: (row) => row.task?.task,
  },

  

  {
    name:"start Date",
    selector:(row)=>formatDate(row.task?.startDate),
  },

  {
    name:"end Date",
    selector:(row)=>formatDate(row.task?.endDate),
  },


  {
    name:"days left",
    selector:(row)=>daysLeft(row.task?.startDate, row.task?.endDate),
  },
  {
    name: "task status",
    selector: (row) => row.task?.status,
    cell: (row) => (
      <ThreeWayToggle
               
      />
    ),
  },


  
]