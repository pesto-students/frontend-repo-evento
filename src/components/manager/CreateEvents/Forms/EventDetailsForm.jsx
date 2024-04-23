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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "@/components/others/Icons";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";
import { message } from "antd";

const style = {
  control: (base, state) => ({
    ...base,
    border:
      state.isFocused || state.isActive ? "1px solid red" : "1px solid #e5e5e5",
    boxShadow: "none",
  }),
};

const optionSchema = z.object({
  label: z.string(),
  value: z.number(),
});

const formSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(50),
  categories: z.array(optionSchema).min(1),
});

const EventDetailsForm = () => {
  const [messageApi] = message.useMessage();
  const { eventCategories } = useCreateEventContext();

  // This is a temp fix for the react select package
  const [isMounted, setIsMounted] = useState(false);

  const categorySelectOptions = eventCategories.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }));

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
          <div className="text-xs">Step 1 of 5</div>
          <div className="text-lg font-semibold">Event Details</div>
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
                      <span>Event Title</span>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type the event title here..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6">
                  <div className="col-span-2">
                    <div className="flex gap-2 items-center">
                      <CirclePlus className="w-4 stroke-primary" />
                      <span>Event Category</span>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categories</FormLabel>
                          <FormControl>
                            <Select
                              //   defaultValue={[options[0], options[1]]}
                              value={field.value}
                              placeholder="Select categories..."
                              isMulti
                              options={categorySelectOptions}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={field.onChange}
                              styles={style}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6">
                  <div className="col-span-2">
                    <div className="flex gap-2 items-center">
                      <CirclePlus className="w-4 stroke-primary" />
                      <span>Event Description</span>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description*</FormLabel>
                          <FormControl>
                            <Textarea
                              rows="8"
                              placeholder="Type the description here..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6">
                  <div className="col-span-2"></div>
                  <div className="col-span-3">
                    <Button variant="default" type="submit" size="sm">
                      Save
                    </Button>
                    <Button variant="secondary" size="sm" className="ml-2">
                      Next
                    </Button>
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

export default EventDetailsForm;
