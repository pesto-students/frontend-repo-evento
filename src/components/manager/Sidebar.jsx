"use client";

import React from "react";
import Link from "next/link";
import { Home, LineChart, Package2, ShoppingCart, Users } from "lucide-react";
import { Menu } from "antd";
import { useRouter } from "next/navigation";
import { BellAlertIcon } from "@heroicons/react/24/outline";

const items = [
  {
    key: "Dashboard",
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />,
    href: "/manager",
  },
  {
    key: "Notification",
    label: "Notification",
    icon: <BellAlertIcon className="h-4 w-4" />,
    href: "/manager",
  },
  {
    key: "Visitors",
    label: "Visitors",
    icon: <Users className="h-4 w-4" />,
    href: "/manager",
  },
  {
    key: "Analytics",
    label: "Analytics",
    icon: <LineChart className="h-4 w-4" />,
    href: "/manager",
  },
];

const Sidebar = () => {
  const router = useRouter();

  const handleMenuClick = (item) => {
    const menuItem = items.find((i) => i.key === item.key);
    if (menuItem && menuItem.href) {
      router.push(menuItem.href);
    }
  };
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
            className="w-full h-full !border-none"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
