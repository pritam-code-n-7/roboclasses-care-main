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

interface attendanceType {
  _id: string;
  batch: string;
  date: Date;
  score: string;
  studentsPresent:number;
  totalStudent:number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const TeacherViewTableDateWise = () => {
  const pathname = usePathname();
  const { data, isLoading, isValidating, error } = useSWR<attendanceType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/attendances`,
    fetcher
  );

  if (data?.length === 0) return <div>Empty List!</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (isValidating) return <div>Refreshing data!</div>;

  return (

    <Table className="border border-gray-300 rounded">
      <TableCaption>A list of attendances</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Batch No.</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Students Present</TableHead>
          <TableHead>Total Student</TableHead>
          <TableHead>Assessment Score</TableHead>


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
        {data?.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.batch}</TableCell>
           <TableCell>{format(item.date,'MMM dd, yyyy')}</TableCell>
            <TableCell>{item.studentsPresent}</TableCell>
            <TableCell>{item.totalStudent}</TableCell>
            <TableCell>{item.score}</TableCell>

            {pathname === "/adminDashboard" ? (
              <>
                <TableCell>
                  <EditButton name="Edit" type="button" />
                </TableCell>
                <TableCell>
                  <EditButton name="Delete" type="button" />
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
            Total
          </TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>

  );
};

export default TeacherViewTableDateWise;
