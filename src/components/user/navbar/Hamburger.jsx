"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Search, X, Power } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Drawer, Input } from "antd";
import styled from "styled-components";

const items = [
  {
    label: "Profile",
    key: "user",
    icon: <User className="w-5"/>,
  },
  {
    label: "Logout",
    key: "user",
    icon: <Power className="w-5"/>,
  },
];

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0 !important;
  }
  .ant-drawer-header {
    display: none !important;
  }
`;

const Hamburger = () => {
  const { hamburgerMenuOpen, setHamburgerMenuOpen } = useAppContext();
  return (
    <StyledDrawer
      open={hamburgerMenuOpen}
      onClose={() => setHamburgerMenuOpen(false)}
      placement="left"
    >
      <div className="bg-gray-900 flex flex-col items-center gap-3 p-6 relative">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <div className="text-white font-semibold">John Doe</div>
          <div className="text-gray-300 text-xs">john@gmail.com</div>
        </div>

        <X
          className="text-white absolute w-5 right-2 top-2"
          onClick={() => setHamburgerMenuOpen(false)}
        />
      </div>
      <div className="flex flex-col gap-3 mt-3 p-3">
        <Link href="/search" onClick={() => setHamburgerMenuOpen(false)}>
          <Input
            placeholder="Search events"
            size="large"
            prefix={<Search className="w-4 mr-1 text-gray-400" />}
          />
        </Link>
        <div className="flex-1">
          <nav className="grid items-start text-sm font-medium">
            {items.map((item, i) => (
              <Link
                key={i}
                href="/manager"
                className="flex items-center gap-3 rounded-lg py-2 transition-all text-gray-500"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </StyledDrawer>
  );
};

export default Hamburger;
