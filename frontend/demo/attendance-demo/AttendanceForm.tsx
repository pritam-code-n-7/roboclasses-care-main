/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const days = [
  {
    id: "1",
    label: "Day 1",
  },
  {
    id: "2",
    label: "Day 2",
  },
  {
    id: "3",
    label: "Day 3",
  },
  {
    id: "4",
    label: "Day 4",
  },
  {
    id: "5",
    label: "Day 5",
  },
  {
    id: "6",
    label: "Day 6",
  },
  {
    id: "7",
    label: "Day 7",
  },
];

const dates = [
  {
    id: format(new Date(), "yyyy-MM-dd")
  },
  {
    id: format(new Date(), "yyyy-MM-dd")
  },
  {
    id: format(new Date(), "yyyy-MM-dd")
  },
  {
    id: format(new Date(), "yyyy-MM-dd"),
  },
  {
    id: format(new Date(), "yyyy-MM-dd"),
  },
  {
    id: format(new Date(), "yyyy-MM-dd"),
  },
  {
    id: format(new Date(), "yyyy-MM-dd"),
  },
];

const FormSchema = z.object({

  batch: z
    .string()
    .min(1, { message: "Batch number must contain atleast 1 character" }),

  date: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one date.",
  }),
  days: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one day.",
  }),
  score: z.string().min(2,{message:"Assessment score must contain at least one digit"})
});

export function AttendanceForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batch: "",
      date: ["day1", "day2", "day3", "day4", "day5", "day6", "day7"],
      days: ["1"],
      score: ""
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/attendances`,
        data
      );
      console.log(res.data);
      form.reset();
    } catch (error) {
      console.error("Error booking appointment", error);
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Table>
          <TableCaption>A list of weekdays with time slot</TableCaption>
          <TableHeader>
            <TableRow>
              {days.map((item, index) => (
                <TableHead className="w-[100px]" key={index}>
                  {item.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {dates.map((item, index) => (
                <TableCell className="font-medium" key={index}>
                  <FormField
                    control={form.control}
                    name={`date.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="date" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>

        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Number</FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. Python B12 L1"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Assessment Score</FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. 94%"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
