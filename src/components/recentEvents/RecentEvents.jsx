import React from "react";
import {
  CalendarDays,
  History,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const events = [
  {
    title: "SANAM Live",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/zubin_a5pwbx.png",
  },
  {
    title: "Simba Uproar 2024 | Guwahati",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/arijit_rjqfpd.jpg",
  },
  {
    title: "Kanan Gill Experience - India Tour 2024 - Guwahati",
    image:
      "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380562/Evento/thumbnail/b_praak_q2fzsf.jpg",
  },
  {
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
          <div key={i} className="grid grid-cols-12 border rounded-lg bg-white">
            <div className="col-span-12 md:col-span-4">
              <Image
                width={480}
                height={360}
                className="object-cover w-full h-full  md:rounded-l-lg"
                src={event.image}
                alt={event.title}
              />
            </div>
            <div className="col-span-12 md:col-span-8 flex flex-col py-6 px-6">
              <Link href="/">
                <h5 className="text-lg font-medium tracking-tight text-content line-clamp-1">
                  {event.title}
                </h5>
              </Link>
              <div className="mt-4 flex items-center ">
                <CalendarDays className="w-4 h-4 text-primary" />
                <div className="text-sm ml-2 font-medium line-clamp-1">
                  1 March, 2024 - 3 March, 2024
                </div>
              </div>
              <div className="mt-2 flex items-center ">
                <MapPin className="w-4 h-4 text-primary" />
                <div className="text-sm ml-2 font-medium line-clamp-1 ">
                  ACA Stadium, Barsapara
                </div>
              </div>
              <div className="mt-2 flex items-center ">
                <div className="flex">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <div className="text-sm ml-2 font-medium line-clamp-1 ">
                  23 Reviews
                </div>
              </div>
              <Link href={"/"} className="mt-2 flex items-center">
                <div className="text-sm font-semibold text-primary">
                  View Details
                </div>
                <ChevronRight className="w-2 ml-1 text-primary" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentEvents;
