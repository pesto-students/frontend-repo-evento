import EventsThisWeek from "@/components/user/EventsThisWeek";
import PopularCities from "@/components/user/PopularCities";
import RecentEvents from "@/components/user/RecentEvents";
import Spotlight from "@/components/user/Spotlight";
import UpcomingEvents from "@/components/user/UpcomingEvents";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-gray-100 relative h-[400px] mb-[650px] md:mb-[900px] lg:mb-[200px]">
        <div className="max-w-screen-xl mx-auto p-6 text-content grid grid-cols-12 gap-6 absolute inset-0">
          <div className="col-span-12 flex gap-3 flex-col lg:flex-row justify-between border-b pb-2">
            <h2 className="text-lg font-semibold text-content mt-12 md:mt-0">
              Evento Guwahati
            </h2>
            <div className="flex max-w-full items-center gap-3 text-primary font-medium">
              <div className="flex gap-3 truncate">
                <Link href={"/"}>Mumbai</Link>
                <Link href={"/"}>Delhi</Link>
                <Link href={"/"}>Pune</Link>
                <Link href={"/"}>Kolkata</Link>
                <Link href={"/"}>Banglore</Link>
                <Link href={"/"}>Chennai</Link>
                <Link href={"/"}>Noida</Link>
              </div>
              <div className="border-l flex items-center gap-1 pl-3 whitespace-nowrap">
                <ChevronRight className="w-2" />
                More Cities
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between col-span-12">
            <Spotlight />
          </div>
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto px-6 text-content mt-12 lg:hidden">
        <form className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-5 opacity-50" />
            </div>
            <input
              type="search"
              className="block w-full p-4 ps-10 text-sm border rounded-lg bg-white outline-none focus:border-primary"
              placeholder="Search events, Location..."
              required
            />
          </div>
        </form>
      </section>

      <UpcomingEvents />
      <RecentEvents />
      <PopularCities />
      <EventsThisWeek />
    </>
  );
}
