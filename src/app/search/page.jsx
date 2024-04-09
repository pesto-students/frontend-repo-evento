"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, Flame, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Page = () => {
  const listedEvents = [
    {
      title: "AR Rahman Concert for Peace",
      image:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380554/Evento/thumbnail/ar_rahman_agweyu.webp",
    },
    {
      title: "Kisi Ko Batana Mat by Anubhav Singh Bassi",
      image:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380562/Evento/thumbnail/b_praak_q2fzsf.jpg",
    },
  ];

  const searchResults = [
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

  const [searchKeyword, setSearchKeyword] = useState("null");
  return (
    <section className="max-w-screen-xl mx-auto px-6 mt-12">
      <div className="relative">
        <HiMagnifyingGlass className="absolute top-5 left-3 text-gray-500" />
        <Input
          id="name"
          placeholder="Find your next concert, comedy show..."
          className="col-span-3 h-14 pl-8"
        />
      </div>

      {!searchKeyword && (
        <>
          <div className="flex gap-6 items-center justify-between mt-6">
            <div className="flex gap-2">
              <Flame className="text-primary" />
              <h2 className="text-lg font-semibold text-content uppercase">
                All Events
              </h2>
            </div>
            <hr className="flex-1" />
          </div>
          <div className="flex gap-3 mt-6">
            <Button>Trending</Button>
            <Button variant="outline">This Weekend</Button>
            <Button variant="outline">Free Entry</Button>
          </div>
          <div className="mt-6">
            {listedEvents.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-3 rounded-lg border p-4 mb-3 bg-gray-50 cursor-pointer"
              >
                <div className="col-span-12 md:col-span-8 flex gap-3 md:gap-6">
                  <div>
                    <Image
                      width={480}
                      height={360}
                      className="object-cover w-14 h-full rounded"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="font-semibold text-lg line-clamp-1">
                      {item.title}
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer py-1 px-4 bg-white"
                      >
                        Music
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer py-1 px-4 bg-white"
                      >
                        Comedy
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4 flex flex-col">
                  <div className="flex items-center ">
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
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {searchKeyword && (
        <>
          <div className="mt-6 border-b flex gap-2 pb-3 flex-wrap">
            <Badge
              variant="outline"
              className="cursor-pointer py-1 px-4 bg-white whitespace-nowrap"
            >
              Music (4)
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer py-1 px-4 bg-white"
            >
              Comedy (1)
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer py-1 px-4 bg-white"
            >
              Food & Drinks (1)
            </Badge>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {searchResults.map((event, i) => (
              <div key={i} className="grid grid-cols-12  gap-6 bg-white">
                <div className="col-span-12 md:col-span-4">
                  <Image
                    width={480}
                    height={360}
                    className="object-cover w-full h-full rounded-lg"
                    src={event.images[0]}
                    alt={event.title}
                  />
                </div>
                <div className="col-span-12 md:col-span-8 flex flex-col px-3 md:px-0">
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
        </>
      )}
    </section>
  );
};

export default Page;
