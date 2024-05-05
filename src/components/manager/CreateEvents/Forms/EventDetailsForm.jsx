"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";
import { Button, Card, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";

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

  const options = [];

  return (
    <>
      <div className="text-xs">Step 1 of 5</div>
      <div className="text-lg font-semibold">Event Details</div>
      <Card className="!mt-12">
        <form onSubmit={() => {}} className="space-y-8">
          <div>
            <label>Title*</label>
            <Input placeholder="Type the event title here..." />
          </div>

          <div>
            <label>Title*</label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={() => {}}
              options={options}
            />
          </div>

          <div>
            <label>Description*</label>
            <TextArea rows={8} />
          </div>

          <div>
            <Button type="primary">Next</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default EventDetailsForm;
