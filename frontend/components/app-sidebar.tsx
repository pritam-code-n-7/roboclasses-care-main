"use client"

import * as React from "react"
import {
  Edit2Icon,
  EqualApproximatelyIcon,
  LayoutDashboard,
  LifeBuoy,
  MessageCircleQuestion,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { LOGO_IMG } from "@/constants/images"

const data = {
  user: {
    name: "Dev",
    email: "devstidax@gmail.com",
    avatar: {image:LOGO_IMG},
  },
  navMain: [
    {
      title: "Take Appointment",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Demo Class",
          url: "/appointment/reminder/demo-class",
        },
        {
          title: "Normal Class",
          url: "/appointment/reminder/normal-class",
        },
       
      ],
    },
    {
      title: "Admnin Dashboard",
      url: "/adminDashboard",
      icon: LayoutDashboard,
      isActive: false,
      items: [
        {
          title: "Calender View",
          url: "#",
        },
        {
          title: "Modify Appointments",
          url: "#",
        },
        {
          title: "Track Appointments",
          url: "#",
        },
       
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Upcoming Appointments",
      url: "#",
      icon: EqualApproximatelyIcon,
    },
    {
      name: "Bulk Appointments",
      url: "#",
      icon: MessageCircleQuestion,
    },
    {
      name: "Modify Appointments",
      url: "#",
      icon: Edit2Icon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} >
      <SidebarHeader  className="rounded">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
               <Image src={'/assests/images/logo.svg'} height={100} width={150} alt="robo-class-logo"/>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-neutral-300 rounded">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-neutral-400 rounded">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
