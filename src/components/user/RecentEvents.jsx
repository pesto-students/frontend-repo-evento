import React from "react";
import { History } from "lucide-react";
import { Button } from "../ui/button";
import EventCard from "./EventCard";

const events = [
  {
    slug: "abcd-xyz",
    title: "SANAM Live",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/zubin_a5pwbx.png",
  },
  {
    slug: "abcd-xyz",
    title: "Simba Uproar 2024 | Guwahati",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/arijit_rjqfpd.jpg",
  },
  {
    slug: "abcd-xyz",
    title: "Kanan Gill Experience - India Tour 2024 - Guwahati",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380562/Evento/thumbnail/b_praak_q2fzsf.jpg",
  },
  {
    slug: "abcd-xyz",
    title: "Kisi Ko Batana Mat by Anubhav Singh Bassi",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380561/Evento/thumbnail/atif_aslam_vbrojn.png",
  },
];

const RecentEvents = () => {
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
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event, i) => (
          <EventCard event={event} key={i} layout="horizontal" />
        ))}
      </div>
    </section>
  );
};

export default RecentEvents;
