"use client";

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { siteConfig } from "@/src/config/site";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { FaPaw } from "react-icons/fa6";
import NavbarDropdown from "./navbar-dropdown";
import { ThemeSwitch } from "./theme-switch";
import Link from "next/link";

export const Navbar = () => {
  const { user, isLoading } = useUser();

  return (
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <FaPaw className="text-xl" />
            <p className="font-bold text-inherit text-xl">Purrfect Care</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-4 justify-start ml-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link color={"foreground"} href={item.href} className="text-md">
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Link href="/login">
              <Button color="primary" radius="full">
                Login
              </Button>
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {user?.email ? (
          <NavbarItem className="gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="gap-2">
            <Link href="/login">
              <Button color="primary" radius="full" size="sm">
                Login
              </Button>
            </Link>
          </NavbarItem>
        )}
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color={"foreground"} href={item.href}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="my-6">
            <h2 className="font-semibold text-lg">Filter</h2>
            <ul className="mt-2">
              <li className="hover:bg-default-200 transition-all rounded-md p-2">
                <Link href="/?sort=-upvotes" className=" transition-all">
                  Upvote
                </Link>
              </li>
              <li className="hover:bg-default-200 transition-all rounded-md p-2">
                <Link href="/?sort=-downvotes" className=" transition-all">
                  DownVote
                </Link>
              </li>
              <li className="hover:bg-default-200 transition-all rounded-md p-2">
                <Link href="/" className=" transition-all">
                  All
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold text-lg">Categories</h2>
            <ul className="mt-2">
              <li className="hover:bg-default-200 transition-all rounded-md p-2">
                <Link href="/?category=Tip" className=" transition-all">
                  Tip
                </Link>
              </li>
              <li className="hover:bg-default-200 transition-all rounded-md p-2">
                <Link href="/?category=Story" className=" transition-all">
                  Story
                </Link>
              </li>
              <li className="hover:bg-default-200 transition-all rounded-md p-2">
                <Link href="/" className=" transition-all">
                  All
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
