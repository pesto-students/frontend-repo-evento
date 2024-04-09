import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Bell } from "lucide-react";

const DesktopMenu = () => {
  return (
    <div
      className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
      id="navbar-sticky"
    >
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent md:items-center">
        <li>
          <Link
            href="/search"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <button className="flex items-center justify-between w-full py-2 px-3 rounded hover:opacity-80 md:p-0 ">
              <Search className="w-4 mr-1" />
              <span> Search</span>
            </button>
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="relative inline-flex items-center p-1 text-sm font-medium text-center outline-none "
          >
            <Bell className="w-5" />
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1.5 -end-1.5">
              6
            </div>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open user menu</span>
            <Image
              width={50}
              height={50}
              className="w-8 h-8 rounded-full"
              src="/img/profile-picture-3.jpg"
              alt="user photo"
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DesktopMenu;
