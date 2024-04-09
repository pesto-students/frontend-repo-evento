"use client";

import React from "react";
import Link from "next/link";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Button } from "../ui/button";
import { HiOutlineUser, HiSearch, HiX } from "react-icons/hi";
import { useAppContext } from "@/context/AppContext";

const Hamburger = () => {
  const { hamburgerMenuOpen, setHamburgerMenuOpen } = useAppContext();
  return (
    <Drawer
      open={hamburgerMenuOpen}
      onOpenChange={setHamburgerMenuOpen}
      direction="left"
      className="border-none"
    >
      <DrawerContent className="h-full border-none outline-none w-9/12 rounded-none">
        <DrawerClose>
          <button className="absolute top-1 right-1 p-2">
            <HiX className="h-4 w-4 fill-white" />
          </button>
        </DrawerClose>
        <div className="bg-gray-900 flex flex-col items-center gap-3 p-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="text-white font-semibold">John Doe</div>
            <div className="text-gray-300 text-xs">john@gmail.com</div>
          </div>
        </div>
        <div>
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem>
                  <Link href="/search" className="flex items-center w-full ">
                    <HiSearch className="w-4 mr-2" />
                    <span> Search events</span>
                  </Link>
                </CommandItem>
              </CommandGroup>

              <CommandGroup className="mt-6">
                <CommandItem>
                  <HiOutlineUser className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </CommandItem>
                <CommandItem>
                  <HiOutlineUser className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </CommandItem>
                <CommandItem>
                  <HiOutlineUser className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Hamburger;
