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

import axios from "axios";
import React from "react";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import {format} from "date-fns";
import { EditButton } from "../admin-dashboard/EditButton";
import { attendanceType } from "@/types/Types";
import Link from "next/link";



const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const TeacherViewTableDateWise = () => {
  const pathname = usePathname();
  const { data, isLoading, isValidating, error, mutate } = useSWR<attendanceType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/attendances`,
    fetcher
  );

  // Handle delete an attendance
  const handleDelete = async(id:string)=>{
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/attendances/${id}`)
      console.log(res.data);
      mutate((data)=>data?.filter(attendance=>attendance._id !== id))
    } catch (error) {
      console.log(error);  
    }
  }

  if (data?.length === 0) return <div>Empty List for attendances!</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (isValidating) return <div>Refreshing data!</div>;

  return (

    <Table className="border border-gray-300 rounded">
      <TableCaption>A list of attendances</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Batch Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Students Present</TableHead>
          <TableHead>Total Student</TableHead>
          <TableHead>Assessment Score</TableHead>
          <TableHead className="text-right">Status</TableHead>
          {pathname === "/adminDashboard" ? (
            <>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </>
          ) : (
            ""
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((attendance) => (
          <TableRow key={attendance._id}>
            <TableCell>{attendance.batch}</TableCell>
           <TableCell>{format(attendance.date,'MMM dd, yyyy')}</TableCell>
            <TableCell>{attendance.studentsPresent}</TableCell>
            <TableCell>{attendance.totalStudent}</TableCell>
            <TableCell>{attendance.score}</TableCell>
            <TableCell></TableCell>
            {pathname === "/adminDashboard" ? (
              <>
                <TableCell>
                  <Link href={`/attendance/edit/${attendance._id}`}>
                  <EditButton name="Edit" type="button" />
                  </Link>
                </TableCell>
                <TableCell>
                  <EditButton name="Delete" type="button" onClick={()=>handleDelete(attendance._id)}/>
                </TableCell>
              </>
            ) : (
              ""
            )}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={pathname === "/adminDashboard" ? 7 : 5}>
            Total Rows
          </TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>

  );
};

export default TeacherViewTableDateWise;
