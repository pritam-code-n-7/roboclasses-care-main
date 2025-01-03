"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { CollapsibleDemo } from "@/demo/admin-dashboard/CollapsibleDemo";
import { TableDemoOne } from "@/demo/admin-dashboard/TableDemoOne";
import { TableDemoThree } from "@/demo/admin-dashboard/TableDemoThree";
import { TableDemoTwo } from "@/demo/admin-dashboard/TableDemoTwo";
import TeacherViewTableDateWise from "@/demo/teacher-view-demo/TeacherViewTableDateWise";
import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation";
import React from "react";

const Page = () => {
  const pathname = usePathname();
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
                <BreadcrumbPage>
                  {pathname == "/adminDashboard" && "Admin Dashboard"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="w-[1200px] grid grid-cols-1 space-y-10 px-20 mt-10">
        <p className="font-bold text-4xl">Manage Appointments</p>
        <TableDemoOne />
        <TableDemoTwo />
      </div>
      <div className="w-[1200px] grid grid-cols-1 space-y-10 p-20">
        <CollapsibleDemo />
        <TableDemoThree />
        <TeacherViewTableDateWise />
      </div>
    </SidebarInset>
  );
};

export default Page;
