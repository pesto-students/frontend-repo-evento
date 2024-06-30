import { CalendarClock } from "lucide-react";
import React from "react";
import EventCard from "./EventCard";
import { Button } from "../ui/button";
import { Skeleton } from "antd";

const UpcomingEvents = ({ loading, events }) => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <CalendarClock className="text-primary" />
          <h2 className="text-lg font-semibold text-content uppercase">
            Upcoming Events
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

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((item, i) => (
          <EventCard event={item} key={i} layout="vertical" />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
