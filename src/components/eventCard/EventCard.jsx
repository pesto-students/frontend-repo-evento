import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="w-full border rounded-lg shadow-sm overflow-hidden bg-white">
      <div>
        <Link href={event.slug}>
          <Image
            width={480}
            height={360}
            objectFit="cover"
            src={event.images[0]}
            className="w-full rounded-t-md transition-transform duration-300"
            alt="Event Spotlight"
          />
        </Link>
      </div>
      <div className="p-6">
        <Link href="/">
          <h5 className="text-lg font-medium tracking-tight text-content line-clamp-1">
            {event.title}
          </h5>
        </Link>
        <div className="mt-4 flex items-center ">
          <div className="bg-secondary rounded-lg p-2 inline-block">
            <CalendarDays className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className=" text-sm ml-2 font-medium line-clamp-1">
              1 March, 2024 - 3 March, 2024
            </span>
            <span className=" text-xs ml-2 line-clamp-1">Monday, 3:00 PM</span>
          </div>
        </div>
        <div className="mt-2 flex items-center ">
          <div className="bg-secondary rounded-lg p-2 inline-block">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className=" text-sm ml-2 font-medium line-clamp-1">
              ACA Stadium, Barsapara
            </span>
            <span className=" text-xs ml-2 line-clamp-1">ENTRY - Starts From Rs 200</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
