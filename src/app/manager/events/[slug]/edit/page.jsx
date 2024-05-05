// "use client";
import EditEventDetails from "@/components/manager/EditEvent/Forms/EditEventDetails";
import EditItinerary from "@/components/manager/EditEvent/Forms/EditItinerary";

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
    children: "Content of Tab Pane 3",
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
