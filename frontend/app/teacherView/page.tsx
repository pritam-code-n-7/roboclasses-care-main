"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AttendanceTable from "@/demo/teacher-view-demo/AttendanceTable";
import { Separator } from "@radix-ui/react-separator";
import { useState, useEffect } from "react";

interface ClassAssessmentPair {
  class: string;
  assessment: string;
}

export default function Home() {
  const [classAssessmentPairs, setClassAssessmentPairs] = useState<
    ClassAssessmentPair[]
  >([]);

  useEffect(() => {
    const savedPairs = localStorage.getItem("excelLikeClassAssessmentPairs");
    if (savedPairs) {
      setClassAssessmentPairs(JSON.parse(savedPairs));
    } else {
      // Initialize with two pairs if no saved data
      setClassAssessmentPairs([
        { class: "Class 1", assessment: "Assessment 1" },
        { class: "Class 2", assessment: "Assessment 2" },
      ]);
    }
  }, []);

  const addFields = () => {
    const newPairs = [
      ...classAssessmentPairs,
      {
        class: `Class ${classAssessmentPairs.length + 1}`,
        assessment: `Assessment ${classAssessmentPairs.length + 1}`,
      },
    ];
    setClassAssessmentPairs(newPairs);
    localStorage.setItem(
      "excelLikeClassAssessmentPairs",
      JSON.stringify(newPairs)
    );
  };

  return (
    <SidebarInset className="w-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Scheduler</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{"Take Attendance"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="grid grid-cols-1 ">
        <h1 className="text-2xl font-bold mb-4">Teachers View</h1>
        <AttendanceTable
          classAssessmentPairs={classAssessmentPairs}
          onAddFields={addFields}
        />
      </main>
    </SidebarInset>
  );
}
