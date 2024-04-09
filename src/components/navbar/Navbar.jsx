"use client";

import Link from "next/link";
import React from "react";
import { Menu, MapPin, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useAppContext } from "@/context/AppContext";
import Hamburger from "./Hamburger";
import useMediaQuery from "@/hooks/useMediaQuery";
import DesktopMenu from "./DesktopMenu";

const Navbar = () => {
  const { setLocationModalOpen, setHamburgerMenuOpen } = useAppContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-start justify-between mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* <Image width={50} height={50} src="https://flowbite.com/docs/images/logo.svg" className="w-8 h-8" alt="Flowbite Logo"/> */}
              <span className="self-center text-2xl font-bold whitespace-nowrap text-primary">
                EVENTO
              </span>
            </Link>
            <button
              onClick={() => setLocationModalOpen(true)}
              className="md:ml-10 flex items-center gap-1 hover:opacity-80"
            >
              <MapPin className="w-5 text-primary" />
              <span>Chandmari, Guwahati...</span>
              <ChevronDown className="w-5" />
            </button>
          </div>

          <Button
            onClick={() => setHamburgerMenuOpen(true)}
            variant="outline"
            size="icon"
            className="lg:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="w-6 h-6" />
          </Button>

          {isDesktop ? <DesktopMenu /> : <Hamburger />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
