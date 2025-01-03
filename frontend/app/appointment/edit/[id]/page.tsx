"use client";
import EditAppointmentForm from "@/demo/reschedule-demo/EditAppointmentForm";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Page = ({ params }: { params: { id: string } }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString().substring(11, 16)
  );
  const [name, setName] = useState("");
  const { id } = params;

  // handle get single appointment
  useEffect(() => {
    const handleFetchOne = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`
        );

        setDate(res.data.date);
        setTime(res.data.time);
        setName(res.data.userName);
        console.log(res.data.date);
        console.log(res.data.time);
        console.log(res.data.userName);
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
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
        { date, time }
      );
      console.log(res.data);

      toast({
        title: "Your appointment is now updated successfully.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"></pre>
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
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`
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
    <SidebarInset className="w-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Scheduler</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />

              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/adminDashboard">
                  Admin Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="hidden md:block" />

              <BreadcrumbItem>
                <BreadcrumbPage>{`${name}'s Appointment`}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="w-[700px] ">
        <EditAppointmentForm
          date={date}
          time={time}
          handleDateChange={(e) => setDate(new Date(e.target.value))}
          handleTimeChange={(e) => setTime(e.target.value)}
          handleSubmit={handleUpdate}
          handleDelete={handleCancelAppointment}
        />
      </div>
    </SidebarInset>
  );
};

export default Page;
