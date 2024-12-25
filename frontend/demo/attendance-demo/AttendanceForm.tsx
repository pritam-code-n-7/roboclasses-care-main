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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

import PhoneInput from "react-phone-input-2";

const classes = [
  {
    id: "class1",
    label: "Class 1",
  },
  {
    id: "class2",
    label: "Class 2",
  },
] as const;

const FormSchema = z.object({
  date: z.string({ required_error: "A date is required." }),
  batch: z
    .string()
    .min(1, { message: "Batch number must contain atleast 1 character" }),
  teacher: z
    .string()
    .min(2, { message: "Teacher name must contain atleast 2 character." }),

  score: z.string().min(1,{message:"Assessment score must contain a value"}),

  classes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function AttendanceForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacher: "",
      date: format(new Date(), "yyyy-MM-dd"),
      classes: ["class1"],
      batch: "",
      score: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/attendances`,
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
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Teacher Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="type your teacher name"
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
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Number</FormLabel>

              <FormControl>
                <Input
                  placeholder="type your batch number"
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
          name="classes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="font-bold">
                  Class number!
                </FormLabel>
                <FormDescription>
                  Select a class number  
                </FormDescription>
              </div>
              {classes.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="classes"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold">
                Take attendance
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} required className="bg-white" />
              </FormControl>
              <FormDescription>
                Take attendance for your class!
              </FormDescription>
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
                  placeholder="type your assesment score"
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
