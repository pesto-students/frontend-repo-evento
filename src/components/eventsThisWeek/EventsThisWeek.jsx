import { CalendarCheck2 } from "lucide-react";
import React from "react";

const EventsThisWeek = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 text-content mt-12">
      <div className="flex gap-2">
        <CalendarCheck2 className="text-primary" />
        <h2 className="text-lg font-semibold text-content uppercase">
          Events This Week
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="border rounded-lg p-4 cursor-pointer bg-white">
          <h4 className="text-primary font-semibold text-2xl">Today</h4>
          <h5 className="text-content mt-1">Sat, 17 Feb</h5>
        </div>
        <div className="border rounded-lg p-4 cursor-pointer bg-white">
          <h4 className="text-primary font-semibold text-2xl">Tomorrow</h4>
          <h5 className="text-content mt-1">Sun, 17 Feb</h5>
        </div>
        <div className="border rounded-lg p-4 cursor-pointer bg-white">
          <h4 className="text-primary font-semibold text-2xl">Weekend</h4>
          <h5 className="text-content mt-1">17 - 18 Feb</h5>
        </div>
      </div>
    </section>
  );
};

export default EventsThisWeek;
