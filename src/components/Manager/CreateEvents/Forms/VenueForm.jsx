"use client";

import React, { useState } from "react";
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

import { CirclePlus } from "@/components/others/Icons";

import { DatePicker, Input, Button, message } from "antd";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { clsx } from "clsx";
import { MapPin } from "lucide-react";

const formSchema = z.object({
  venue: z.string(),
  startDate: z.date(),
  endDate: z.string().min(1).max(50),
});

const VenueForm = () => {
  const [messageApi] = message.useMessage();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      venue: "",
      startDate: "",
      endDate: "",
    },
  });

  const [viewState, setViewState] = useState({
    longitude: 91.77634,
    latitude: 26.184169,
    zoom: 18,
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

  return (
    <>
      <div className="text-xs">Step 3 of 5</div>
      <div className="text-lg font-semibold">Set Venue & Time</div>
      <div className="mt-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-6">
              <div className="col-span-2">
                <div className="flex gap-2 items-center">
                  <CirclePlus className="w-4 stroke-primary" />
                  <span>Venue & Address</span>
                </div>
              </div>
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sarusajai stadium, Guwahati..."
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
                  <span>Start & End Date</span>
                </div>
              </div>
              <div className="col-span-4 grid grid-cols-4 gap-3">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <DatePicker
                          showTime
                          use12Hours
                          format={"YYYY-MM-DD hh:mm"}
                          onChange={(value, dateString) => {
                            console.log("Selected Time: ", value);
                            console.log(
                              "Formatted Selected Time: ",
                              dateString
                            );
                          }}
                          onOk={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <DatePicker
                          showTime
                          use12Hours
                          format={"YYYY-MM-DD hh:mm"}
                          onChange={(value, dateString) => {
                            console.log("Selected Time: ", value);
                            console.log(
                              "Formatted Selected Time: ",
                              dateString
                            );
                          }}
                          onOk={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6">
              <div className="col-span-2">
                <div className="flex gap-2 items-center">
                  <CirclePlus className="w-4 stroke-primary" />
                  <span>Entry Fee</span>
                </div>
              </div>
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum entry fee (Start from)</FormLabel>
                      <FormControl>
                        <Input placeholder="Entry fee" {...field} />
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
                  <span>Location</span>
                </div>
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select location</FormLabel>
                        <FormControl>
                          <Input placeholder="Entry fee" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2 overflow-hidden h-[300px] relative rounded-lg bg-gray-100">
                  <Map
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
                    {...viewState}
                    onMove={(evt) => setViewState(evt.viewState)}
                    mapStyle="mapbox://styles/mapbox/outdoors-v12"
                    attributionControl={false}
                    transitionDuration="200"
                    onViewportChange={(viewState) => setViewState(viewState)}
                    reuseMaps
                  >
                    <Marker
                      longitude={91.77634}
                      latitude={26.184169}
                      anchor="bottom"
                    >
                      <MapPin className="w-8 stroke-black stroke-1 fill-red-600" />
                    </Marker>
                  </Map>
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
  );
};

export default VenueForm;
