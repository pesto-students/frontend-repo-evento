import EventCard from "@/components/eventCard/EventCard";
import Instructions from "@/components/instructions/Instructions";
import Itinerary from "@/components/itinerary/Itinerary";
import Sponsors from "@/components/sponsors/Sponsors";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightSquare,
  Bookmark,
  CalendarDays,
  Info,
  Lightbulb,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const events = [
  {
    title: "Simba Uproar 2024 | Guwahati",
    images: [
      "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_800/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1706699255%2Fdlbitczmy7n2v17uc4xy.png",
    ],
    slug: "abcd-xyz",
  },
  {
    title: "Kanan Gill Experience - India Tour 2024 - Guwahati",
    images: [
      "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_800/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1700556828%2Fiqwn93dgvkpc8vp8bvml.jpg",
    ],
    slug: "abcd-xyz",
  },
  {
    title: "Kisi Ko Batana Mat by Anubhav Singh Bassi",
    images: [
      "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_800/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1707894012%2Fmc6dexmf8biost4q27h6.png",
    ],
    slug: "abcd-xyz",
  },
];

export default function EventDetails() {
  return (
    <>
      <section className="max-w-screen-xl mx-auto px-6 mt-12">
        <div className="w-full flex flex-col lg:flex-row gap-6 text-content">
          <div className="w-full lg:w-8/12">
            <Image
              width={480}
              height={360}
              src="https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1702288015%2Fdhlkrsbpopg5cfpnz23n.jpg"
              className="w-full object-cover rounded-md"
              alt="Event Spotlight"
            />
          </div>
          <div className="w-full lg:w-4/12 ">
            <div className="border shadow-sm p-6 rounded-lg bg-white">
              <h1 className="text-xl font-semibold line-clamp-1">
                B Praak Live
              </h1>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline" className="cursor-pointer font-normal">
                  Music
                </Badge>
                <Badge variant="outline" className="cursor-pointer font-normal">
                  Cultural
                </Badge>
              </div>
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

              <div className="mt-4 flex gap-4">
                <Button>
                  <ArrowUpRightSquare className="w-4 mr-1 rotate-45" />
                  <span>DIRECTION</span>
                </Button>
                <Button variant="outline">
                  <Bookmark className="w-4 mr-1" />
                  <span>INTERESTED</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto px-6 mt-12">
        <div className="border-b pb-2">
          <div className="flex gap-2 items-center">
            <Info className="text-primary" />
            <h2 className="text-lg font-semibold text-content uppercase">
              About The Event
            </h2>
          </div>
        </div>
        <p className="mt-6">
          Simba Uproar is back for its highly anticipated second season of the
          country’s wildest experience. After a thrilling debut season, Simba
          Uproar 2.0 promises to be bigger, bolder, and more captivating than
          ever before, as it expands to six vibrant cities across India.
        </p>
        <p className="mt-4">
          Mumbai, Delhi, Bengaluru, Pune, Guwahati and Panchkula - Simba Uproar
          2.0 aims to unite music enthusiasts from all corners of the country
          for an unparalleled celebration of music and culture. The second
          season of Simba Uproar is set to take the country by storm, with a
          line-up of stellar performances by upcoming hip-hop artists,
          electrifying music acts, along with immersive experiences, including
          interactive installations, special performances, creating an
          atmosphere of fun and excitement. Join Simba Uproar’s #THEWILDTRIBE &
          roar harder, Together!
        </p>
      </section>
      <Sponsors />
      <Instructions />
      <Itinerary />
      <section className="max-w-screen-xl mx-auto px-6 mt-12">
        <div className="flex gap-2 items-center">
          <Lightbulb className="text-primary" />
          <h2 className="text-lg font-semibold text-content uppercase">
            You May Also Like
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((item, i) => (
            <EventCard event={item} key={i} />
          ))}
        </div>
      </section>

      <Link
        href="/abcd-xyz/overview"
        className="fixed right-6 bg-primary bottom-6 text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-arrow-out-up-right"
        >
          <path d="M22 12A10 10 0 1 1 12 2" />
          <path d="M22 2 12 12" />
          <path d="M16 2h6v6" />
        </svg>
      </Link>
    </>
  );
}
