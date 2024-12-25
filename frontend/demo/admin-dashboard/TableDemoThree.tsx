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
  
  const attendances = [
    {
      teacher: "Kritika",
      batch: "Prime B21",
      class: "Class 1",
      date: "24-12-2024",
      score: "94"
      
    },
    {
        teacher: "Bishwajit",
        batch: "Prime B21",
        class: "Class 2",
        date: "24-12-2024",
        score: "99"
    },
  ];
  
  export function TableDemoThree() {
    return (
      <Table className="border border-black">
        <TableCaption>
          A list of attendance
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Teacher Name</TableHead>
            <TableHead>Batch No.</TableHead>
            <TableHead>Class No.</TableHead>
            <TableHead>Assessment Score</TableHead>
            <TableHead className="text-right">Date</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendances.map((attendance, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{attendance.teacher}</TableCell>
              <TableCell>{attendance.batch}</TableCell>
              <TableCell>{attendance.class}</TableCell>
              <TableCell>{attendance.score}</TableCell>
              <TableCell className="text-right">{attendance.date}</TableCell>
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
          <TableCell className="text-right">{2}</TableCell>
        </TableRow>
      </TableFooter>
      </Table>
    );
  }
  