import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { appointmentTypes } from "../admin-dashboard/TableDemoOne";

import { format } from "date-fns";

const EditAppointmentForm = ({ date, time, handleDateChange, handleTimeChange, handleSubmit, handleDelete }: appointmentTypes) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-20">
      <Input required type="date" value={format(date, "yyyy-MM-dd")} onChange={handleDateChange}/>
      <Input required type="time" value={time} onChange={handleTimeChange}/>

      <Button type="submit">Update</Button>
      <Button type="button" onClick={handleDelete}>Cancel</Button>

    </form>
  );
};

export default EditAppointmentForm;
