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
import TeacherViewTableDateWise from "@/demo/teacher-view-demo/TeacherViewTableDateWise";
import { Separator } from "@radix-ui/react-separator";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
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
                  {pathname == "/teacherView" && "Teacher View"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="w-[1200px] grid grid-cols-1 space-y-10 px-20 mt-10">
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold">Teachers View</p>
          <Link href={"/attendance"}>
            <PlusCircle
              size={50}
              className="text-zinc-500 hover:text-zinc-300 transition-colors duration-150 delay-75"
            />
            
          </Link>
        </div>
        <TeacherViewTableDateWise />
      </div>
    </SidebarInset>
  );
};

export default Page;
