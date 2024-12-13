"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditButton } from "./EditButton";

import { format } from "date-fns";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";

export interface appointmentTypes {
  _id?: string;
  userName?: string;
  date: Date;
  time: string;
  course?: string;
  handleDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDelete?: ()=>void;
}

export interface deleteType {
  handleDelete: () => void;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableDemoOne() {
  const { data, error, isLoading } = useSWR<appointmentTypes[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/appointments`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Table>
      <TableCaption>A list of booked appointments for Demo Class</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Student Name</TableHead>
          <TableHead className="w-[100px]">Course Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Time</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((appointment: appointmentTypes) => (
          <TableRow key={appointment._id}>
            <TableCell className="font-medium">
              {appointment.userName}
            </TableCell>
            <TableCell className="font-medium">{appointment.course}</TableCell>
            <TableCell>
              {format(appointment.date ?? "", "MMM dd, yyyy")}
            </TableCell>
            <TableCell className="text-right">{appointment.time}</TableCell>
            <TableCell className="text-right">
                <EditButton name="active " type="button" varient="ghost"/>
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/appointment/edit/${appointment._id}`}>
                <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
