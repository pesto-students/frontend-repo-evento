"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

import {
  MapPin,
  CalendarDays,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Flame,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import TagList from "../tagList/TagList";

const Spotlight = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const slideNext = () => emblaApi && emblaApi.scrollNext();
  const slidePrev = () => emblaApi && emblaApi.scrollPrev();
  const events = [
    {
      title: "AR Rahman Concert for Peace",
      images: [
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380554/Evento/thumbnail/ar_rahman_agweyu.webp",
      ],
    },
    {
      title: "B Praak Live",
      images: [
        "https://res.cloudinary.com/dv68nyejy/image/upload/v1712380562/Evento/thumbnail/b_praak_q2fzsf.jpg",
      ],
    },
  ];
  return (
    <section className="grid grid-cols-12 gap-6">
      <div className="col-span-12 flex justify-between items-center">
        <div className="flex  gap-2">
          <Flame className="text-primary" />
          <h2 className="text-lg font-semibold text-content uppercase">
            Event Spotlight
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={slidePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={slideNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8">
        <div className="overflow-hidden border rounded-lg" ref={emblaRef}>
          <div className="flex">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex-grow-0 flex-shrink-0 w-full min-w-0 flex flex-col lg:flex-row text-content"
              >
                <div className="w-full lg:w-6/12">
                  <Image
                    width={400}
                    height={400}
                    src={event.images[0]}
                    className="w-full h-full object-cover rounded-l"
                    alt="Event Spotlight"
                  />
                </div>
                <div className="w-full lg:w-6/12 bg-white p-6">
                  <h1 className="text-xl font-semibold line-clamp-1">
                    {event.title}
                  </h1>
                  <div className="mt-4 flex items-center ">
                    <div className="bg-secondary rounded-lg p-3 inline-block">
                      <CalendarDays className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="ml-4 font-medium line-clamp-1">
                        1 March, 2024 - 3 March, 2024
                      </span>
                      <span className="text-sm ml-4 line-clamp-1">
                        Monday, 3:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center ">
                    <div className="bg-secondary rounded-lg p-3 inline-block">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="ml-4 font-medium line-clamp-1">
                        ACA Stadium, Barsapara
                      </span>
                      <span className="text-sm ml-4 line-clamp-1">
                        ENTRY - Starts From Rs 200
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm md:block line-clamp-6 lg:line-clamp-3 xl:line-clamp-5">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Impedit, mollitia? Maiores, blanditiis nulla. Ducimus, ex
                    placeat? Quam consequatur voluptates provident quae, Lorem
                    ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
                    mollitia? Maiores, blanditiis nulla. Lorem ipsum, dolor sit
                    amet consectetur numquam vel commodi...
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer font-normal"
                    >
                      Music
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer font-normal"
                    >
                      Cultural
                    </Badge>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <Button>VIEW DETAILS</Button>
                    <Button variant="outline">
                      <Bookmark className="w-3 mr-1" />
                      <span>INTERESTED</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4">
        <TagList />
      </div>
    </section>
  );
};

export default Spotlight;
