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

const appointments = [
  {
    student: "Ishanvi",
    teacher: "Kritika",
    batch: "Prime B21",
    date: "10-12-2024",
    time: "12:30",
  },
  {
    student: "Pritam",
    teacher: "Kritika",
    batch: "Prime B21",
    date: "11-12-2024",
    time: "11:00",
  },
];

export function TableDemoTwo() {
  return (
    <Table className="border border-black">
      <TableCaption>
        A list of booked appointments for Normal Class
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Student Name</TableHead>
          <TableHead>Teacher Name</TableHead>
          <TableHead>Batch Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Time</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{appointment.student}</TableCell>
            <TableCell>{appointment.teacher}</TableCell>
            <TableCell>{appointment.batch}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell className="text-right">{appointment.time}</TableCell>
            <TableCell className="text-right">
              <EditButton name="Edit" type="button" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">{3}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
