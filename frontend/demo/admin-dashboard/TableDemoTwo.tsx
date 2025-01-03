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
import axios from "axios";
import useSWR from "swr";

interface normalClassType{
  _id:string;
  time:string[];
  items:string[];
  teacher:string;
  batch:string;
}

const fetcher = (url:string)=>axios.get(url).then(res=>res.data)

// For map the row labels
const weekdays = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"]


export function TableDemoTwo() {
  const {data, isLoading, isValidating, error} = useSWR<normalClassType[]>(`${process.env.NEXT_PUBLIC_API_URL}/appointments/normalClass`,fetcher)

  if(data?.length === 0) return <div>Empty List!</div>
  if(error) return <div>Error!</div>
  if(isLoading) return <div>Loading...</div>
  if(isValidating) return <div>Refershing data...</div>
  
  return (
    <Table className="border border-black">
      <TableCaption>
        A list of booked appointments for Normal Class
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Batch Name</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Edit</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((appointment:normalClassType) => (
          <TableRow key={appointment._id}>
            <TableCell>{appointment.teacher}</TableCell>
            <TableCell>{appointment.batch}</TableCell>
           <TableCell className="text-right">
                         <TableRow>
                           <TableCell>
                             {weekdays.map((day)=>(day)).join(' | ')}
                           </TableCell>
                         </TableRow>
                         <TableRow>
                           <TableCell>
                             {appointment.time
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
          <TableCell colSpan={5}>Total Rows</TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
