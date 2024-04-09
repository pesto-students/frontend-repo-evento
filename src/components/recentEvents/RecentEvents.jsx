import React from "react";
import { CalendarDays, History, MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

const events = [
  {
    title: "SANAM Live",
    images: ["https://pbs.twimg.com/media/FmChEr6XkAImZ4i.jpg"],
  },
  {
    title: "Simba Uproar 2024 | Guwahati",
    images: [
      "https://scontent.fgau3-3.fna.fbcdn.net/v/t39.30808-6/406267005_758329636336781_2133181235364031584_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=NFCcsN0Z3R4AX-PJHNh&_nc_ht=scontent.fgau3-3.fna&oh=00_AfAeehNAei831PRLQ14eAstu7nzq-t1bqySB-GsWoCNEjw&oe=660ADC76",
    ],
  },
  {
    title: "Kanan Gill Experience - India Tour 2024 - Guwahati",
    images: ["https://pbs.twimg.com/media/FmChEr6XkAImZ4i.jpg"],
  },
  {
    title: "Kisi Ko Batana Mat by Anubhav Singh Bassi",
    images: [
      "https://scontent.fgau3-3.fna.fbcdn.net/v/t39.30808-6/406267005_758329636336781_2133181235364031584_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=NFCcsN0Z3R4AX-PJHNh&_nc_ht=scontent.fgau3-3.fna&oh=00_AfAeehNAei831PRLQ14eAstu7nzq-t1bqySB-GsWoCNEjw&oe=660ADC76",
    ],
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
          <div
            key={i}
            className="grid grid-cols-12 border rounded-lg bg-white"
          >
            <div className="col-span-12 md:col-span-4">
              <Image
                width={480}
                height={360}
                className="object-cover w-full h-full  md:rounded-l-lg"
                src={event.images[0]}
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
                <FaAngleRight className="w-2 ml-1 text-primary" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentEvents;
