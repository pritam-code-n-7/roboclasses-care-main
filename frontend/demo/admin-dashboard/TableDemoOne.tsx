"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditButton } from "./EditButton";

import { format } from "date-fns";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { appointmentTypes } from "@/types/Types";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableDemoOne() {
  const { data, error, isLoading, mutate } = useSWR<appointmentTypes[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/demoClass`,
    fetcher
  );

  // handle delete appointment records
  const handleDelete = async (appointmentId: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/demoClass/${appointmentId}`
      );
      console.log(res.data);

      mutate((data) =>
        data?.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Table className="border border-black">
      <TableCaption>A list of booked appointments for Demo Class</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Student Name</TableHead>
          <TableHead className="w-[100px]">Course Name</TableHead>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Time</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Edit</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((appointment: appointmentTypes) => (
          <TableRow key={appointment._id}>
            <TableCell className="font-medium">
              {appointment.userName}
            </TableCell>
            <TableCell className="font-medium">{appointment.course}</TableCell>
            <TableCell className="font-medium">{appointment.teacher}</TableCell>

            <TableCell>
              {format(appointment.date, "MMM dd, yyyy")}
            </TableCell>
            <TableCell className="text-right">{appointment.time}</TableCell>
            <TableCell className="text-right">
              <EditButton
                name={appointment.status === true ? "Cancelled" : "Active"}
                type="button"
                varient="ghost"
              />
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/appointment/edit/${appointment._id}`}>
                <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>

            <TableCell className="text-right">
              {appointment.status === true ? (
                <EditButton
                  name="Delete"
                  type="button"
                  onClick={() => handleDelete(appointment._id ?? "")}
                />
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total</TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
