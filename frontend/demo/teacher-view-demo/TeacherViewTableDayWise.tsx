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

interface attendanceType {
  _id: string;
  batch: string;
  date: string[];
  score: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const TeacherViewTableDayWise = () => {
  const { data, isLoading, isValidating, error } = useSWR<attendanceType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/attendances`,
    fetcher
  );

  if (data?.length === 0) return <div>Empty List!</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (isValidating) return <div>Refreshing data!</div>;

  return (
    <Table>
      <TableCaption>A list of teachers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Batch No.</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Assessment Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.batch}</TableCell>
            <TableCell>
              
            </TableCell>
            <TableCell>{item.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{1}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TeacherViewTableDayWise;
