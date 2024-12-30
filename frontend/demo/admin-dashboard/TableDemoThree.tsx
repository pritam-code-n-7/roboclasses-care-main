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

import useSWR from "swr";
import axios from "axios";

interface attendanceType {
  _id: string;
  teacher: string;
  batch: string;
  time: string[];
}

// const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","saturday"]

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableDemoThree() {
  const { data, isLoading, isValidating, error } = useSWR<attendanceType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/attendances`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Data fetching error!</div>;
  if (isValidating) return <div>Refreshing...</div>;
  if (data?.length === 0) return <div>Empty list!</div>;

  return (
    <Table className="border border-black">
      <TableCaption>A list of attendance</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Batch No.</TableHead>
          <TableHead>Times</TableHead>
          <TableHead className="text-right">Edit</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((attendance: attendanceType) => (
          <TableRow key={attendance._id}>
            <TableCell className="font-medium">{attendance.teacher}</TableCell>
            <TableCell>{attendance.batch}</TableCell>
            <TableCell className="text-right">
            {attendance.time.map((item)=>item).join(', ')}
            </TableCell>
            
            <TableCell className="text-right">
              <EditButton name="Edit" type="button" />
            </TableCell>
            <TableCell className="text-right">
              <EditButton name="Delete" type="button" />
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
