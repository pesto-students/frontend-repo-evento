import React from "react";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import { Avatar, Button, Dropdown } from "antd";
import { getAvatarName } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context/AppContext";
import { LoginOutlined } from "@ant-design/icons";

const DesktopMenu = () => {
  const { data: session } = useSession();
  const { handleLogout } = useAppContext();

  const items = [
    {
      key: "1",
      label: (
        <>
          <div>{session?.user?.name}</div>
          <div className="text-xs mt-1">{session?.user?.email}</div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div>Settings</div>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div>Support</div>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <div onClick={handleLogout}>Logout</div>
        </>
      ),
    },
  ];

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

        {session?.user ? (
          <>
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
              <Dropdown
                menu={{
                  items,
                }}
                overlayClassName="managerHeaderdropdownOverlay"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar className="cursor-pointer !bg-gray-500">
                    {getAvatarName(session?.user?.name)}
                  </Avatar>
                </a>
              </Dropdown>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <Button type="primary" icon={<LoginOutlined />}>
                Login
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DesktopMenu;
