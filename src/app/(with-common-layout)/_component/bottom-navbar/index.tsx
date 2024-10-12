"use client";

import {
  FaHouse,
  FaMagnifyingGlass,
  FaPlus,
  FaUser,
  FaTableList,
  FaUserShield,
} from "react-icons/fa6";
import Link from "next/link";
import { useUser } from "@/src/context/user.provider";
import { useState } from "react";
import { Tooltip } from "@nextui-org/tooltip";

const BottomNavbar = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const { user } = useUser();

  const menuItems = [
    { label: "HOME", icon: FaHouse, href: "/" },
    { label: "SEARCH", icon: FaMagnifyingGlass, href: "/?search" },
    { label: "CREATE POST", icon: FaPlus, href: "/posts/create-post" },
    { label: "PROFILE", icon: FaUser, href: "/profile" },
    { label: "DASHBOARD", icon: FaTableList, href: `/user/dashboard` },
    ...(user?.role === "admin"
      ? [
          {
            label: "ADMIN DASHBOARD",
            icon: FaUserShield,
            href: "/admin/dashboard",
          },
        ]
      : []),
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-default-100 border-t border-default-200 z-[999] md:hidden">
      <div className="flex justify-between items-center p-3">
        {menuItems.map((item, index) => (
          <Tooltip placement="right" key={item.label} content={item.label}>
            <Link href={item.href}>
              <button
                onClick={() => setActiveMenu(item.label)}
                className={`${
                  activeMenu === item.label
                    ? " bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-500 hover:bg-gray-700"
                } flex items-center justify-center w-12 h-12 p-0 rounded-full`} // Setting width and height
              >
                <item.icon className="text-2xl" />
              </button>
            </Link>
          </Tooltip>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
