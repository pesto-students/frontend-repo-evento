"use client";

import EventDetails from "@/components/manager/EventDetails";
import EventMap from "@/components/manager/EventMap";
import Itinerary from "@/components/manager/Itinerary";
import { Button, Card, Tabs } from "antd";
import { ChevronLeftIcon, PencilIcon, Trash2Icon } from "lucide-react";
import React from "react";

const page = () => {
  const tabItems = [
    {
      key: "1",
      label: "Event Details",
      children: <EventDetails />,
    },
    {
      key: "2",
      label: "Itinerary",
      children: <Itinerary />,
    },
    {
      key: "3",
      label: "Event Map",
      children: <EventMap />,
    },
    {
      key: "4",
      label: "Lost & Found",
      children: "",
    },
    {
      key: "5",
      label: "Reviews",
      children: "",
    },
  ];

  return (
    <>
      <Card className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Button icon={<ChevronLeftIcon className="w-4 h-4" />} />
            <div>
              <div className="text-xs">Back to List</div>
              <div className="font-semibold">Event Preview</div>
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <Button
                type=""
                icon={<PencilIcon className="w-3 h-3 text-blue-500" />}
              />
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultActiveKey="3" items={tabItems} onChange={undefined} />
    </>
  );
};

export default page;
