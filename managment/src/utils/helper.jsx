import React from "react";
import StatusToggle from "../components/StatusToggle";

export const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d)) return "-";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const daysLeft = (endDate) => {
  if (!endDate) return "-";
  const today = new Date();
  const end = new Date(endDate);
  if (isNaN(end)) return "-";
  const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? `${diffDays} days` : "Expired";
};


export const getColumns = (handleStatusChange) => [
  {
    name: "departement",
    selector: (row) => row?.departement,
    sortable: true,
  },
  {
    name: "task",
    selector: (row) => row?.task,
  },
  {
    name: "start Date",
    selector: (row) => formatDate(row?.startDate),
  },
  {
    name: "end Date",
    selector: (row) => formatDate(row?.endDate),
  },
  {
    name: "days left",
      selector: (row) => daysLeft(row?.endDate),
  },
  {
    name: "task status",
    cell: (row) => {
      if (!row?.task) return <span>-</span>;

      return (
        <StatusToggle
          value={row.status}
          variant="pill"
          size="sm"
          showTooltip
          onChange={(newStatus) => handleStatusChange(row._id, newStatus)}
        />
      );
    },
  },
];
