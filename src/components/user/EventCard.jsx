import clsx from "clsx";
import { CalendarDays, ChevronRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventCard = ({ event, layout }) => {
  return (
    <div className="w-full grid grid-cols-12 border rounded-lg bg-white overflow-hidden">
      <div
        className={clsx({
          "col-span-12": layout === "vertical",
          "col-span-12 md:col-span-4": layout === "horizontal",
        })}
      >
        <Link href={"test"}>
          <Image
            width={480}
            height={360}
            src={event.thumbnailUrl}
            className={clsx("w-full transition-transform duration-300", {
              "rounded-t-md": layout === "vertical",
              "rounded-t-md md:rounded-t-none md:rounded-l-md":
                layout === "horizontal",
            })}
            alt="Event Spotlight"
          />
        </Link>
      </div>
      <div
        className={clsx("p-6", {
          "col-span-12": layout === "vertical",
          "col-span-12 md:col-span-8 flex flex-col ": layout === "horizontal",
        })}
      >
        <Link href="/">
          <h5 className="text-lg font-medium tracking-tight text-content line-clamp-1">
            {event.title}
          </h5>
        </Link>

        {layout === "vertical" && (
          <>
            <div className="mt-4 flex items-center ">
              <div className="bg-secondary rounded-lg p-2 inline-block">
                <CalendarDays className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className=" text-sm ml-2 font-medium line-clamp-1">
                  1 March, 2024 - 3 March, 2024
                </span>
                <span className=" text-xs ml-2 line-clamp-1">
                  Monday, 3:00 PM
                </span>
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
                <span className=" text-xs ml-2 line-clamp-1">
                  ENTRY - Starts From Rs 200
                </span>
              </div>
            </div>
          </>
        )}

        {layout === "horizontal" && (
          <>
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
              <ChevronRight className="w-4 ml-1 text-primary" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;

//   <div key={i} className="grid grid-cols-12 border rounded-lg bg-white">
//     <div className="col-span-12 md:col-span-4">
//       <Image
//         width={480}
//         height={360}
//         className="object-cover w-full h-full  md:rounded-l-lg"
//         src={event.image}
//         alt={event.title}
//       />
//     </div>
//     <div className="col-span-12 md:col-span-8 flex flex-col py-6 px-6">
//       <Link href="/">
//         <h5 className="text-lg font-medium tracking-tight text-content line-clamp-1">
//           {event.title}
//         </h5>
//       </Link>
//       <div className="mt-4 flex items-center ">
//         <CalendarDays className="w-4 h-4 text-primary" />
//         <div className="text-sm ml-2 font-medium line-clamp-1">
//           1 March, 2024 - 3 March, 2024
//         </div>
//       </div>
//       <div className="mt-2 flex items-center ">
//         <MapPin className="w-4 h-4 text-primary" />
//         <div className="text-sm ml-2 font-medium line-clamp-1 ">
//           ACA Stadium, Barsapara
//         </div>
//       </div>
//       <div className="mt-2 flex items-center ">
//         <div className="flex">
//           <Star className="w-4 h-4 text-primary fill-primary" />
//           <Star className="w-4 h-4 text-primary fill-primary" />
//           <Star className="w-4 h-4 text-primary fill-primary" />
//           <Star className="w-4 h-4 text-primary fill-primary" />
//           <Star className="w-4 h-4 text-primary" />
//         </div>
//         <div className="text-sm ml-2 font-medium line-clamp-1 ">
//           23 Reviews
//         </div>
//       </div>
//       <Link href={"/"} className="mt-2 flex items-center">
//         <div className="text-sm font-semibold text-primary">
//           View Details
//         </div>
//         <ChevronRight className="w-4 ml-1 text-primary" />
//       </Link>
//     </div>
//   </div>
