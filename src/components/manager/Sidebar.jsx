"use client";

import React from "react";
import Link from "next/link";
import { Home, LineChart, Package2, ShoppingCart, Users } from "lucide-react";
import { Menu } from "antd";

const items = [
  {
    key: "sub1",
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />,
    href: "/manager",
  },
  {
    key: "sub2",
    label: "Orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    href: "/manager",
  },
  {
    key: "sub3",
    label: "Visitors",
    icon: <Users className="h-4 w-4" />,
    href: "/manager",
  },
  {
    key: "sub4",
    label: "Analytics",
    icon: <LineChart className="h-4 w-4" />,
    href: "/manager",
  },
];

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block ">
      <div className="flex h-full flex-col ">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Evento</span>
          </Link>
        </div>
        <div className="flex-1">
          <Menu
            onClick={() => {}}
            className="w-full h-full !border-none"
            defaultSelectedKeys={["1"]}
            mode="inline"
          >
            {items.map((item) => (
              <Menu.Item key={item.key}>
                <Link href={item.href} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
