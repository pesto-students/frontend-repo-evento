import React from "react";
import { History } from "lucide-react";
import { Button } from "../ui/button";
import EventCard from "./EventCard";
import { Skeleton } from "antd";

const RecentEvents = ({ loading, events }) => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <History className="text-primary" />
          <h2 className="text-lg font-semibold text-content uppercase">
            Recent Events
          </h2>
        </div>
        <Button variant="outline">VIEW ALL</Button>
      </div>

      {loading && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event, i) => (
          <EventCard event={event} key={i} layout="horizontal" />
        ))}
      </div>
    </section>
  );
};

export default RecentEvents;
