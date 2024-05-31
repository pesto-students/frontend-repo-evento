"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, Button, message, Card } from "antd";
import { CirclePlus } from "@/components/others/Icons";
import { useCreateEventContext } from "@/context/manager/CreateEventContext";

import { Plus, PlusCircle, Search } from "lucide-react";

const EmergencyInfoForm = () => {
  const [messageApi] = message.useMessage();

  // This is a temp fix for the react select package
  const [isMounted, setIsMounted] = useState(false);

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
          <Card className="!mt-12">
            <Form>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div>
                  <div>
                    <FormField
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

                <div>
                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </>
      )}
    </>
  );
};

export default EmergencyInfoForm;
