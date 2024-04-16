"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "@/components/user/EventCard";
import { CalendarDays, Flame, MapPin, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const listedEvents = [
    {
      title: "AR Rahman Concert for Peace",
      image:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380561/Evento/thumbnail/atif_aslam_vbrojn.png",

      slug: "abcd-xyz",
    },
    {
      title: "B Praak Live",
      image:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380759/Evento/thumbnail/b_praak2_opndqq.webp",

      slug: "abcd-xyz",
    },
  ];

  const searchResults = [
    {
      title: "AR Rahman Concert for Peace",
      image:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380561/Evento/thumbnail/atif_aslam_vbrojn.png",

      slug: "abcd-xyz",
    },
    {
      title: "B Praak Live",
      image:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380759/Evento/thumbnail/b_praak2_opndqq.webp",

      slug: "abcd-xyz",
    },
    {
      title: "SANAM Live",
      image:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/arijit_rjqfpd.jpg",

      slug: "abcd-xyz",
    },
    {
      title: "Simba Uproar 2024 | Guwahati",
      image:
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380563/Evento/thumbnail/zubin_a5pwbx.png",

      slug: "abcd-xyz",
    },
  ];

  const [searchKeyword, setSearchKeyword] = useState("null");
  return (
    <section className="max-w-screen-xl mx-auto px-6 mt-12">
      <div className="relative">
        <Search className="absolute w-4 top-[16px] left-3 text-gray-500" />
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
              <EventCard event={event} key={i} layout="horizontal" />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
