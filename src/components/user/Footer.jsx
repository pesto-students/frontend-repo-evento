"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Footer = () => {
  const pathname = usePathname();
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
    <section
      className={clsx(
        "w-full bg-[#0c172f] py-12",
        isIncludesPath && "hidden",
        "lg:block"
      )}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* <Image
            width={50}
            height={50}
            src="https://flowbite.com/docs/images/logo.svg"
            className="w-8 h-8"
            alt="Flowbite Logo"
          /> */}
          <span className="self-center text-xl font-bold whitespace-nowrap text-white">
            Evento
          </span>
        </Link>
        <p className="text-white mt-3 opacity-80">
          Evento is a platform that helps you discover and buy the best in
          events, travel and food in your city. We strive to curate experiences
          that are worth your time and money, possibly something you have never
          tried before.
        </p>
        <h3 className="self-center text-xl font-bold whitespace-nowrap text-white mt-6">
          For Event Organizers
        </h3>
        <p className="text-white mt-3 opacity-80">
          We help the event organizers manage their event in a better,
          structured, and sophisticated way without spending huge amounts, it
          will help them to advertise their brands and sponsors. Can highlight
          the sub-events and stores to get a better attraction
        </p>
        <div className="mt-6">
          <ul className="flex gap-6 text-white opacity-80 font-medium flex-wrap">
            <li>
              <Link href="/">About us</Link>
            </li>
            <li>
              <Link href="/">Contact us</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="mt-6 text-white opacity-80 flex items-center gap-6">
          <div>Find us on: </div>
          <div className="flex gap-2">
            <Link href="/" className="inline-block p-2 bg-[#070e1b] rounded-lg">
              <Instagram />
            </Link>
            <Link href="/" className="inline-block p-2 bg-[#070e1b] rounded-lg">
              <Facebook />
            </Link>
            <Link href="/" className="inline-block p-2 bg-[#070e1b] rounded-lg">
              <Twitter />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
