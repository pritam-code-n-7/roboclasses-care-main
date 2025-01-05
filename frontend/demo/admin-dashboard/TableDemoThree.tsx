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
import { batchType } from "@/types/Types";



const weekdays = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"]

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableDemoThree() {
  const { data, isLoading, isValidating, error } = useSWR<batchType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/newBatchEntries`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Data fetching error!</div>;
  if (isValidating) return <div>Refreshing...</div>;
  if (data?.length === 0) return <div>Empty list!</div>;

  return (
    <Table className="border border-black">
      <TableCaption>A list of batches</TableCaption>
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
        {data?.map((attendance: batchType) => (
          <TableRow key={attendance._id}>
            <TableCell className="font-medium">{attendance.teacher}</TableCell>
            <TableCell>{attendance.batch}</TableCell>
            <TableCell className="text-right">
              <TableRow>
                <TableCell>
                  {weekdays.map((day)=>(day)).join(' | ')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {attendance.time
                    .map((value) =>
                      !isNaN(parseInt(value[0], 10)) ? value : "N/A"
                    )
                    .join(" | ")}
                </TableCell>
              </TableRow>
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
