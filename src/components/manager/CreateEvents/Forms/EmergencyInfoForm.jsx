"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, Button, message } from "antd";
import { CirclePlus } from "@/components/others/Icons";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";

import { Plus, PlusCircle, Search } from "lucide-react";

const optionSchema = z.object({
  label: z.string(),
  value: z.number(),
});

const formSchema = z.object({
  title: z.string().min(1).max(50),
  organizer: z.string().min(1).max(50),
  description: z.string().min(1).max(50),
  categories: z.array(optionSchema).min(1),
});

const EmergencyInfoForm = () => {
  const [messageApi] = message.useMessage();

  // This is a temp fix for the react select package
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
    },
  });

  const onSubmit = (values) => {
    const categories = values.categories.map((cat) => cat.value);
    values = { ...values, categories };
    console.log(values);
    // call api to save data
    messageApi.open({
      type: "success",
      content: "Event details are saved. You can proceed to the next step now!",
    });
  };

  // This is a temp fix for the react select package
  useEffect(() => setIsMounted(true), []);

  return (
    <>
      {isMounted && (
        <>
          <div className="text-xs">Step 4 of 5</div>
          <div className="text-lg font-semibold">Host Information</div>
          <div className="mt-12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-6">
                  <div className="col-span-2">
                    <div className="flex gap-2 items-center">
                      <CirclePlus className="w-4 stroke-primary" />
                      <span>Organizer</span>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="organizerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organizer Name*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Who is organizing the envent?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3">
                      <FormField
                        control={form.control}
                        name="organizerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organizer email*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type the email of the event"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3">
                      <FormField
                        control={form.control}
                        name="organizerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organizer contact*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type organizer contact number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-6">
                  <div className="col-span-2"></div>
                  <div className="col-span-3">
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Button className="ml-2">Next</Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default EmergencyInfoForm;
