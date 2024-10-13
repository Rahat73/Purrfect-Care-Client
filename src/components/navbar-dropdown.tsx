"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { usePathname, useRouter } from "next/navigation";
import { logout } from "../services/auth-service";
import { protectedRoutes } from "../constant";
import { useUser } from "../context/user.provider";
import { useUserInfo } from "../hooks/user.hook";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setIsLoading: userLoading } = useUser();
  const { data } = useUserInfo();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center gap-2 cursor-pointer">
          <p className="hidden sm:block">{user?.name}</p>
          <Avatar className="cursor-pointer" src={data?.profilePicture} />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem>
          <p className="hidden sm:block">{user?.name}</p>
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile")}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/posts/create-post")}>
          Create Post
        </DropdownItem>
        <DropdownItem
          onClick={() => handleLogout()}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
