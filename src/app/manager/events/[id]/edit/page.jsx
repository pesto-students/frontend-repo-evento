// "use client";
import EditEventDetails from "@/components/manager/EditEvent/EditEventDetails";
import EditItinerary from "@/components/manager/EditEvent/EditItinerary";
import EditMap from "@/components/manager/EditEvent/EditMap";

import { Tabs } from "antd";

const items = [
  {
    key: "1",
    label: "Event Details",
    children: <EditEventDetails />,
  },
  {
    key: "2",
    label: "Itinerary",
    children: <EditItinerary />,
  },
  {
    key: "3",
    label: "Event Map",
    children: <EditMap />,
  },
];

const Page = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default Page;
