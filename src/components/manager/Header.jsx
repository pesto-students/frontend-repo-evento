"use client";

import Link from "next/link";
import { Bell, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Dropdown, Input, Avatar } from "antd";
import { getAvatarName } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

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
    <header className="flex justify-between h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="w-[400px]">
        <Input
          placeholder="Search events..."
          prefix={<SearchIcon className="w-3 h-4 text-gray-400" />}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button icon={<Bell className="h-4 w-4" />}></Button>

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
      </div>
    </header>
  );
};

export default Header;
