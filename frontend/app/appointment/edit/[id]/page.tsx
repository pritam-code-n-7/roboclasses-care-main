"use client";
import EditAppointmentForm from "@/demo/reschedule-demo/EditAppointmentForm";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "@/hooks/use-toast";

const Page = ({ params }: { params: { id: string } }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString().substring(11, 16)
  );
  const { id } = params;

  // handle get single appointment
  useEffect(() => {
    const handleFetchOne = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${id}`
        );

        setDate(res.data.date);
        setTime(res.data.time);
        console.log(res.data.date);
        console.log(res.data.time);
      } catch (error) {
        console.error("data fetching error", error);
      }
    };
    handleFetchOne();
  }, [id]);

  // handle update appointment
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${id}`,
        { date, time }
      );
      console.log(res.data);

      toast({
        title: "Your appointment is now updated successfully.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          </pre>
        ),
      });
    } catch (error) {
      console.log("Unable to update" + error);
    }
  };

  // handle delete appointment
  const handleCancelAppointment = async () => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${id}`
      );
      console.log(res.data);
      toast({
        title: "Your appointment got cancelled!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"></pre>
        ),
      });
    } catch (error) {
      console.log("Unable to delete" + error);
    }
  };

  return (
    <div className="w-[700px]">
      <EditAppointmentForm
        date={date}
        time={time}
        handleDateChange={(e) => setDate(new Date(e.target.value))}
        handleTimeChange={(e) => setTime(e.target.value)}
        handleSubmit={handleUpdate}
        handleDelete={handleCancelAppointment}
      />
    </div>
  );
};

export default Page;
