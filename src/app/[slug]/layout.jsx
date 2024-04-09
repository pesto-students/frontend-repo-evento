"use client";

import clsx from "clsx";
import {
  BookOpen,
  FolderSearch,
  ListChecks,
  ListCollapse,
  Map,
  PenLine,
  Siren,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const tabs = [
  {
    title: "Overview",
    path: "overview",
    icon: <BookOpen className=" w-4" />,
  },
  {
    title: "Itinerary",
    path: "itinerary",
    icon: <ListChecks className=" w-4" />,
  },
  { title: "Event Map", path: "map", icon: <Map className=" w-4" /> },
  {
    title: "Instructions",
    path: "instructions",
    icon: <ListCollapse className=" w-4" />,
  },
  { title: "Emergency", path: "emergency", icon: <Siren className=" w-4" /> },
  {
    title: "Lost & Found",
    path: "lost-found",
    icon: <FolderSearch className=" w-4" />,
  },
  { title: "Reviews", path: "reviews", icon: <PenLine className=" w-4" /> },
];

export default function RootLayout({ children, params }) {
  const pathname = usePathname();
  const { slug } = params;

  const isIncludesPath = [
    "overview",
    "itinerary",
    "map",
    "instructions",
    "emergency",
    "lost-found",
    "reviews",
  ].some((path) => pathname.includes(path));

  return (
    <>
      {isIncludesPath && (
        <>
          {/* Top nav only for desktops */}
          <nav className="hidden lg:block w-full fixed bg-white z-20">
            <div className="max-w-screen-xl mx-auto px-6 text-center text-content">
              <ul className="flex flex-wrap gap-6">
                {tabs.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={`/${slug}/${item.path}`}
                      className={clsx("px-0 py-2 flex items-center gap-1", {
                        "text-primary": pathname.includes(item.path),
                        "opacity-80": !pathname.includes(item.path),
                      })}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Responsive bottom nav only for mobile */}
          <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 ">
            <div className="flex h-full mx-auto font-medium overflow-auto no-scrollbar">
              {tabs.map((item, i) => (
                <Link
                  key={i}
                  href={`/${slug}/${item.path}`}
                  className={clsx(
                    "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-r",
                    { "text-primary": pathname.includes(item.path) }
                  )}
                >
                  {item.icon}
                  <span className="text-xs text-nowrap">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      <section
        className={clsx(
          "min-h-[400px]",
          isIncludesPath ? "pb-12 lg:pt-12" : ""
        )}
      >
        {children}
      </section>
    </>
  );
}
