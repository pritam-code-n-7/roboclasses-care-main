"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-4xl font-semibold">Manage Attendance</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <Link
        href="#"
        className="rounded-md border flex items-center p-2 h-10 font-bold text-sm"
      >
        New Batch Entry
      </Link>
      <CollapsibleContent className="space-y-2">
        <Link
          href="#"
          className="rounded-md border flex items-center p-2 h-10 font-bold text-sm"
        >
          Active Batches
        </Link>
        <Link
          href="#"
          className="rounded-md border flex items-center p-2 h-10 font-bold text-sm"
        >
          Past Batches
        </Link>
      </CollapsibleContent>
    </Collapsible>
  );
}
