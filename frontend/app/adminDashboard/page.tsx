import { TableDemoOne } from "@/demo/admin-dashboard/TableDemoOne";
import { TableDemoTwo } from "@/demo/admin-dashboard/TableDemoTwo";
import React from "react";

const page = () => {
  return (
    <div className="w-[1200px] grid grid-cols-1 space-y-10 p-20">
      <p className="font-bold text-4xl">Manage Appointments</p>
      <TableDemoOne />
      <TableDemoTwo />
    </div>
  );
};

export default page;
