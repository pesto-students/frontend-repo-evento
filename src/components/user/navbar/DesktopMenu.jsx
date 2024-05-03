import React from "react";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const DesktopMenu = () => {
  return (
    <div
      className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
      id="navbar-sticky"
    >
      <ul className="flex flex-col px-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent md:items-center">
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
          <Avatar className="cursor-pointer w-9 h-9">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </li>
      </ul>
    </div>
  );
};

export default DesktopMenu;
