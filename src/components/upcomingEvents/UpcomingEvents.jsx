import { CalendarClock } from "lucide-react";
import React from "react";
import EventCard from "../eventCard/EventCard";
import { Button } from "../ui/button";

const events = [
  {
    title: "AR Rahman Concert for Peace",
    images: [
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380561/Evento/thumbnail/atif_aslam_vbrojn.png",
    ],
    slug: "abcd-xyz",
  },
  {
    title: "B Praak Live",
    images: [
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380759/Evento/thumbnail/b_praak2_opndqq.webp",
    ],
    slug: "abcd-xyz",
  },
  {
    title: "SANAM Live",
    images: [
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/arijit_rjqfpd.jpg",
    ],
    slug: "abcd-xyz",
  },
  {
    title: "Simba Uproar 2024 | Guwahati",
    images: [
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/zubin_a5pwbx.png",
    ],
    slug: "abcd-xyz",
  },
];

const UpcomingEvents = () => {
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
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((item, i) => (
          <EventCard event={item} key={i} />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
