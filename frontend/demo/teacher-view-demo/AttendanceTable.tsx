"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

type Column = {
  id: string;
  name: string;
  type: "date" | "batch" | "class" | "assessment";
};

type Row = {
  id: string;
  cells: { [key: string]: string };
};

export default function AttendanceTable() {
  const [columns, setColumns] = useState<Column[]>([
    { id: "startDate", name: "Start Date", type: "date" },
    { id: "batchName", name: "Batch Name", type: "batch" },
    { id: "class1", name: "Class 1", type: "class" },
    { id: "assessment1", name: "Assessment 1", type: "assessment" },
  ]);

  const [rows, setRows] = useState<Row[]>([{ id: "1", cells: {} }]);

  const addColumn = (type: "class" | "assessment") => {
    if (columns.length >= 60) {
      toast({
        title: "Sorry!",
        description: "Maximum limit of 60 columns reached",
        variant: "destructive",
      });
      return;
    }

    const count = columns.filter((col) => col.type === type).length + 1;
    const newColumn: Column = {
      id: `${type}${count}`,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
      type: type,
    };

    setColumns([...columns, newColumn]);
  };

  const handleAddClass = () => addColumn("class");

  const handleAddClassAndAssessment = () => {
    if (columns.length >= 59) {
      toast({
        title:"Sorry!",
        description:"Cannot add both class and assessment. Maximum limit of 60 columns would be exceeded",
        variant: "destructive",
      });
      return;
    }

    const classCount = columns.filter((col) => col.type === "class").length + 1;
    const newClassColumn: Column = {
      id: `class${classCount}`,
      name: `Class ${classCount}`,
      type: "class",
    };

    const newAssessmentColumn: Column = {
      id: `assessment${classCount}`,
      name: `Assessment ${classCount}`,
      type: "assessment",
    };

    setColumns([...columns, newClassColumn, newAssessmentColumn]);
  };

  const handleAddRow = () => {
    const newRow: Row = {
      id: (rows.length + 1).toString(),
      cells: {},
    };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (
    rowId: string,
    columnId: string,
    value: string
  ) => {
    setRows(
      rows.map((row) =>
        row.id === rowId
          ? { ...row, cells: { ...row.cells, [columnId]: value } }
          : row
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-2">
        <Button onClick={handleAddClass}>Add Class</Button>
        <Button onClick={handleAddClassAndAssessment}>
          Add Class and Assessment
        </Button>
        <Button onClick={handleAddRow}>Add Row</Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${column.id}`}>
                    <Input
                      type="text"
                      placeholder={`Enter ${column.name}`}
                      value={row.cells[column.id] || ""}
                      onChange={(e) =>
                        handleInputChange(row.id, column.id, e.target.value)
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
