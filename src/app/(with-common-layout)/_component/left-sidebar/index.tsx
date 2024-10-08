"use client";

import { Card } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaBookmark,
  FaHeart,
  FaHouse,
  FaMagnifyingGlass,
  FaPlus,
  FaUser,
} from "react-icons/fa6"; // Using FontAwesome icons

export default function LeftSidebar() {
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { label: "HOME", icon: FaHouse, href: "/" },
    { label: "SEARCH", icon: FaMagnifyingGlass, href: "/search" },
    { label: "CREATE POST", icon: FaPlus, href: "/posts/create-post" },
    { label: "FAVORITES", icon: FaHeart, href: "/favorites" },
    { label: "PROFILE", icon: FaUser, href: "/profile" },
    { label: "SAVED", icon: FaBookmark, href: "/saved" },
    { label: "MORE", icon: FaBars, href: "/more" },
  ];

  return (
    <Card className="bg-transparent p-3 shadow-none">
      <nav className="flex flex-col gap-4 items-start justify-center">
        {menuItems.map((item) => (
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
      </nav>
    </Card>
  );
}
