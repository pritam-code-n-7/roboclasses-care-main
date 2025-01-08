import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";

interface ExcelLikeTableProps {
  classAssessmentPairs: { class: string; assessment: string }[];
  onAddFields: () => void;
}

interface RowData {
  date: string;
  batchName: string;
  [key: string]: string;
}

export default function AttendanceTable({
  classAssessmentPairs,
  onAddFields,
}: ExcelLikeTableProps) {
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("excelLikeData");
    if (savedData) {
      setRows(JSON.parse(savedData));
    } else {
      addRow(); // Add an initial row if no data is saved
    }
  }, []);

  const handleInputChange = (
    rowIndex: number,
    field: string,
    value: string
  ) => {
    const newRows = [...rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [field]: value };
    setRows(newRows);
  };

  const addRow = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    setRows([...rows, { date: currentDate, batchName: "" }]);
  };

  const saveData = () => {
    localStorage.setItem("excelLikeData", JSON.stringify(rows));
    // toast({
    //   title: "Congratulations!",
    //   description: "You have successsfully submitted the attendance.✅",
    //   variant: "default",
    // });
    console.log("You have successfully submitted the attendance.");
    
  };

  return (
    <div>
      <Table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Date</th>
            <th className="border p-2">Batch Name</th>
            {classAssessmentPairs.map(
              ({ class: className, assessment }, index) => (
                <React.Fragment key={index}>
                  <th className="border p-2">{className}</th>
                  <th className="border p-2">{assessment}</th>
                </React.Fragment>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border p-2">
                <Input
                  type="date"
                  value={row.date}
                  onChange={(e) =>
                    handleInputChange(rowIndex, "date", e.target.value)
                  }
                  className="w-full"
                />
              </td>
              <td className="border p-2">
                <Input
                  value={row.batchName}
                  onChange={(e) =>
                    handleInputChange(rowIndex, "batchName", e.target.value)
                  }
                  className="w-full"
                />
              </td>
              {classAssessmentPairs.map(
                ({ class: className, assessment }, index) => (
                  <React.Fragment key={index}>
                    <td className="border p-2">
                      <Input
                        value={row[className] || ""}
                        onChange={(e) =>
                          handleInputChange(rowIndex, className, e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        value={row[assessment] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            rowIndex,
                            assessment,
                            e.target.value
                          )
                        }
                        className="w-full"
                        type="number"
                      />
                    </td>
                  </React.Fragment>
                )
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-4 space-x-2">
        <Button onClick={addRow}>Add Row</Button>
        <Button onClick={saveData}>Save</Button>
        <Button onClick={onAddFields}>Add Class and Assessment</Button>
      </div>
    </div>
  );
}
